
import { useMemo, useState, useCallback } from "react";
import { REVIEW } from "../../context/actions/reviewActions";
import ReviewRepository from "../../repositories/ReviewRepository";
import { useAppContext } from "../contextHook";

export function useReviewCreate({ product, store, deliveryFirm }) {

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

  async function onSubmit(rating, description) {

    if (loading) return;
    
    if (!window.navigator.onLine) {
      setFormError('_errors.No_netowrk_connection');
      return;
    }
    
    resetSubmit();
  
    setLoading(true);
    
    try {

      const res = await getRequest({ rating, description });

      if (res.status === 201) {

        setFormSuccess(res.body.message);

        const review = res.body.data;

        if (product) {
          review.product = undefined;
          productDispatch({
            type: REVIEW.CREATED,
            payload: { review }
          });
        }

        if (store) {
          review.store = undefined;
          storeDispatch({
            type: REVIEW.CREATED,
            payload: { review }
          });
        }

        if (deliveryFirm) {
          review.delivery_firm = undefined;
          deliveryFirmDispatch({
            type: REVIEW.CREATED,
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

  function getRequest(data) {
    if (product) {
      data.product_id = product;
      return api.createForProduct(data);
    } else if (store) {
      data.store_id = store;
      return api.createForStore(data);
    } else if (deliveryFirm) {
      data.delivery_firm = deliveryFirm;
      return api.createForDeliveryFirm(data);
    } else {
      throw new Error('');
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
