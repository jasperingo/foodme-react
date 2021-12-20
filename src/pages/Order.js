
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import OrderApi from '../api/OrderApi';
import AdminApp from '../apps/AdminApp';
import StoreApp from '../apps/StoreApp';
import H4Heading from '../components/H4Heading';
import Loading from '../components/Loading';
import OrderItemItem from '../components/OrderItemItem';
import ProfileDetailsText from '../components/ProfileDetailsText';
import ProfileHeaderText from '../components/ProfileHeaderText';
import Reload from '../components/Reload';
import UserDescList from '../components/UserDescList';
import { FETCH_STATUSES, getOrderFetchStatusAction, ORDER } from '../context/AppActions';
import { useAppContext } from '../context/AppContext';
import { useDataRender, useDateFormat, useMoneyFormat, useOrderStatus } from '../context/AppHooks';


function Profile({ order, appType }) {
  
  const { t } = useTranslation();

  const [theStatus] = useOrderStatus(order.status);

  const usersLinks = [];

  if (order.customer) {
    usersLinks.push({
      href: appType === AdminApp.TYPE ? `/customer/${order.customer.id}` : `/messages/${order.customer.id}`,
      photo: `/photos/customer/${order.customer.photo}`,
      name: `${order.customer.first_name} ${order.customer.last_name}`,
      title: '_order.Ordered_by'
    });
  }

  if (order.store) {
    usersLinks.push({
      href: appType === AdminApp.TYPE ? `/customer/${order.store.id}` : `/messages/${order.store.id}`,
      photo: `/photos/store/${order.store.photo}`,
      name: order.store.name,
      title: '_order.Ordered_from'
    });
  }

  if (order.delivery_firm) {
    usersLinks.push({
      href: appType === AdminApp.TYPE ? `/delivery-firm/${order.delivery_firm.id}` : `/messages/${order.delivery_firm.id}`,
      photo: `/photos/delivery-firm/${order.delivery_firm.photo}`,
      name: order.delivery_firm.name,
      title: '_order.Delivered_by'
    });
  }

  function onTrackClicked() {
    console.log('Tracking...')
  }

  function onCancelClicked() {
    console.log('Cancel...')
  }

  function onReorderClicked() {
    console.log('Reorder...')
  }

  function onAcceptClicked() {
    console.log('Accept...')
  }

  function onDeclineClicked() {
    console.log('Decline...')
  }

  return (
    <>
      <div className="py-2 border-b">
        <div className="container-x">

          <ProfileHeaderText
            text={`#${order.number}`}
            buttons={[
              {
                text: '_extra.Track',
                color: 'btn-color-primary',
                action: onTrackClicked
              },
              {
                text: '_order.Reorder',
                color: 'btn-color-primary',
                action: onReorderClicked
              },
              {
                text: '_extra.Accept',
                color: 'btn-color-primary',
                action: onAcceptClicked
              },
              {
                text: '_extra.Cancel',
                color: 'btn-color-red',
                action: onCancelClicked
              },
              {
                text: '_extra.Decline',
                color: 'btn-color-red',
                action: onDeclineClicked
              }
            ]}
            />

          <ProfileDetailsText
            details={[
              {
                title: '_order.Placed_on',
                body: useDateFormat(order.created_at)
              },
              {
                title: '_extra.Status',
                body: t(theStatus)
              },
              {
                title: '_extra.Items',
                body: t('_order.item__Num', { count: order.number_of_items })
              },
              {
                title: '_extra.Total',
                body: useMoneyFormat(order.total)
              },
              {
                title: '_order.Items_total',
                body: useMoneyFormat(order.items_total)
              },
              {
                title: '_delivery.Delivery_fee',
                body: useMoneyFormat(order.delivery_fee)
              },
              {
                title: '_delivery.Delivery_method',
                body: order.delivery_method
              },
              {
                title: '_delivery.Delivery_address',
                body: `${order.delivery_address.street}, ${order.delivery_address.city}, ${order.delivery_address.state}`
              }
            ]}
            />

          <UserDescList users={usersLinks} />

        </div>
      </div>
      
      <div className="py-2 border-b">
        <div className="container-x">
          <H4Heading color="text-color-gray" text={ t('_order.Order_items') } />
          <ul className="list-3-x">
            {
              order.items.map((item, i)=> <OrderItemItem key={`order-item-${item.id}`} item={item} />)
            }
          </ul>
        </div>
      </div>
    </>
  );
}

export default function Order() {

  const ID = parseInt(useParams().ID);

  const { 
    user: { user },
    orders: {
      order: {
        order,
        orderFetchStatus
      }
    }, 
    ordersDispatch 
  } = useAppContext();

  useEffect(()=> {
    if (order !== null && ID !== order.id) {
      ordersDispatch({ type: ORDER.UNFETCH });
    } else if (orderFetchStatus === FETCH_STATUSES.LOADING) {
      const api = new OrderApi(user.api_token);
      api.get(ID, ordersDispatch);
    }
  }, [ID, user, order, orderFetchStatus, ordersDispatch]);

  function refetchOrder() {
    if (orderFetchStatus !== FETCH_STATUSES.LOADING) 
      ordersDispatch(getOrderFetchStatusAction(FETCH_STATUSES.LOADING));
  }

  return (
    <section>
      { 
        useDataRender(
          order, 
          orderFetchStatus,
          ()=> <Profile order={order} appType={StoreApp.TYPE} />,
          ()=> <div className="container-x"> <Loading /> </div>, 
          ()=> <div className="container-x"> <Reload action={refetchOrder} /> </div>,
        )
      }
    </section>
  );
}


