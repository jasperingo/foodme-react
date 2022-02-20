
import { useCallback, useEffect, useState } from "react";
import { CART } from "../../context/actions/cartActions";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import SavedCartRepository from "../../repositories/SavedCartRepository";
import { useAppContext } from "../contextHook";
import { useSavedCartItemsToCartItems } from "./savedCartItemsToCartItemsHook";


export function useSavedCartFetchByCode() {

  const { 
    cart: { 
      cartDispatch
    }
  } = useAppContext();

  const [code, setCode] = useState(null);

  const [cartItems, setCartItems] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(null);

  const [itemsUnavailable, setItemsUnavailable] = useState(0);

  const convertToCartItems = useSavedCartItemsToCartItems();

  function onSubmit(code, codeValidity) {
    if (!codeValidity.valid) {
      setError('_errors.Cart_code_is_invalid');
    } else if (!window.navigator.onLine) {
      setError('_errors.No_netowrk_connection');
    } else {
      setCode(code);
      setIsLoading(true);
    }
  }

  const reset = useCallback(
    ()=> {
      setError(null);
      setCartItems(null);
      setItemsUnavailable(0);
    },
    []
  );
  
  const openCart = useCallback(
    ()=> {
      cartDispatch({
        type: CART.ITEMS_REPLACED,
        payload: {
          list: cartItems,
          fetchStatus: cartItems.length > 0 ? FETCH_STATUSES.DONE : FETCH_STATUSES.EMPTY
        }
      });
      reset();
    },
    [cartItems, cartDispatch, reset]
  );

  useEffect(
    ()=> {

      async function send() {

        try {
          const api = new SavedCartRepository();
          
          const res = await api.get(code);
          
          setIsLoading(false);

          if (res.status === 200) {
            
            const [cart, unavailable] = convertToCartItems(res.body.data.saved_cart_items);

            setCartItems(cart);

            if (unavailable > 0) {
              setItemsUnavailable(unavailable);
            } else {
              openCart();
            }
            
          } else if (res.status === 404) {

            setError('_errors.Cart_not_found');

          } else {
            throw new Error();
          }
          
        } catch {
          setIsLoading(false);
          setError('_errors.Something_went_wrong');
        }
      }

      if (isLoading) send();
    },
    [isLoading, code, convertToCartItems, openCart]
  );
  
  return [onSubmit, openCart, reset, isLoading, error, itemsUnavailable];
}

