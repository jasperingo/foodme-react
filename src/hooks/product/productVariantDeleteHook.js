import { useEffect, useState } from "react";
import { PRODUCT } from "../../context/actions/productActions";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import ProductVariantRepository from "../../repositories/ProductVariantRepository";
import { useAppContext } from "../contextHook";

export function useProductVariantDelete() {

  const {
    store: { 
      store: {
        storeToken
      }
    },
    product: {
      productDispatch,
      product: {
        productVariant
      }
    }
  } = useAppContext();

  const [dialog, setDialog] = useState(null);

  const [formError, setFormError] = useState(null);

  const [formSuccess, setFormSuccess] = useState(null);

  const [fetchStatus, setFetchStatus] = useState(FETCH_STATUSES.PENDING);

  function onSubmit() {
    setDialog(true);
    setFormError(null);
    setFormSuccess(null);
    setFetchStatus(FETCH_STATUSES.LOADING);
  }

  useEffect(
    ()=> {
      if (fetchStatus === FETCH_STATUSES.LOADING) {
        const api = new ProductVariantRepository(storeToken);

        api.delete(productVariant.id)
        .then(res=> {

          if (res.status === 200) {

            setFormSuccess(res.body.message);
            productDispatch({ type: PRODUCT.VARIANT_DELETED, payload: productVariant.id });

          } else if (res.status === 400) {

            setFormError(res.body.data[0].message);

          } else {
            throw new Error();
          }
          
        })
        .catch(()=> {
          setFormError('_errors.Something_went_wrong');
        })
        .finally(()=> {
          setFetchStatus(FETCH_STATUSES.PENDING);
        });

      } else if (dialog !== false) {
        setDialog(false);
      }
    },
    [productVariant, storeToken, fetchStatus, dialog, productDispatch]
  )


  return [onSubmit, dialog, formSuccess, formError];
}
