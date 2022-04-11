import { useMemo, useState } from "react";
import { DISCOUNT } from "../../context/actions/discountActions";
import DiscountProductRepository from "../../repositories/DiscountProductRepository";
import { useAppContext } from "../contextHook";

export function useDiscountProductCreate() {

  const { 
    store: { 
      store: {
        storeToken
      }
    },
    discount: {
      discountDispatch,
      discount: {
        discount,
      } 
    }
  } = useAppContext();

  const [loading, setLoading] = useState(false);

  const [formError, setFormError] = useState(null);

  const [formSuccess, setFormSuccess] = useState(null);

  const api = useMemo(function() { return new DiscountProductRepository(storeToken); }, [storeToken]);

  async function onSubmit(product_id) {

    if (loading) return;
    
    if (!window.navigator.onLine) {
      setFormError('_errors.No_netowrk_connection');
      return;
    }
    
    setFormError(null);
    setFormSuccess(null);
  
    setLoading(true);

    try {

      const res = await api.create({ product_id, discount_id: discount.id });

      if (res.status === 201) {
        
        setFormSuccess(res.body.message);

        discountDispatch({
          type: DISCOUNT.PRODUCT_CREATED,
          payload: {
            discountProduct: res.body.data
          }
        });
        
      } else if (res.status === 400) {
        
        for (let error of res.body.data) {

          switch(error.name) {

            case 'product_id':
              setFormError(error.message);
              break;

            default:
          }
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
    formError, 
    formSuccess, 
  ];
}

