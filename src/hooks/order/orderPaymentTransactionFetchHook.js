import { useState, useMemo } from 'react';
import { ORDER } from '../../context/actions/orderActions';
import Order from '../../models/Order';
import OrderRepository from '../../repositories/OrderRepository';
import TransactionRepository from '../../repositories/TransactionRepository';
import { useAppContext } from '../contextHook';

export function useOrderPaymentTransactionFetch(userToken) {

  const {
    order: { 
      orderDispatch,
    }
  } = useAppContext();

  const [transaction, setTransaction] = useState(null);

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  const [error, setError] = useState(null);

  const orderApi = useMemo(function() { return new OrderRepository(userToken); }, [userToken]);

  const transactionApi = useMemo(function() { return new TransactionRepository(userToken); }, [userToken]);

  async function send(order) {

    if (loading) return;

    if (!window.navigator.onLine) {
      setError('_errors.No_netowrk_connection');
      return;
    }

    setLoading(true);

    try {

      const res = order.payment_status === null || order.payment_status === Order.PAYMENT_STATUS_FAILED ? 
          await transactionApi.createPayment({ order_id: order.id}) : 
            await orderApi.getPaymentTransaction(order.id);

      if (res.status === 201 || res.status === 200) {
  
        setTransaction(res.body.data);
        setSuccess(true);

        if (res.status === 201)
          orderDispatch({
            type: ORDER.UPDATED,
            payload: { order: res.body.data.order }
          });
        
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
    transaction,
    loading,
    success,
    error
  ];
}
