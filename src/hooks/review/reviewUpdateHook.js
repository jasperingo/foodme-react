
import { useMemo, useState, useCallback } from "react";
import { REVIEW } from "../../context/actions/reviewActions";
import ReviewRepository from "../../repositories/ReviewRepository";
import { useAppContext } from "../contextHook";

export function useReviewUpdate() {

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

  async function onSubmit(id, rating, description) {
    
    if (loading) return;
    
    if (!window.navigator.onLine) {
      setFormError('_errors.No_netowrk_connection');
      return;
    }
    
    resetSubmit();
  
    setLoading(true);

    try {

      const res = await api.update(id, { rating, description });

      if (res.status === 200) {

        setFormSuccess(res.body.message);

        const review = res.body.data;

        if (review.product !== null) {
          review.product = undefined;
          productDispatch({
            type: REVIEW.UPDATED,
            payload: { review }
          });
        }

        if (review.store !== null) {
          review.store = undefined;
          storeDispatch({
            type: REVIEW.UPDATED,
            payload: { review }
          });
        }

        if (review.delivery_firm !== null) {
          review.delivery_firm = undefined;
          deliveryFirmDispatch({
            type: REVIEW.UPDATED,
            payload: { review }
          });
        }

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

  return  [
    onSubmit,
    loading,
    formSuccess,
    formError,
    resetSubmit
  ];
}
