import { useState, useMemo } from 'react';
import { ORDER } from '../../context/actions/orderActions';
import TransactionRepository from '../../repositories/TransactionRepository';
import { useAppContext } from '../contextHook';

export function useRefundTransactionCreate(userToken) {

  const {
    order: { 
      orderDispatch,
    }
  } = useAppContext();

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  const [error, setError] = useState(null);

  const api = useMemo(function() { return new TransactionRepository(userToken); }, [userToken]);

  async function send(order_id) {

    if (loading) return;

    if (!window.navigator.onLine) {
      setError('_errors.No_netowrk_connection');
      return;
    }

    setLoading(true);

    try {

      const res = await api.createRefund({ order_id });
      
      if (res.status === 201) {
  
        orderDispatch({
          type: ORDER.UPDATED,
          payload: { order: res.body.data.order }
        });

        setSuccess(true);
        
      } else if (res.status === 400) {

        setError(res.body.data[0].message);

      } else {
        throw new Error();
      }
      
    } catch {
      setError('_errors.Something_went_wrong');
    } finally {
      setLoading(false);
    }
  }

  return [
    send,
    loading,
    success,
    error
  ];
}
