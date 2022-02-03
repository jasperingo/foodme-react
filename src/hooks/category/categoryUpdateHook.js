
import { useEffect, useState } from "react";
import { CATEGORY } from "../../context/actions/categoryActions";
import CategoryRepository from "../../repositories/CategoryRepository";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import { useAppContext } from "../contextHook";


export function useCategoryUpdate() {

  const { 
    admin: { 
      admin: {
        adminToken
      }
    },
    category: { 
      categoryDispatch,
      category: {
        category
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

  const [descriptionError, setDescriptionError] = useState('');

  const [fetchStatus, setFetchStatus] = useState(FETCH_STATUSES.PENDING);

  function onPhotoChoose(photo) {
    setPhoto(photo);
    setPhotoUploaded(false);
  }

  function onSubmit(
    name,
    description,
    nameValidity,
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
      setData({ name, description });
      setFetchStatus(FETCH_STATUSES.LOADING);
    }
  }

  useEffect(
    ()=> {
     
      if (fetchStatus === FETCH_STATUSES.LOADING) {
        
        const api = new CategoryRepository(adminToken);

        api.update(category.id, data)
        .then(res=> {

          if (res.status === 200) {
            
            setFormSuccess(res.body.message);
            
            if (photo !== null) {

              const form = new FormData();
              form.append('photo', photo);
              
              const api = new CategoryRepository(adminToken, null);
              
              api.updatePhoto(category.id, form)

              .then((res)=> {
          
                if (res.status === 200) {
          
                  setFormSuccess(res.body.message);
          
                  setPhotoUploaded(true);

                  setFetchStatus(FETCH_STATUSES.PENDING);

                  categoryDispatch({
                    type: CATEGORY.FETCHED, 
                    payload: {
                      category: res.body.data, 
                      fetchStatus: FETCH_STATUSES.DONE 
                    }
                  });
          
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
              
              categoryDispatch({
                type: CATEGORY.FETCHED, 
                payload: {
                  category: res.body.data, 
                  fetchStatus: FETCH_STATUSES.DONE 
                }
              });

            }

          } else if (res.status === 400) {

            setFetchStatus(FETCH_STATUSES.PENDING);
            
            for (let error of res.body.data) {

              switch(error.name) {

                case 'name':
                  setNameError(error.message);
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
    [fetchStatus, dialog, adminToken, categoryDispatch, data, photo, category]
  );

  return [
    onSubmit, 
    onPhotoChoose, 
    photoUploaded, 
    dialog, 
    formError, 
    formSuccess, 
    nameError, 
    descriptionError
  ];
}

