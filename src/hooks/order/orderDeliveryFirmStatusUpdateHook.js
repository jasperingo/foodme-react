import { useState } from 'react';
import { ORDER } from '../../context/actions/orderActions';
import Order from '../../models/Order';
import { FETCH_STATUSES } from '../../repositories/Fetch';
import OrderRepository from '../../repositories/OrderRepository';
import { useAppContext } from '../contextHook';

export function useDeliveryFirmStatusUpdate() {

  const {
    order: { 
      orderDispatch,
      order: {
        orderID,
      } 
    },
    deliveryFirm: { 
      deliveryFirm: {
        deliveryFirmToken
      } 
    }
  } = useAppContext();

  const [error, setError] = useState(null);

  const [success, setSuccess] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [successMessage, setSuccessMessage] = useState('');
  
  async function send(delivery_firm_status) {

    if (isLoading) return;

    if (!window.navigator.onLine) {
      setError('_errors.No_netowrk_connection');
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const api = new OrderRepository(deliveryFirmToken);
      
      const res = await api.updateDeliveryFirmStatus(orderID, { delivery_firm_status });
      
      setIsLoading(false);

      if (res.status === 200) {
        
        setSuccess(true);

        if (delivery_firm_status === Order.STORE_STATUS_ACCEPTED) {
          setSuccessMessage('_order._order_accepted');
        } else if (delivery_firm_status === Order.STORE_STATUS_DECLINED) {
          setSuccessMessage('_order._order_declined');
        }

        orderDispatch({
          type: ORDER.FETCHED, 
          payload: {
            order: res.body.data, 
            fetchStatus: FETCH_STATUSES.DONE 
          }
        });
        
      } else if (res.status === 400) {
        
        setError('_errors.Order_business_status_update_error');

      } else {
        throw new Error();
      }
      
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setError('_errors.Something_went_wrong');
    }
  }

  return [send, success, isLoading, error, successMessage];
}

