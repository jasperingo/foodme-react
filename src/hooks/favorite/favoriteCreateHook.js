import { useMemo, useCallback, useState } from "react";
import { PRODUCT } from "../../context/actions/productActions";
import FavoriteRepository from "../../repositories/FavoriteRepository";
import { useAppContext } from "../contextHook";

export function useFavoriteCreate() {

  const {
    customer: {
      customer: {
        customer: {
          customerToken
        }
      } 
    },
    product: {
      productDispatch,
      product: {
        product,
      }
    }
  } = useAppContext();

  const [loading, setLoading] = useState(false);

  const [formError, setFormError] = useState(null);

  const [formSuccess, setFormSuccess] = useState(null);

  const api = useMemo(function() { return new FavoriteRepository(customerToken); }, [customerToken]);

  const resetSubmit = useCallback(
    function() {
      setFormError(null);
      setFormSuccess(null);
    },
    []
  );

  async function onSubmit() {

    if (loading) return;
    
    if (!window.navigator.onLine) {
      setFormError('_errors.No_netowrk_connection');
      return;
    }
    
    resetSubmit();
  
    setLoading(true);

    try {

      const res = await api.create({ product_id: product.id });

      if (res.status === 201) {

        setFormSuccess(res.body.message);

        productDispatch({
          type: PRODUCT.FAVORITED,
          payload: { id: res.body.data.id }
        });

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
