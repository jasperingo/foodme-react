
import React, { useCallback, useEffect } from 'react';
import Forbidden from '../components/Forbidden';
import Loading from '../components/Loading';
import NotFound from '../components/NotFound';
import Reload from '../components/Reload';
import { useOrderFetch } from '../hooks/order/orderFetchHook';
import OrderProfile from '../components/profile/OrderProfile';
import { useHeader } from '../hooks/headerHook';
import NetworkErrorCodes from '../errors/NetworkErrorCodes';
import { useParams } from 'react-router-dom';

export default function Order({ userToken, isCustomer, isDeliveryFirm, isStore }) {

  const { ID } = useParams();

  const [
    fetchOrder,
    order,
    orderLoading,
    orderError,
    orderID,
    unfetchOrder
  ] = useOrderFetch(userToken);
  
  useHeader({ 
    title: `${order?.number ?? 'Loading...'} - Order`,
    headerTitle: "_order.Order"
  });

  const fetch = useCallback(
    function(ID) {
      if (!orderLoading) fetchOrder(ID);
    },
    [orderLoading, fetchOrder]
  );

  useEffect(
    function() {
      if ((order !== null || orderError !== null) && orderID !== ID) 
        unfetchOrder();
      else if (order === null && orderError === null)
        fetch(ID);
    },
    [ID, order, orderError, orderID, fetch, unfetchOrder]
  );

  return (
    <section>
      
      { 
        order !== null && 
        <OrderProfile 
          order={order} 
          isCustomer={isCustomer} 
          isDeliveryFirm={isDeliveryFirm} 
          isStore={isStore} 
          userToken={userToken} 
          /> 
      }

      {
        order === null &&
        <div className="container-x">
          { orderLoading && <Loading /> }

          {  orderError === NetworkErrorCodes.NOT_FOUND && <NotFound /> }

          {  orderError === NetworkErrorCodes.FORBIDDEN && <Forbidden /> }

          { orderError === NetworkErrorCodes.UNKNOWN_ERROR && <Reload action={()=> fetch(ID)} /> }

          { orderError === NetworkErrorCodes.NO_NETWORK_CONNECTION && <Reload message="_errors.No_netowrk_connection" action={()=> fetch(ID)} /> }
        </div>
      }
    </section>
  );
}
