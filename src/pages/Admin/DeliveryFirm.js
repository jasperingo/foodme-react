
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Forbidden from '../../components/Forbidden';
import Loading from '../../components/Loading';
import NotFound from '../../components/NotFound';
import DeliveryFirmProfile from '../../components/profile/DeliveryFirmProfile';
import OrderList from '../../components/profile/section/OrderList';
import ReviewList from '../../components/profile/section/ReviewList';
import RouteList from '../../components/profile/section/RouteList';
import TransactionList from '../../components/profile/section/TransactionList';
import Reload from '../../components/Reload';
import { useAppContext } from '../../hooks/contextHook';
import { useDeliveryFirmFetch } from '../../hooks/delivery_firm/deliveryFirmFetchHook';
import { useDeliveryFirmOrderList } from '../../hooks/delivery_firm/deliveryFirmOrderListHook';
import { useDeliveryFirmReviewList } from '../../hooks/delivery_firm/deliveryFirmReviewListHook';
import { useDeliveryFirmRouteList } from '../../hooks/delivery_firm/deliveryFirmRouteListHook';
import { useDeliveryFirmTransactionList } from '../../hooks/delivery_firm/deliveryFirmTransactionListHook';
import { useHeader } from '../../hooks/headerHook';
import { useRenderOnDataFetched } from '../../hooks/viewHook';

const NAV_LINKS = [
  { title : '_delivery.Routes', href: '' },
  { title : '_extra.Reviews', href: '/reviews' },
  { title : '_order.Orders', href: '/orders' },
  { title : '_transaction.Transactions', href: '/transactions' }
];

function DeliveryFirmTransactionsList() {

  const { 
    admin: { 
      admin: {
        adminToken
      }
    }, 
  } = useAppContext();
  
  const [
    transactions, 
    transactionsFetchStatus, 
    transactionsPage, 
    transactionsNumberOfPages, 
    refetch
  ] = useDeliveryFirmTransactionList(adminToken);

  return (
    <TransactionList
      transactions={transactions}
      transactionsFetchStatus={transactionsFetchStatus}
      transactionsPage={transactionsPage}
      transactionsNumberOfPages={transactionsNumberOfPages}
      refetch={refetch}
      />
  );
}

function DeliveryFirmOrdersList() {

  const { 
    admin: { 
      admin: {
        adminToken
      }
    }
  } = useAppContext();

  const [
    orders, 
    ordersFetchStatus, 
    ordersPage, 
    ordersNumberOfPages, 
    refetch,
  ] = useDeliveryFirmOrderList(adminToken);

  return (
    <OrderList 
      orders={orders}
      ordersFetchStatus={ordersFetchStatus}
      ordersPage={ordersPage}
      ordersNumberOfPages={ordersNumberOfPages}
      refetch={refetch}
      />
  );
}

function DeliveryFirmReviewsList() {

  const {
    admin: { 
      admin: {
        adminToken
      }
    } 
  } = useAppContext();
  
  const [
    reviews, 
    reviewsFetchStatus, 
    reviewsPage, 
    reviewsNumberOfPages, 
    refetch
  ] = useDeliveryFirmReviewList(adminToken);

  return (
    <ReviewList 
      reviews={reviews}
      reviewsFetchStatus={reviewsFetchStatus}
      reviewsPage={reviewsPage}
      reviewsNumberOfPages={reviewsNumberOfPages}
      refetch={refetch}
      />
  );
}

function DeliveryFirmRoutesList() {
  
  const {
    admin: { 
      admin: {
        adminToken
      }
    } 
  } = useAppContext();

  const [
    routes, 
    routesFetchStatus, 
    routesPage, 
    routesNumberOfPages, 
    refetch
  ] = useDeliveryFirmRouteList(adminToken);
  
  return (
    <RouteList 
      routes={routes}
      routesFetchStatus={routesFetchStatus}
      routesPage={routesPage}
      routesNumberOfPages={routesNumberOfPages}
      refetch={refetch}
      />
  );
}

export default function DeliveryFirm() {

  const match = useRouteMatch();

  const {
    admin: { 
      admin: {
        adminToken
      }
    } 
  } = useAppContext();

  const [
    deliveryFirm, 
    deliveryFirmFetchStatus,
    refetch
  ] = useDeliveryFirmFetch(adminToken);


  useHeader({ 
    title: `${deliveryFirm?.user.name ?? 'Loading...'} - Delivery Firm`,
    headerTitle: '_delivery.Delivery_firm'
  });

  return (
    <section>

      <div className="container-x">
        {
          useRenderOnDataFetched(
            deliveryFirmFetchStatus,
            ()=> <DeliveryFirmProfile deliveryFirm={deliveryFirm} navLinks={NAV_LINKS} isAdmin={true} />,
            ()=> <Loading />,
            ()=> <Reload action={refetch} />,
            ()=> <NotFound />,
            ()=> <Forbidden />,
          )
        }
      </div>

      {
        deliveryFirm && 
        <Switch>
          <Route path={`${match.url}/transactions`} render={()=> <DeliveryFirmTransactionsList />} />
          <Route path={`${match.url}/orders`} render={()=> <DeliveryFirmOrdersList />} />
          <Route path={`${match.url}/reviews`} render={()=> <DeliveryFirmReviewsList />} /> 
          <Route path={match.url} render={()=> <DeliveryFirmRoutesList />} />
        </Switch>
      }

    </section>
  );
}
