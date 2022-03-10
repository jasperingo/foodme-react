import { useState, useCallback, useEffect } from 'react';
import OrderRepository from '../../repositories/OrderRepository';
import { useAppContext } from '../contextHook';

export function useOrderDiscountSuggest() {

  const { 
    cart: {
      cart: {
        cart,
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

  const [isLoading, setIsLoading] = useState(true);

  const load = useCallback(
    ()=> { 
      setError(null); 
      setIsLoading(true); 
    }, 
    []
  );
  
  useEffect(
    ()=> {

      async function send() {
        try {
          const api = new OrderRepository(customerToken);
          
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
      }

      if (isLoading && !window.navigator.onLine) {
        setIsLoading(false);
        setError('_errors.No_netowrk_connection');
      } else if (isLoading && cartItems.length > 0) {
        send();
      }

    },
    [isLoading, data, cart, cartItems, customerToken]
  );

  return [data, isLoading, error, load];
}
