import { useState, useCallback, useMemo } from 'react';
import OrderRepository from '../../repositories/OrderRepository';
import { useAppContext } from '../contextHook';

export function useOrderDiscountSuggest() {

  const { 
    cart: {
      cart: {
        cartItems
      } 
    },
    customer: { 
      customer: {
        customer: {
          customerToken
        }
      } 
    } 
  } = useAppContext();

  const [data, setData] = useState([]);

  const [error, setError] = useState(null);

  const [isLoaded, setIsLoaded] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const api = useMemo(function() { return new OrderRepository(customerToken); }, [customerToken]);
  
  const fetchDiscountSugggestions = useCallback(
    async function() {

      if (isLoading) return;

      if (!window.navigator.onLine) {
        setError('_errors.No_netowrk_connection');
        return;
      }
     
      setIsLoading(true);

      try {
        
        const res = await api.getDiscountSuggestion({
          order_items: cartItems.map(i=> (
            {
              product_variant_id: i.product_variant.id,
              quantity: i.quantity
            }
          ))
        });
        
        setIsLoading(false);

        if (res.status === 200) {
          
          setIsLoaded(true);
          setData(res.body.data);
          
        } else if (res.status === 400) {

          setError('_errors.Cart_discounts_error');

        } else {
          throw new Error();
        }
        
      } catch {
        setIsLoading(false);
        setError('_errors.Something_went_wrong');
      }
    
    },
    [api, isLoading, cartItems]
  );

  return [fetchDiscountSugggestions, data, isLoading, error, isLoaded];
}
