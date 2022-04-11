import { useMemo, useState } from "react";
import { PRODUCT } from "../../context/actions/productActions";
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

  const [loading, setLoading] = useState(null);

  const [formError, setFormError] = useState(null);

  const [formSuccess, setFormSuccess] = useState(null);

  const api = useMemo(function() { return new ProductVariantRepository(storeToken); }, [storeToken]);

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
      const res = await api.delete(productVariant.id);

      if (res.status === 200) {

        setFormSuccess(res.body.message);

        productDispatch({ 
          type: PRODUCT.VARIANT_DELETED, 
          payload: { id: productVariant.id  }
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

  return [onSubmit, loading, formSuccess, formError];
}
