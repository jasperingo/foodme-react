import { useEffect, useState } from "react";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import SavedCartRepository from "../../repositories/SavedCartRepository";
import { useAppContext } from "../contextHook";


export function useSavedCartCreate(userToken) {

  const {
    cart: {
      cart: {
        cartItems
      } 
    }
  } = useAppContext();

  const [title, setTitle] = useState(null);

  const [response, setResponse] = useState(null);

  const [fetchStatus, setFetchStatus] = useState(FETCH_STATUSES.PENDING);

  function onSubmit(title, response) {
    if (!window.navigator.onLine) {
      response.onError('_errors.No_netowrk_connection');
    } else {
      setTitle(title);
      setResponse(response);
      setFetchStatus(FETCH_STATUSES.LOADING);
    }
  }

  useEffect(
    ()=> {

      if (fetchStatus === FETCH_STATUSES.LOADING) {
        
        const api = new SavedCartRepository(userToken);

        api.create({ 
          title, 
          saved_cart_items: cartItems.map(i=> ({
            quantity: i.quantity,
            product_variant_id: i.product_variant.id, 
          })) 
        })
        .then(res=> {

          if (res.status === 201) {

            response.onSuccess(res.body.data.code);

            setFetchStatus(FETCH_STATUSES.PENDING);

          } else if (res.status === 400) {
            
            response.onError(res.body.data[0].message);

          } else {
            throw new Error();
          }

        })
        .catch(()=> {
          setFetchStatus(FETCH_STATUSES.PENDING);
          response.onError('_errors.Something_went_wrong');
        });
        
      }

    }, 
    [title, cartItems, fetchStatus, userToken, response]
  );


  return onSubmit;
}
