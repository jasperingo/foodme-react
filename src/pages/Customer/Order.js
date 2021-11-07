
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import Loading from '../../components/Loading';
import OrderItemItem from '../../components/OrderItemItem';
import Reload from '../../components/Reload';
import { FETCH_STATUSES, ORDER } from '../../context/AppActions';
import { API_URL, useAppContext } from '../../context/AppContext';
import { useDataRender, useDateFormat, useMoneyFormat, useOrderStatus } from '../../context/AppHooks';
import DeliveryIcon from '../../icons/DeliveryIcon';
import StoreIcon from '../../icons/StoreIcon';

const getFetchStatusAction = (payload) => ({
  type: ORDER.FETCH_STATUS_CHANGED,
  payload
});


function OrderView({ order }) {

  const { t } = useTranslation();

  const [theStatus, statusColor] = useOrderStatus(order.status);
  
  return (
    <>
      <div className="py-4 border-b">
        <div className="container-x">
          
          <h3 className="text-3xl font-bold mb-1">#{ order.number }</h3>

          <div className={`${statusColor} inline-block py-1 px-2 rounded mb-1`}>{ t(theStatus) }</div>

          <div className="mb-1">{ t('_order.item__Num', { count: order.number_of_items }) }</div>

          <div className="text-color-primary font-bold mb-1">
            <span>{ t('_extra.Total') }: </span> 
            <span>{ useMoneyFormat(order.total) }</span>
          </div>

          <div>
            <span>{ t('_order.Placed_on') }: </span>
            <span>{ useDateFormat(order.created_at) }</span>
          </div>

          <div className="my-2">
            <div className="text-sm font-bold">{ t('_order.Ordered_from') }</div>
            <Link to={`/store/${order.store.id}/products`} className="flex gap-1 items-center">
              <StoreIcon classList="text-color-primary w-8 h-8" />
              <div>{ order.store.name }</div>
            </Link>
          </div>

          <button className="btn-color-primary p-2 rounded my-2">{ t('_order.Reorder') }</button>
        </div>
      </div>

      <div className="py-4 border-b">
        <div className="container-x lg:flex lg:gap-4">
          <div className="lg:w-1/2">
            <h4 className="font-bold py-2 text-color-primary">{ t('_order.Payment_information') }</h4>
            <dl>
              <div className="mb-2">
                <dt className="text-sm font-bold">{ t('_transaction.Payment_method') }</dt>
                <dd>{ order.payment_method }</dd>
              </div>
              <div>
                <dt className="text-sm font-bold">{ t('_transaction.Payment_details') }</dt>
                <dd>
                  <ul>
                    <li>
                      <span>{ t('_order.Items_total') }: </span>
                      <span>{ useMoneyFormat(order.items_total) }</span>
                    </li>
                    <li>
                      <span>{ t('_delivery.Delivery_fee') }: </span>
                      <span>{ useMoneyFormat(order.delivery_fee) }</span>
                    </li>
                    <li>
                      <span>{ t('_discount.Discount_amount') }: </span>
                      <span>{ useMoneyFormat(order.discount_amount) }</span>
                    </li>
                    <li>
                      <span>{ t('_extra.Total') }: </span>
                      <span>{ useMoneyFormat(order.total) }</span>
                    </li>
                  </ul>
                </dd>
              </div>
            </dl>
          </div> 

          <div className="lg:w-1/2">
            <h4 className="font-bold py-2 text-color-primary">{ t('_order.Delivery_information') }</h4>
            <dl>
              <div className="mb-2">
                <dt className="text-sm font-bold">{ t('_delivery.Delivery_method') }</dt>
                <dd>{ order.delivery_method }</dd>
              </div>
              <div className="mb-2">
                <dt className="text-sm font-bold">{ t('_delivery.Delivery_company') }</dt>
                <dd>
                  <div className="flex gap-1 items-center">
                    <DeliveryIcon classList="text-color-primary w-8 h-8" />
                    <div>{ order.delivery_agent.name }</div>
                  </div>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-bold">{ t('_delivery.Delivery_address') }</dt>
                <dd>{ order.delivery_address }</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    

      <div className="py-4 border-b">
        <div className="container-x">
          <h4 className="font-bold py-2 text-color-gray">{ t('_order.Order_items') }</h4>
          <ul>
            {
              order.items.map((item, i)=> <OrderItemItem key={`order-item-${item.id}`} item={item} />)
            }
          </ul>
        </div>
      </div>
    </>
  )
}

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
    <section className="flex-grow">

      { 
        useDataRender(
          order, 
          orderFetchStatus,
          ()=> <OrderView order={order} />,
          (k)=> <div className="container-x"> <Loading /> </div>, 
          (k)=> <div className="container-x"> <Reload action={refetchOrder} /> </div>,
        )
      }

    </section>
  );
}


