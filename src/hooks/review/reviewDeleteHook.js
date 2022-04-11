
import { useMemo, useState, useCallback } from "react";
import { REVIEW } from "../../context/actions/reviewActions";
import ReviewRepository from "../../repositories/ReviewRepository";
import { useAppContext } from "../contextHook";

export function useReviewDelete({ product, store, deliveryFirm }) {

  const {
    customer: {
      customer: {
        customer: {
          customerToken
        }
      } 
    },
    store: {
      storeDispatch,
    },
    product: {
      productDispatch,
    },
    deliveryFirm: {
      deliveryFirmDispatch
    }
  } = useAppContext();

  const [loading, setLoading] = useState(false);

  const [formError, setFormError] = useState(null);

  const [formSuccess, setFormSuccess] = useState(null);

  const api = useMemo(function() { return new ReviewRepository(customerToken); }, [customerToken]);

  const resetSubmit = useCallback(
    function() {
      setFormError(null);
      setFormSuccess(null);
    },
    []
  );

  async function onSubmit(id) {
    
    if (loading) return;
    
    if (!window.navigator.onLine) {
      setFormError('_errors.No_netowrk_connection');
      return;
    }
    
    resetSubmit();
  
    setLoading(true);
    
    try {

      const res = await api.delete(id);

      if (res.status === 200) {

        setFormSuccess(res.body.message);

        if (product) {
          productDispatch({ type: REVIEW.DELETED });
        } else if (store) {
          storeDispatch({ type: REVIEW.DELETED });
        } else if (deliveryFirm) {
          deliveryFirmDispatch({ type: REVIEW.DELETED });
        }

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
