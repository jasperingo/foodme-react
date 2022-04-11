import { useMemo, useState, useCallback } from "react";
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


  const [loading, setLoading] = useState(false);

  const [formError, setFormError] = useState(null);

  const [formSuccess, setFormSuccess] = useState(null);

  const api = useMemo(function() { return new SavedCartRepository(userToken); }, [userToken]);

  const resetSubmit = useCallback(
    function() {
      setFormError(null);
      setFormSuccess(null);
    },
    []
  );

  async function onSubmit(title) {
    
    if (loading) return;
    
    if (!window.navigator.onLine) {
      setFormError('_errors.No_netowrk_connection');
      return;
    }
    
    resetSubmit();
  
    setLoading(true);

    try {

      const res = await api.create({ 
        title, 
        saved_cart_items: cartItems.map(i=> ({
          quantity: i.quantity,
          product_variant_id: i.product_variant.id, 
        })) 
      });


      if (res.status === 201) {

        setFormSuccess(res.body.data.code);

      } else if (res.status === 400) {
        
        setFormError(res.body.data[0].message);

      } else {
        throw new Error();
      }

    } catch {
      setFormError('_errors.Something_went_wrong');
    } finally {
      setLoading(false);
    }
  }

  return [
    onSubmit,
    loading,
    formSuccess,
    formError, 
    resetSubmit
  ];
}
