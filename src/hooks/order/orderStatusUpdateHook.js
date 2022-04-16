import { useState } from 'react';
import { ORDER } from '../../context/actions/orderActions';
import OrderRepository from '../../repositories/OrderRepository';
import { useAppContext } from '../contextHook';

export function useOrderStatusUpdate() {

  const {
    order: { 
      orderDispatch,
      order: {
        orderID,
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

  const [error, setError] = useState(null);

  const [success, setSuccess] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  
  async function send(status) {

    if (isLoading) return;

    if (!window.navigator.onLine) {
      setError('_errors.No_netowrk_connection');
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const api = new OrderRepository(customerToken);
      
      const res = await api.updateStatus(orderID, { status });
      
      setIsLoading(false);

      if (res.status === 200) {
        
        setSuccess(true);
        orderDispatch({
          type: ORDER.FETCHED, 
          payload: {
            id: orderID,
            order: res.body.data, 
          }
        });
        
      } else if (res.status === 400) {
        
        setError('_errors.Order_status_update_error');

      } else {
        throw new Error();
      }
      
    } catch (error) {
      setIsLoading(false);
      setError('_errors.Something_went_wrong');
    }
  }

  return [send, success, isLoading, error];
}
