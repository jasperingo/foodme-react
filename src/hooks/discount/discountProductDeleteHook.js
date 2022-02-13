
import { useEffect, useState } from "react";
import { DISCOUNT } from "../../context/actions/discountActions";
import DiscountProductRepository from "../../repositories/DiscountProductRepository";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import { useAppContext } from "../contextHook";

export function useDiscountProductDelete() {

  const { 
    store: { 
      store: {
        storeToken
      }
    },
    discount: {
      discountDispatch,
    }
  } = useAppContext();

  const [id, setId] = useState(0);

  const [dialog, setDialog] = useState(false);

  const [formError, setFormError] = useState(null);

  const [formSuccess, setFormSuccess] = useState(null);

  const [fetchStatus, setFetchStatus] = useState(FETCH_STATUSES.PENDING);

  function onSubmit(discount_product_id) {
    
    setFormError(null);
    setFormSuccess(null);
  
    if (!window.navigator.onLine) {
      setFormError('_errors.No_netowrk_connection');
    } else {
      setDialog(true);
      setId(discount_product_id);
      setFetchStatus(FETCH_STATUSES.LOADING);
    }
  }
  
  useEffect(
    ()=> {
     
      if (fetchStatus === FETCH_STATUSES.LOADING) {
        
        const api = new DiscountProductRepository(storeToken);

        api.delete(id)
        .then(res=> {

          if (res.status === 200) {
            
            setFormSuccess(res.body.message);

            discountDispatch({
              type: DISCOUNT.PRODUCT_DELETED,
              payload: {
                discountProductID: id
              }
            });

            setFetchStatus(FETCH_STATUSES.PENDING);

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
    [fetchStatus, dialog, storeToken, id, discountDispatch]
  );

  return [
    onSubmit, 
    dialog, 
    formError, 
    formSuccess, 
  ];
}

