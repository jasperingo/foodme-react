import { useCallback, useEffect, useState } from "react";
import { ADMIN } from "../../context/actions/adminActions";
import AdminRepository from "../../repositories/AdminRepository";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import { useAppContext } from "../contextHook";


export function useAdminUpdate() {

  const { 
    admin: { 
      adminDispatch,
      admin: {
          admin,
          adminToken
      }
    } 
  } = useAppContext();

  const [data, setData] = useState(null);
  
  const [photo, setPhoto] = useState(null);

  const [photoUploaded, setPhotoUploaded] = useState(false);

  const [dialog, setDialog] = useState(false);

  const [formError, setFormError] = useState(null);

  const [formSuccess, setFormSuccess] = useState(null);

  const [firstNameError, setFirstNameError] = useState('');

  const [lastNameError, setLastNameError] = useState('');

  const [emailError, setEmailError] = useState('');

  const [phoneError, setPhoneError] = useState('');

  const [fetchStatus, setFetchStatus] = useState(FETCH_STATUSES.PENDING);
  

  const uploadPhoto = useCallback(
    () => {
      const form = new FormData();
      form.append('photo', photo);
      
      const api = new AdminRepository(adminToken, null);
    
      api.updatePhoto(admin.id, form)

      .then(res=> {
        
        if (res.status === 200) {

          setFormSuccess(res.body.message);
          
          adminDispatch({
            type: ADMIN.FETCHED, 
            payload: { 
              customer: res.body.data, 
              fetchStatus: FETCH_STATUSES.DONE 
            }
          });

          setPhotoUploaded(true);

        } else if (res.status === 400) {

          const error = res.body.data[0];
          
          if (error.name === 'photo') setFormError(error.message);

        } else {
          throw new Error();
        }

      })
      .catch(()=> {
        setFormError('_errors.Something_went_wrong');
      })
      .finally(()=> {
        setFetchStatus(FETCH_STATUSES.PENDING);
      });
    }, 
    [admin.id, adminToken, adminDispatch, photo]
  );
  
  const update = useCallback(
    () => {
      const api = new AdminRepository(adminToken);
      
      api.update(admin.id, data)
      .then(res=> {

        if (res.status === 200) {

          setFormSuccess(res.body.message);
          
          adminDispatch({
            type: ADMIN.FETCHED, 
            payload: { 
              customer: res.body.data, 
              fetchStatus: FETCH_STATUSES.DONE 
            }
          });

          if (photo !== null) {
            uploadPhoto();
          } else {
            setFetchStatus(FETCH_STATUSES.PENDING);
          }

        } else if (res.status === 400) {
          
          for (let error of res.body.data) {

            switch(error.name) {

              case 'first_name':
                setFirstNameError(error.message);
                break;

              case 'last_name':
                setLastNameError(error.message);
                break;

              case 'email':
                setEmailError(error.message);
                  break;

              case 'phone_number':
                setPhoneError(error.message);
                break;

              default:
            }
          }

        } else {
          throw new Error();
        }

      })
      .catch(()=> {
        setFetchStatus(FETCH_STATUSES.PENDING);
        setFormError('_errors.Something_went_wrong');
      });
    }, 
    [data, photo, admin.id, adminToken, adminDispatch, uploadPhoto]
  );

  function onPhotoChoose(photo) {
    setPhoto(photo);
    setPhotoUploaded(false);
  }

  function onSubmit(
    firstName, 
    lastName, 
    email, 
    phone_number,
    firstNameValidity, 
    lastNameValidity, 
    emailValidity, 
    phoneValidity
  ) {

    let error = false;

    setFormError(null);
    setFormSuccess(null);
    
    if (!firstNameValidity.valid) {
      error = true;
      setFirstNameError('_errors.This_field_is_required');
    } else {
      setFirstNameError('');
    }

    if (!lastNameValidity.valid) {
      error = true;
      setLastNameError('_errors.This_field_is_required');
    } else {
      setLastNameError('');
    }

    if (!emailValidity.valid) {
      error = true;
      setEmailError('_errors.This_field_is_required');
    } else {
      setEmailError('');
    }

    if (!phoneValidity.valid) {
      error = true;
      setPhoneError('_errors.This_field_is_required');
    } else {
      setPhoneError('');
    }
    
    if (!error) {
      // setDialog(true);
      setData({
        email,
        phone_number,
        last_name: lastName,
        first_name: firstName,
      });
      // setFetchStatus(FETCH_STATUSES.LOADING);
    }
  }

  useEffect(
    ()=> {
      if (fetchStatus === FETCH_STATUSES.LOADING) {
        update();
      } else if (dialog !== false) {
        setDialog(false);
      }
    }, 
    [fetchStatus, dialog, update]
  );
  
  return [
    onSubmit, 
    onPhotoChoose, 
    photoUploaded, 
    admin, 
    dialog, 
    formError, 
    formSuccess, 
    firstNameError, 
    lastNameError, 
    emailError, 
    phoneError
  ];
}
