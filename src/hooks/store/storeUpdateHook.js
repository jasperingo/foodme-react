import { useCallback, useEffect, useState } from "react";
import { STORE } from "../../context/actions/storeActions";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import StoreRepository from "../../repositories/StoreRepository";
import { useAppContext } from "../contextHook";

export function useStoreUpdate() {

  const { 
    store: { 
      storeDispatch,
      store: {
        store,
        storeToken
      } 
    } 
  } = useAppContext();

  const [data, setData] = useState(null);
  
  const [photo, setPhoto] = useState(null);

  const [photoUploaded, setPhotoUploaded] = useState(false);

  const [dialog, setDialog] = useState(false);

  const [formError, setFormError] = useState(null);

  const [formSuccess, setFormSuccess] = useState(null);

  const [nameError, setNameError] = useState('');

  const [categoryError, setCategoryError] = useState('');

  const [emailError, setEmailError] = useState('');

  const [phoneError, setPhoneError] = useState('');

  const [fetchStatus, setFetchStatus] = useState(FETCH_STATUSES.PENDING);
  

  const uploadPhoto = useCallback(
    () => {
      const form = new FormData();
      form.append('photo', photo);
      
      const api = new StoreRepository(storeToken, null);
    
      api.updatePhoto(store.id, form)

      .then(res=> {
        
        if (res.status === 200) {

          setFormSuccess(res.body.message);
          
          storeDispatch({
            type: STORE.FETCHED, 
            payload: { 
              store: res.body.data, 
              fetchStatus: FETCH_STATUSES.DONE 
            }
          });

          setPhotoUploaded(true);

        } else if (res.status === 400) {
          
          setFetchStatus(FETCH_STATUSES.PENDING);

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
    [store.id, storeToken, storeDispatch, photo]
  );
  
  const update = useCallback(
    () => {
      const api = new StoreRepository(storeToken);
      
      api.update(store.id, data)
      .then(res=> {

        if (res.status === 200) {

          setFormSuccess(res.body.message);
          
          storeDispatch({
            type: STORE.FETCHED, 
            payload: { 
              store: res.body.data, 
              fetchStatus: FETCH_STATUSES.DONE 
            }
          });

          if (photo !== null) {
            uploadPhoto();
          } else {
            setFetchStatus(FETCH_STATUSES.PENDING);
          }

        } else if (res.status === 400) {
          
          setFetchStatus(FETCH_STATUSES.PENDING);
          
          for (let error of res.body.data) {

            switch(error.name) {

              case 'name':
                setNameError(error.message);
                break;

              case 'sub_category_id':
                setCategoryError(error.message);
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
    [data, photo, store.id, storeToken, storeDispatch, uploadPhoto]
  );

  function onPhotoChoose(photo) {
    setPhoto(photo);
    setPhotoUploaded(false);
  }

  function onSubmit(
    name, 
    category, 
    email, 
    phone_number,
    nameValidity, 
    categoryValidity, 
    emailValidity, 
    phoneValidity
  ) {

    let error = false;

    setFormError(null);
    setFormSuccess(null);
    
    if (!nameValidity.valid) {
      error = true;
      setNameError('_errors.This_field_is_required');
    } else {
      setNameError('');
    }

    if (!categoryValidity.valid) {
      error = true;
      setCategoryError('_errors.This_field_is_required');
    } else {
      setCategoryError('');
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
      setDialog(true);
      setData({
        name,
        email,
        phone_number,
        sub_category_id: category,
      });
      setFetchStatus(FETCH_STATUSES.LOADING);
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
    store, 
    dialog, 
    formError, 
    formSuccess, 
    nameError, 
    categoryError, 
    emailError, 
    phoneError
  ];
}
