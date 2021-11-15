
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import StoreApp from '../../apps/StoreApp';
import Loading from '../../components/Loading';
import OrderView from '../../components/OrderView';
import Reload from '../../components/Reload';
import { FETCH_STATUSES, ORDER } from '../../context/AppActions';
import { API_URL, useAppContext } from '../../context/AppContext';
import { useDataRender } from '../../context/AppHooks';

const getFetchStatusAction = (payload) => ({
  type: ORDER.FETCH_STATUS_CHANGED,
  payload
});

export default function Order() {

  const ID = parseInt(useParams().ID);

  const { orders: {
    order: {
      order,
      orderFetchStatus
    }
  }, ordersDispatch } = useAppContext();

  useEffect(()=>{

    async function fetchOrder() {
      if (orderFetchStatus !== FETCH_STATUSES.LOADING) 
        return;
      
      try {
        let response = await fetch(`${API_URL}order.json?id=${ID}`);

        if (!response.ok)
          throw new Error(response.status);
        
        let data = await response.json();

        data.data.id = ID;
        
        ordersDispatch({
          type: ORDER.FETCHED,
          payload: data.data
        });

      } catch (err) {
        ordersDispatch(getFetchStatusAction(FETCH_STATUSES.ERROR));
      }
    }

    if (order !== null && ID !== order.id) {
      ordersDispatch({
        type: ORDER.UNFETCH
      });
    }

    fetchOrder();

  }, [ID, order, orderFetchStatus, ordersDispatch]);

  function refetchOrder() {
    if (orderFetchStatus === FETCH_STATUSES.LOADING) 
      return;
    
    ordersDispatch(getFetchStatusAction(FETCH_STATUSES.LOADING));
  }

  
  return (
    <section>

      { 
        useDataRender(
          order, 
          orderFetchStatus,
          ()=> <OrderView order={order} appType={StoreApp.TYPE} />,
          (k)=> <div className="container-x"> <Loading /> </div>, 
          (k)=> <div className="container-x"> <Reload action={refetchOrder} /> </div>,
        )
      }

    </section>
  );
}


