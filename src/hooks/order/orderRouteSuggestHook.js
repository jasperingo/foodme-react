import { useCallback, useMemo, useState } from "react";
import OrderRepository from "../../repositories/OrderRepository";
import { useAppContext } from "../contextHook";

export function useOrderRouteSuggest() {

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

  const [isLoaded, setIsLoaded] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const api = useMemo(function() { return new OrderRepository(customerToken); }, [customerToken]);

  const fetchRouteSuggestions = useCallback(
    async function() {

      if (isLoading) return;

      if (!window.navigator.onLine) {
        setError('_errors.No_netowrk_connection');
        return;
      }
     
      setIsLoading(true);

      try {
        
        const res = await api.getRouteSuggestion({
          store_id: cartItems[0].product_variant.product.store.id,
          customer_address_id: cart.customer_address_id,
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

          setError('_errors.Cart_delivery_routes_error');

        } else {
          throw new Error();
        }
        
      } catch {
        setIsLoading(false);
        setError('_errors.Something_went_wrong');
      }
    },
    [api, isLoading, cart, cartItems]
  );

  return [fetchRouteSuggestions, data, isLoading, error, isLoaded];
}
