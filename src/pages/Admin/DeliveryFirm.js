
import React, { useEffect } from 'react';
import { Route, Switch, useRouteMatch, useParams } from 'react-router-dom';
import Forbidden from '../../components/Forbidden';
import OrderList from '../../components/list/OrderList';
import ReviewList from '../../components/list/ReviewList';
import RouteList from '../../components/list/RouteList';
import TransactionList from '../../components/list/TransactionList';
import Loading from '../../components/Loading';
import NotFound from '../../components/NotFound';
import DeliveryFirmProfile from '../../components/profile/DeliveryFirmProfile';
import Reload from '../../components/Reload';
import ReviewRaterAndSummary from '../../components/review/ReviewRaterAndSummary';
import NetworkErrorCodes from '../../errors/NetworkErrorCodes';
import { useAppContext } from '../../hooks/contextHook';
import { useDeliveryFirmFetch } from '../../hooks/delivery_firm/deliveryFirmFetchHook';
import { useDeliveryFirmOrderList } from '../../hooks/delivery_firm/deliveryFirmOrderListHook';
import { useDeliveryFirmReviewList } from '../../hooks/delivery_firm/deliveryFirmReviewListHook';
import { useDeliveryFirmRouteList } from '../../hooks/delivery_firm/deliveryFirmRouteListHook';
import { useDeliveryFirmTransactionList } from '../../hooks/delivery_firm/deliveryFirmTransactionListHook';
import { useHeader } from '../../hooks/headerHook';

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
    deliveryFirm: { 
      deliveryFirm: {
        deliveryFirm,
      }
    } 
  } = useAppContext();
  
  const [
    fetchDeliveryFirmTransactions,
    transactions, 
    transactionsLoading,
    transactionsLoaded,
    transactionsError,
    transactionsPage, 
    transactionsNumberOfPages
  ] = useDeliveryFirmTransactionList(adminToken);

  useEffect(
    function() { 
      if (!transactionsLoaded && transactionsError === null) 
        fetchDeliveryFirmTransactions(deliveryFirm.id); 
    },
    [deliveryFirm.id, transactionsLoaded, transactionsError, fetchDeliveryFirmTransactions]
  );

  return (
    <TransactionList
      transactions={transactions}
      transactionsPage={transactionsPage}
      transactionsError={transactionsError}
      transactionsLoading={transactionsLoading}
      transactionsLoaded={transactionsLoaded}
      transactionsNumberOfPages={transactionsNumberOfPages}
      fetchTransactions={()=> fetchDeliveryFirmTransactions(deliveryFirm.id)}
      />
  );
}

function DeliveryFirmOrdersList() {

  const { 
    admin: { 
      admin: {
        adminToken
      }
    },
    deliveryFirm: { 
      deliveryFirm: {
        deliveryFirm
      }
    } 
  } = useAppContext();

  const [
    fetchDeliveryFirmOrders,
    orders, 
    ordersLoaded,
    ordersLoading,
    ordersError,
    ordersPage, 
    ordersNumberOfPages
  ] = useDeliveryFirmOrderList(adminToken);

  useEffect(
    function() { 
      if (!ordersLoaded && ordersError === null) 
        fetchDeliveryFirmOrders(deliveryFirm.id); 
    },
    [deliveryFirm.id, ordersLoaded, ordersError, fetchDeliveryFirmOrders]
  );

  return (
    <OrderList 
      orders={orders}
      ordersPage={ordersPage}
      ordersError={ordersError}
      ordersLoaded={ordersLoaded}
      ordersLoading={ordersLoading}
      ordersNumberOfPages={ordersNumberOfPages}
      fetchOrders={()=> fetchDeliveryFirmOrders(deliveryFirm.id)}
      />
  );
}

function DeliveryFirmReviewsList() {

  const {
    admin: { 
      admin: {
        adminToken
      }
    },
    deliveryFirm: {
      deliveryFirm: {
        deliveryFirm
      }
    }
  } = useAppContext();
  
  const [
    fetchDeliveryFirmReviews,
    reviews, 
    reviewsLoading,
    reviewsLoaded,
    reviewsError,
    reviewsPage, 
    reviewsNumberOfPages
  ] = useDeliveryFirmReviewList(adminToken);

  useEffect(
    function() {
      if (!reviewsLoaded && reviewsError === null) 
        fetchDeliveryFirmReviews(deliveryFirm.id); 
    },
    [deliveryFirm.id, reviewsError, reviewsLoaded, fetchDeliveryFirmReviews]
  );

  return (
    <>
      <div className="container-x">
        <ReviewRaterAndSummary summary={deliveryFirm.review_summary} />
      </div>

      <ReviewList 
        single={false}
        reviews={reviews} 
        reviewsLoading={reviewsLoading}
        reviewsLoaded={reviewsLoaded}
        reviewsError={reviewsError}
        reviewsPage={reviewsPage}
        reviewsNumberOfPages={reviewsNumberOfPages}
        fetchReviews={()=> fetchDeliveryFirmReviews(deliveryFirm.id)}
        />
    </>
  );
}

function DeliveryFirmRoutesList() {

  const {
    admin: { 
      admin: {
        adminToken
      }
    },
    deliveryFirm: {
      deliveryFirm: {
        deliveryFirm
      }
    } 
  } = useAppContext();

  const [
    fetchDeliveryFirmRoutes,
    routes, 
    routesLoading,
    routesError,
    routesLoaded,
    routesPage, 
    routesNumberOfPages,
  ] = useDeliveryFirmRouteList(adminToken);
  
  useEffect(
    function() {
      if (!routesLoaded && routesError === null) 
        fetchDeliveryFirmRoutes(deliveryFirm.id); 
    },
    [deliveryFirm.id, routesError, routesLoaded, fetchDeliveryFirmRoutes]
  );

  return (
    <RouteList 
      routes={routes}
      routesPage={routesPage}
      routesError={routesError}
      routesLoaded={routesLoaded}
      routesLoading={routesLoading}
      routesNumberOfPages={routesNumberOfPages}
      fetchRoutes={()=> fetchDeliveryFirmRoutes(deliveryFirm.id)}
      />
  );
}

export default function DeliveryFirm() {

  const { ID } = useParams();

  const match = useRouteMatch();

  const {
    admin: { 
      admin: {
        adminToken
      }
    } 
  } = useAppContext();

  const [
    fetchDeliveryFirm,
    deliveryFirm,
    deliveryFirmLoading,
    deliveryFirmError,
    deliveryFirmID,
    unfetchDeliveryFirm
  ] = useDeliveryFirmFetch(adminToken);

  useHeader({ 
    title: `${deliveryFirm?.user.name ?? 'Loading...'} - Delivery Firm`,
    headerTitle: '_delivery.Delivery_firm'
  });

  useEffect(
    function() {
      if ((deliveryFirm !== null || deliveryFirmError !== null) && deliveryFirmID !== ID) 
        unfetchDeliveryFirm();
      else if (deliveryFirm === null && deliveryFirmError === null)
        fetchDeliveryFirm(ID);
    },
    [ID, deliveryFirm, deliveryFirmError, deliveryFirmID, fetchDeliveryFirm, unfetchDeliveryFirm]
  );

  return (
    <section>

      <div className="container-x">
        
        { deliveryFirm !== null && <DeliveryFirmProfile deliveryFirm={deliveryFirm} navLinks={NAV_LINKS} isAdmin={true} /> }
        { deliveryFirmLoading && <Loading /> }
        { deliveryFirmError === NetworkErrorCodes.NOT_FOUND && <NotFound /> }
        { deliveryFirmError === NetworkErrorCodes.FORBIDDEN && <Forbidden /> }
        { deliveryFirmError === NetworkErrorCodes.UNKNOWN_ERROR && <Reload action={()=> fetchDeliveryFirm(ID)} /> }
        { deliveryFirmError === NetworkErrorCodes.UNKNOWN_ERROR && <Reload message="_errors.No_netowrk_connection" action={()=> fetchDeliveryFirm(ID)} /> }
        
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
