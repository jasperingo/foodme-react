import { useState, useCallback } from 'react';
import OrderRepository from '../../repositories/OrderRepository';
import { useAppContext } from '../contextHook';

export function useOrderCreate() {

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

  const [order, setOrder] = useState(null);

  const [error, setError] = useState(null);

  const [success, setSuccess] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const resetCreateOrder = useCallback(
    function() { 
      setError(null); 
      setSuccess(null);
    },
    []
  );
  
  async function send(paymentMethod, orderNote) {

    if (isLoading) return;

    if (!window.navigator.onLine) {
      setError('_errors.No_netowrk_connection');
      return;
    }

    resetCreateOrder();

    setIsLoading(true);

    try {
      const api = new OrderRepository(customerToken);
      
      const res = await api.create({
        ...cart,
        store_id: cartItems[0].product_variant.product.store.id,
        payment_method: paymentMethod,
        note: orderNote === '' ? undefined : orderNote,
        order_items: cartItems.map(i=> {
          const item = {
            product_variant_id: i.product_variant.id,
            quantity: i.quantity,
          };

          if (i.delivery_weight_id) {
            item.delivery_weight_id = i.delivery_weight_id;
          }

          if (i.discount_product_id) 
            item.discount_product_id = i.discount_product_id;
          
          return item;
        })
      });
      
      setIsLoading(false);

      if (res.status === 201) {
        
        setOrder(res.body.data);
        setSuccess(true);
        
      } else if (res.status === 400) {

        setError('_errors.Order_cart_error');

      } else {
        throw new Error();
      }
      
    } catch (error) {
      setIsLoading(false);
      setError('_errors.Something_went_wrong');
    }
  }

  return [send, success, isLoading, error, order, resetCreateOrder];
}
