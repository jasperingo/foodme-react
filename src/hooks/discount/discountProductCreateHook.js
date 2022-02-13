import { useEffect, useState } from "react";
import { DISCOUNT } from "../../context/actions/discountActions";
import DiscountProductRepository from "../../repositories/DiscountProductRepository";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import { useAppContext } from "../contextHook";

export function useDiscountProductCreate() {

  const { 
    store: { 
      store: {
        storeToken
      }
    },
    discount: {
      discountDispatch,
      discount: {
        discount,
      } 
    }
  } = useAppContext();

  const [data, setData] = useState(null);

  const [dialog, setDialog] = useState(false);

  const [formError, setFormError] = useState(null);

  const [formSuccess, setFormSuccess] = useState(null);

  const [fetchStatus, setFetchStatus] = useState(FETCH_STATUSES.PENDING);

  function onSubmit(product_id) {
    
    setFormError(null);
    setFormSuccess(null);
  
    if (!window.navigator.onLine) {
      setFormError('_errors.No_netowrk_connection');
    } else {
      setDialog(true);
      setData({ product_id, discount_id: discount.id });
      setFetchStatus(FETCH_STATUSES.LOADING);
    }
  }
  
  useEffect(
    ()=> {
     
      if (fetchStatus === FETCH_STATUSES.LOADING) {
        
        const api = new DiscountProductRepository(storeToken);

        api.create(data)
        .then(res=> {

          if (res.status === 201) {
            
            setFormSuccess(res.body.message);

            discountDispatch({
              type: DISCOUNT.PRODUCT_CREATED,
              payload: {
                discountProduct: res.body.data
              }
            });

            setFetchStatus(FETCH_STATUSES.PENDING);
            
          } else if (res.status === 400) {

            setFetchStatus(FETCH_STATUSES.PENDING);
            
            for (let error of res.body.data) {

              switch(error.name) {

                case 'product_id':
                  setFormError(error.message);
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
    [fetchStatus, dialog, storeToken, data, discountDispatch]
  );

  return [
    onSubmit, 
    dialog, 
    formError, 
    formSuccess, 
  ];
}

