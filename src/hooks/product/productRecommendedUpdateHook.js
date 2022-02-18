
import { useEffect, useState } from "react";
import { PRODUCT } from "../../context/actions/productActions";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import ProductRepository from "../../repositories/ProductRepository";
import { useAppContext } from "../contextHook";

export function useProductRecommendedUpdate(productId, adminToken) {

  const { 
    product: { 
      productDispatch
    } 
  } = useAppContext();

  const [data, setData] = useState(false);

  const [dialog, setDialog] = useState(false);

  const [formError, setFormError] = useState('');

  const [formSuccess, setFormSuccess] = useState('');

  const [recommendedError, setRecommendedError] = useState('');

  const [fetchStatus, setFetchStatus] = useState(FETCH_STATUSES.PENDING);

  function onSubmit(recommended, recommendedValidity) {
  
    setFormError('');
    setFormSuccess('');

    if (!recommendedValidity.valid) {
      setRecommendedError('_errors.This_field_is_required');
    } else if (!window.navigator.onLine) {
      setFormError('_errors.No_netowrk_connection');
    } else {
      setDialog(true);
      setData({ recommended });
      setFetchStatus(FETCH_STATUSES.LOADING);
    }
  }
  
  useEffect(
    ()=> {

      if (fetchStatus === FETCH_STATUSES.LOADING) {

        const api = new ProductRepository(adminToken);

        api.updateRecommended(productId, data)
        .then(res=> {
          
          if (res.status === 200) {

            setFormSuccess(res.body.message);

            productDispatch({
              type: PRODUCT.FETCHED, 
              payload: { 
                product: res.body.data, 
                fetchStatus: FETCH_STATUSES.DONE 
              }
            });
  
          } else if (res.status === 400) {
            
            setRecommendedError(res.body.data[0].message);
  
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

      } else if (dialog !== false) {
        setDialog(false);
      }

    }, 
    [data, productId, adminToken, fetchStatus, dialog, productDispatch]
  );

  return [onSubmit, dialog, formError, formSuccess, recommendedError];
}

