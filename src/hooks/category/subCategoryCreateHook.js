
import { useEffect, useState } from "react";
import SubCategoryRepository from "../../repositories/SubCategoryRepository";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import { useAppContext } from "../contextHook";


export function useSubCategoryCreate() {

  const { 
    admin: { 
      admin: {
        adminToken
      }
    }
  } = useAppContext();

  const [data, setData] = useState(null);

  const [dialog, setDialog] = useState(false);

  const [photo, setPhoto] = useState(null);

  const [photoUploaded, setPhotoUploaded] = useState(false);

  const [formError, setFormError] = useState(null);

  const [formSuccess, setFormSuccess] = useState(null);

  const [nameError, setNameError] = useState('');

  const [categoryError, setCategoryError] = useState('');

  const [descriptionError, setDescriptionError] = useState('');

  const [fetchStatus, setFetchStatus] = useState(FETCH_STATUSES.PENDING);

  function onPhotoChoose(photo) {
    setPhoto(photo);
    setPhotoUploaded(false);
  }

  function onSubmit(
    name,
    category,
    description,
    nameValidity,
    categoryValidity,
    descriptionValidity
  ) {
    
    setFormError(null);
    setFormSuccess(null);
    
    let error = false;

    setFormError('');

    setFormSuccess('');
    
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

    if (!descriptionValidity.valid) {
      error = true;
      setDescriptionError('_errors.This_field_is_required');
    } else {
      setDescriptionError('');
    }
    
    if (!window.navigator.onLine) {
      setFormError('_errors.No_netowrk_connection');
    } else if (!error) {
      setDialog(true);
      setData({ name, category_id: category, description });
      setFetchStatus(FETCH_STATUSES.LOADING);
    }
  }

  useEffect(
    ()=> {
     
      if (fetchStatus === FETCH_STATUSES.LOADING) {
        
        const api = new SubCategoryRepository(adminToken);

        api.create(data)
        .then(res=> {

          if (res.status === 201) {
            
            setFormSuccess(res.body.message);
            
            if (photo !== null) {

              const form = new FormData();
              form.append('photo', photo);
              
              const api = new SubCategoryRepository(adminToken, null);
              
              api.updatePhoto(res.body.data.id, form)

              .then((res)=> {
          
                if (res.status === 200) {
          
                  setFormSuccess(res.body.message);
          
                  setPhotoUploaded(true);
          
                  setFetchStatus(FETCH_STATUSES.PENDING);
          
                } else if (res.status === 400) {
                  
                  setFetchStatus(FETCH_STATUSES.PENDING);
          
                  const error = res.body.data[0];
                  
                  if (error.name === 'photo') setFormError(error.message);
          
                } else {
                  throw new Error();
                }
              })
              .catch(()=> {
                setFetchStatus(FETCH_STATUSES.PENDING);
                setFormError('_errors.Something_went_wrong');
              });

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

                case 'category_id':
                  setCategoryError(error.message);
                  break;

                case 'description':
                  setDescriptionError(error.message);
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
      } else if (dialog !== false) {
        setDialog(false);
      }
    }, 
    [fetchStatus, dialog, adminToken, data, photo]
  );

  return [
    onSubmit, 
    onPhotoChoose, 
    photoUploaded,
    dialog, 
    formError, 
    formSuccess, 
    nameError, 
    categoryError,
    descriptionError
  ];
}

