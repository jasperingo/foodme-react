
import { useMemo, useState } from "react";
import { DISCOUNT } from "../../context/actions/discountActions";
import DiscountProductRepository from "../../repositories/DiscountProductRepository";
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

  const [loading, setLoading] = useState(false);

  const [formError, setFormError] = useState(null);

  const [formSuccess, setFormSuccess] = useState(null);

  const api = useMemo(function() { return new DiscountProductRepository(storeToken); }, [storeToken]);

  async function onSubmit(discount_product_id) {
    
    if (loading) return;
    
    if (!window.navigator.onLine) {
      setFormError('_errors.No_netowrk_connection');
      return;
    }

    setFormError(null);
    setFormSuccess(null);

    setLoading(true);

    try {

      const res = await api.delete(discount_product_id);

      if (res.status === 200) {
        
        setFormSuccess(res.body.message);

        discountDispatch({
          type: DISCOUNT.PRODUCT_DELETED,
          payload: { discountProductID: discount_product_id }
        });

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
    formError, 
    formSuccess, 
  ];
}
