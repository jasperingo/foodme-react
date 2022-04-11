import { useMemo, useState } from "react";
import { DISCOUNT } from "../../context/actions/discountActions";
import DiscountRepository from "../../repositories/DiscountRepository";
import { useAppContext } from "../contextHook";

export function useDiscountDelete() {

  const {
    store: { 
      store: {
        storeToken
      }
    },
    discount: {
      discountDispatch,
      discount: {
        discount
      }
    }
  } = useAppContext();

  const [loading, setLoading] = useState(null);

  const [formError, setFormError] = useState(null);

  const [formSuccess, setFormSuccess] = useState(null);

  const api = useMemo(function() { return new DiscountRepository(storeToken); }, [storeToken]);

  async function onSubmit() {

    if (loading) return;
    
    if (!window.navigator.onLine) {
      setFormError('_errors.No_netowrk_connection');
      return;
    }

    setFormError(null);
    setFormSuccess(null);

    setLoading(true);

    try {

      const res = await api.delete(discount.id);

      if (res.status === 200) {

        setFormSuccess(res.body.message);
        discountDispatch({ type: DISCOUNT.UNFETCHED });

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

  return [onSubmit, loading, formSuccess, formError];
}
