
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import AdminApi from '../../api/AdminApi';
import DeliveryFirmApi from '../../api/DeliveryFirmApi';
import OrderApi from '../../api/OrderApi';
import StoreApi from '../../api/StoreApi';
import UserApi from '../../api/UserApi';
import AdminApp from '../../apps/AdminApp';
import { deliveryIcon, orderIcon, storeIcon, userIcon } from '../../assets/icons';
import CustomerItem from '../../components/CustomerItem';
import DeliveryFirmItem from '../../components/DeliveryFirmItem';
import EmptyList from '../../components/EmptyList';
import Loading from '../../components/Loading';
import OrderItem from '../../components/OrderItem';
import Reload from '../../components/Reload';
import StoreItem from '../../components/StoreItem';
import { 
  FETCH_STATUSES, 
  getCustomersListFetchStatusAction, 
  getDeliveryFirmsListFetchStatusAction, 
  getOrdersListFetchStatusAction, 
  getStatisticsFetchStatusAction, 
  getStoresListFetchStatusAction 
} from '../../context/AppActions';
import { useAppContext } from '../../context/AppContext';
import { useDataRender, useListRender, useMoneyFormat } from '../../context/AppHooks';

function H3({ text, viewAllHref }) {
  const { t } = useTranslation();
  return (
    <h3 className="flex mb-1">
      <span className="font-bold flex-grow">{ t(text) }</span>
      { viewAllHref && <Link to={viewAllHref} className="text-color-primary">{ t('_extra.View_all') }</Link> }
    </h3>
  );
}

function StatisticsData({ number, text, amount }) {

  const { t } = useTranslation();

  const _amount = useMoneyFormat(amount || 0);

  return (
    <li className="flex-grow w-1/3 md:w-1/4">
      <div className="shadow p-3 rounded">
        { number && <div className="font-bold">{ number }</div> }
        { amount && <div className="font-bold">{ _amount }</div> }
        <div className="text-sm">{ t(text) }</div>
      </div>
    </li>
  );
}

function DeliveryFirms() {

  const {
    user: { user },
    dashboard: {
      deliveryFirms: {
        deliveryFirms,
        deliveryFirmsFetchStatus
      }
    },
    dashboardDispatch
  } = useAppContext();

  useEffect(()=> {
    if (deliveryFirmsFetchStatus === FETCH_STATUSES.LOADING) {
      const api = new DeliveryFirmApi(user.api_token);
      api.getListByRecent(dashboardDispatch);
    }
  });

  function refetchDeliveryFirms() {
    if (deliveryFirmsFetchStatus !== FETCH_STATUSES.LOADING) 
      dashboardDispatch(getDeliveryFirmsListFetchStatusAction(FETCH_STATUSES.LOADING));
  }
  
  return(
    <div className="my-4">
      <H3 text="_delivery.Recent_delivery_firms" viewAllHref="/delivery-firms" />
      <ul className="list-x">
        { 
          useListRender(
            deliveryFirms, 
            deliveryFirmsFetchStatus,
            (item, i)=> <DeliveryFirmItem key={`delivery-${i}`} delivery={item} />, 
            (k)=> <li key={k}> <Loading /> </li>, 
            (k)=> <li key={k}> <Reload action={refetchDeliveryFirms} /> </li>,
            (k)=> <li key={k}> <EmptyList text="_empty.No_review" icon={deliveryIcon} /> </li>
          )
        }
      </ul>
    </div>
  );
}

function Stores() {

  const {
    user: { user },
    dashboard: {
      stores: {
        stores,
        storesFetchStatus
      }
    },
    dashboardDispatch
  } = useAppContext();

  useEffect(()=> {
    if (storesFetchStatus === FETCH_STATUSES.LOADING) {
      const api = new StoreApi(user.api_token);
      api.getListByRecent(dashboardDispatch);
    }
  });

  function refetchStores() {
    if (storesFetchStatus !== FETCH_STATUSES.LOADING) 
      dashboardDispatch(getStoresListFetchStatusAction(FETCH_STATUSES.LOADING));
  }
  
  return(
    <div className="my-4">
      <H3 text="_store.Recent_stores" viewAllHref="/stores" />
      <ul className="list-x">
        { 
          useListRender(
            stores, 
            storesFetchStatus,
            (item, i)=> <li key={`store-${i}`}> <StoreItem store={item} /> </li>, 
            (k)=> <li key={k}> <Loading /> </li>, 
            (k)=> <li key={k}> <Reload action={refetchStores} /> </li>,
            (k)=> <li key={k}> <EmptyList text="_empty.No_store" icon={storeIcon} /> </li>
          )
        }
      </ul>
    </div>
  );
}

function Customers() {

  const {
    user: { user },
    dashboard: {
      customers: {
        customers,
        customersFetchStatus
      }
    },
    dashboardDispatch
  } = useAppContext();

  useEffect(()=> {
    if (customersFetchStatus === FETCH_STATUSES.LOADING) {
      const api = new UserApi(user.api_token);
      api.getListByRecent(dashboardDispatch);
    }
  });

  function refetchCustomers() {
    if (customersFetchStatus !== FETCH_STATUSES.LOADING) 
      dashboardDispatch(getCustomersListFetchStatusAction(FETCH_STATUSES.LOADING));
  }
  
  return(
    <div className="my-4">
      <H3 text="_user.Recent_customers" viewAllHref="/customers" />
      <ul className="list-3-x">
        { 
          useListRender(
            customers, 
            customersFetchStatus,
            (item, i)=> <CustomerItem key={`customer-${i}`} customer={item} />, 
            (k)=> <li key={k}> <Loading /> </li>, 
            (k)=> <li key={k}> <Reload action={refetchCustomers} /> </li>,
            (k)=> <li key={k}> <EmptyList text="_empty.No_review" icon={userIcon} /> </li>
          )
        }
      </ul>
    </div>
  );
}

function Orders() {

  const {
    user: { user },
    dashboard: {
      orders: {
        orders,
        ordersFetchStatus
      }
    },
    dashboardDispatch
  } = useAppContext();

  useEffect(()=> {
    if (ordersFetchStatus === FETCH_STATUSES.LOADING) {
      const api = new OrderApi(user.api_token);
      api.getListByRecent(dashboardDispatch);
    }
  });

  function refetchOrders() {
    if (ordersFetchStatus !== FETCH_STATUSES.LOADING) 
      dashboardDispatch(getOrdersListFetchStatusAction(FETCH_STATUSES.LOADING));
  }
  
  return (
    <div className="my-4">
      <H3 text="_order.Recent_orders" viewAllHref="/orders" />
      <ul className="list-2-x">
        { 
          useListRender(
            orders, 
            ordersFetchStatus,
            (item, i)=> <OrderItem key={`order-${i}`} order={item} href={`/order/${item.id}`} appType={AdminApp.TYPE} />,
            (k)=> <li key={k}> <Loading /> </li>, 
            (k)=> <li key={k}> <Reload action={refetchOrders} /> </li>,
            (k)=> <li key={k}> <EmptyList text="_empty.No_order" icon={orderIcon} /> </li>, 
          )
        }
      </ul>
    </div>
  )
}

function Statistics() {
  
  const {
    user: { user },
    dashboard: {
      statistics: {
        statistics,
        statisticsFetchStatus
      }
    },
    dashboardDispatch
  } = useAppContext();

  useEffect(()=> {
    if (statisticsFetchStatus === FETCH_STATUSES.LOADING) {
      const api = new AdminApi(user.api_token);
      api.getStatistics(dashboardDispatch);
    }
  });

  function refetchStatistics() {
    if (statisticsFetchStatus !== FETCH_STATUSES.LOADING) 
      dashboardDispatch(getStatisticsFetchStatusAction(FETCH_STATUSES.LOADING));
  }


  return(
    <div className="my-4">
      <H3 text="_extra.Statistics" />
      <ul className="flex gap-2 flex-wrap mb-8 md:gap-4">
        { 
          useDataRender(
            statistics, 
            statisticsFetchStatus,
            ()=> (
              <>
                <StatisticsData number={statistics.customers_number} text="_user.Customers" />
                <StatisticsData number={statistics.stores_number} text="_store.Stores" />
                <StatisticsData number={statistics.delivery_firms_number} text="_delivery.Delivery_firms" />
                <StatisticsData number={statistics.categories_number} text="_category.Categories" />
                <StatisticsData number={statistics.orders_number} text="_order.Orders" />
                <StatisticsData amount={statistics.earnings_total} text="_transaction.Earnings" />
              </>
            ),
            ()=> <li> <Loading /> </li>, 
            ()=> <li> <Reload action={refetchStatistics} /> </li>,
          )
        }
      </ul>
    </div>
  );
}

export default function Dashboard() {

  const {
    dashboard: {
      statistics: {
        statistics
      },
      stores: {
        stores
      },
      customers: {
        customers
      },
      orders: {
        orders
      }
    }
  } = useAppContext();

  return (
    <section>
      <div className="container-x">
        
        <Statistics />

        { statistics && <Orders /> }

        { statistics && orders && <Customers /> }

        { statistics && orders && customers && <Stores /> }

        { statistics && orders && customers && stores && <DeliveryFirms /> }

      </div>
    </section>
  );
}


