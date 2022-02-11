
import { useEffect, useState } from "react";
import { PRODUCT } from "../../context/actions/productActions";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import ProductRepository from "../../repositories/ProductRepository";
import { useAppContext } from "../contextHook";


export function useProductUpdate() {

  const { 
    store: { 
      store: {
        storeToken
      }
    },
    product: { 
      productDispatch,
      product: {
        product
      }
    }
  } = useAppContext();

  const [data, setData] = useState(null);

  const [dialog, setDialog] = useState(false);

  const [photo, setPhoto] = useState(null);

  const [photoUploaded, setPhotoUploaded] = useState(false);

  const [formError, setFormError] = useState(null);

  const [formSuccess, setFormSuccess] = useState(null);

  const [titleError, setTitleError] = useState('');

  const [categoryError, setCategoryError] = useState('');

  const [descriptionError, setDescriptionError] = useState('');

  const [fetchStatus, setFetchStatus] = useState(FETCH_STATUSES.PENDING);

  function onPhotoChoose(photo) {
    setPhoto(photo);
    setPhotoUploaded(false);
  }

  function onSubmit(
    title,
    sub_category_id,
    description,
    titleValidity,
    categoryValidity,
    descriptionValidity
  ) {
    
    setFormError(null);
    setFormSuccess(null);
    
    let error = false;

    setFormError('');

    setFormSuccess('');
    
    if (!titleValidity.valid) {
      error = true;
      setTitleError('_errors.This_field_is_required');
    } else {
      setTitleError('');
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
      setData({ title, sub_category_id, description });
      setFetchStatus(FETCH_STATUSES.LOADING);
    }
  }

  useEffect(
    ()=> {
     
      if (fetchStatus === FETCH_STATUSES.LOADING) {
        
        const api = new ProductRepository(storeToken);

        api.update(product.id, data)
        .then(res=> {

          if (res.status === 200) {
            
            setFormSuccess(res.body.message);
            
            if (photo !== null) {

              const form = new FormData();
              form.append('photo', photo);
              
              const api = new ProductRepository(storeToken, null);
              
              api.updatePhoto(product.id, form)

              .then((res)=> {
          
                if (res.status === 200) {
          
                  setFormSuccess(res.body.message);
          
                  setPhotoUploaded(true);

                  setFetchStatus(FETCH_STATUSES.PENDING);

                  productDispatch({
                    type: PRODUCT.FETCHED, 
                    payload: {
                      product: res.body.data, 
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
              
              productDispatch({
                type: PRODUCT.FETCHED, 
                payload: {
                  product: res.body.data, 
                  fetchStatus: FETCH_STATUSES.DONE 
                }
              });

            }

          } else if (res.status === 400) {

            setFetchStatus(FETCH_STATUSES.PENDING);
            
            for (let error of res.body.data) {

              switch(error.name) {

                case 'name':
                  setTitleError(error.message);
                  break;

                case 'sub_category_id':
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
    [fetchStatus, dialog, storeToken, productDispatch, data, photo, product]
  );

  return [
    onSubmit, 
    onPhotoChoose, 
    photoUploaded, 
    dialog, 
    formError, 
    formSuccess, 
    titleError,
    categoryError, 
    descriptionError
  ];
}

