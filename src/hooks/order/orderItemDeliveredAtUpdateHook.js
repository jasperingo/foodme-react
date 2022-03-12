import { useState } from 'react';
import { ORDER } from '../../context/actions/orderActions';
import OrderItemRepository from '../../repositories/OrderItemRepository';
import { useAppContext } from '../contextHook';

export function useOrderItemDeliveredAtUpdate() {

  const {
    order: { 
      orderDispatch
    },
    customer: { 
      customer: {
        customer: {
          customerToken
        }
      } 
    } 
  } = useAppContext();

  const [error, setError] = useState(null);

  const [success, setSuccess] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  
  async function send(id) {

    if (isLoading) return;

    if (!window.navigator.onLine) {
      setError('_errors.No_netowrk_connection');
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const api = new OrderItemRepository(customerToken);
      
      const res = await api.updateDeliveredAt(id);
      
      setIsLoading(false);

      if (res.status === 200) {
        
        setSuccess(true);

        orderDispatch({
          type: ORDER.ITEM_UPDATED, 
          payload: { orderItem: res.body.data }
        });
        
      } else if (res.status === 400) {
        
        setError('_errors.Order_item_track_update_error');

      } else {
        throw new Error();
      }
      
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setError('_errors.Something_went_wrong');
    }
  }

  return [send, success, isLoading, error];
}