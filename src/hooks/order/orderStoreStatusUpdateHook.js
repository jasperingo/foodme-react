import { useState } from "react";
import { ORDER } from "../../context/actions/orderActions";
import Order from "../../models/Order";
import OrderRepository from "../../repositories/OrderRepository";
import { useAppContext } from "../contextHook";

export function useStoreStatusUpdate() {

  const {
    order: { 
      orderDispatch,
      order: {
        orderID,
      } 
    },
    store: { 
      store: {
        storeToken
      } 
    }
  } = useAppContext();

  const [error, setError] = useState(null);

  const [success, setSuccess] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [successMessage, setSuccessMessage] = useState('');
  
  async function send(store_status) {

    if (isLoading) return;

    if (!window.navigator.onLine) {
      setError('_errors.No_netowrk_connection');
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const api = new OrderRepository(storeToken);
      
      const res = await api.updateStoreStatus(orderID, { store_status });
      
      setIsLoading(false);

      if (res.status === 200) {
        
        setSuccess(true);

        if (store_status === Order.STORE_STATUS_ACCEPTED) {
          setSuccessMessage('_order._order_accepted');
        } else if (store_status === Order.STORE_STATUS_DECLINED) {
          setSuccessMessage('_order._order_declined');
        }

        orderDispatch({
          type: ORDER.FETCHED, 
          payload: {
            id: orderID,
            order: res.body.data,
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
