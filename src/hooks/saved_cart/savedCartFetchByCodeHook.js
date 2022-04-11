
import { useCallback, useMemo, useState } from "react";
import { CART } from "../../context/actions/cartActions";
import SavedCartRepository from "../../repositories/SavedCartRepository";
import { useAppContext } from "../contextHook";
import { useSavedCartItemsToCartItems } from "./savedCartItemsToCartItemsHook";

export function useSavedCartFetchByCode() {

  const { 
    cart: { 
      cartDispatch
    }
  } = useAppContext();

  const [cartItems, setCartItems] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(null);

  const [itemsUnavailable, setItemsUnavailable] = useState(0);

  const convertToCartItems = useSavedCartItemsToCartItems();

  const api = useMemo(function() { return new SavedCartRepository(); }, []);

  const resetSavedCart = useCallback(
    function() {
      setError(null);
      setCartItems(null);
      setItemsUnavailable(0);
    },
    []
  );

  const openCart = useCallback(
    function(list) {
      cartDispatch({
        type: CART.ITEMS_REPLACED,
        payload: { list }
      });
      resetSavedCart();
    },
    [cartDispatch, resetSavedCart]
  );
  
  const openCartFromItems = useCallback(
    function() {
      openCart(cartItems);
    },
    [cartItems, openCart]
  );

  async function onSubmit(code, codeValidity) {

    if (isLoading) return;
    
    if (!window.navigator.onLine) {
      setError('_errors.No_netowrk_connection');
      return;
    }

    if (!codeValidity.valid) {
      setError('_errors.Cart_code_is_invalid');
      return;
    }

    setIsLoading(true);

    try {
      
      const res = await api.get(code);
      
      setIsLoading(false);

      if (res.status === 200) {
        
        const [cart, unavailable] = convertToCartItems(res.body.data.saved_cart_items);

        if (unavailable > 0) {
          setCartItems(cart);
          setItemsUnavailable(unavailable);
        } else {
          openCart(cart);
        }
        
      } else if (res.status === 404) {
        setError('_errors.Cart_not_found');
      } else {
        throw new Error();
      }
      
    } catch {
      setError('_errors.Something_went_wrong');
    } finally {
      setIsLoading(false);
    }
  }

  return [onSubmit, openCartFromItems, resetSavedCart, isLoading, error, itemsUnavailable];
}
