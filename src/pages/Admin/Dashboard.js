
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import H4Heading from '../../components/H4Heading';
import CustomerList from '../../components/list/CustomerList';
import DeliveryFirmList from '../../components/list/DeliveryFirmList';
import OrderList from '../../components/list/OrderList';
import StoreList from '../../components/list/StoreList';
import Loading from '../../components/Loading';
import RefreshButton from '../../components/RefreshButton';
import Reload from '../../components/Reload';
import { useDashboardCustomerList } from '../../hooks/dashboard/dashboardCustomerListHook';
import { useDashboardDeliveryFirmList } from '../../hooks/dashboard/dashboardDeliveryFirmListHook';
import { useDashboardOrderList } from '../../hooks/dashboard/dashboardOrderListHook';
import { useDashboardStatistics } from '../../hooks/dashboard/dashboardStatisticsHook';
import { useDashboardStoreList } from '../../hooks/dashboard/dashboardStoreListHook';
import { useHeader } from '../../hooks/headerHook';
import { useMoneyFormatter } from '../../hooks/viewHook';

function StatisticsData({ number, text, amount }) {

  const { t } = useTranslation();

  const moneyFormat = useMoneyFormatter();

  return (
    <li className="flex-grow w-1/3 md:w-1/4">
      <div className="shadow p-3 rounded">
        { number && <div className="font-bold">{ number }</div> }
        { amount && <div className="font-bold">{ moneyFormat(amount) }</div> }
        <div className="text-sm">{ t(text) }</div>
      </div>
    </li>
  );
}

function Statistics() {
  
  const [
    fetchStatistics,
    statistics,
    statisticsLoading,
    statisticsError,
    unfetchStatistics
  ] = useDashboardStatistics();

  useEffect(
    function() {
      if (statistics === null && statisticsError === null)
        fetchStatistics();
    },
    [statistics, statisticsError, fetchStatistics]
  );

  return(
    <div className="container-x my-4">
      <div className="flex justify-between items-center">
        <H4Heading text="_extra.Statistics" />
        <RefreshButton onRefresh={unfetchStatistics} />
      </div>
      <ul className="flex gap-2 flex-wrap mb-8 md:gap-4">
        { 
          statistics !== null &&
          <>
            <StatisticsData number={statistics.number_of_customers} text="_user.Customers" />
            <StatisticsData number={statistics.number_of_stores} text="_store.Stores" />
            <StatisticsData number={statistics.number_of_delivery_firms} text="_delivery.Delivery_firms" />
            <StatisticsData number={statistics.number_of_categories} text="_category.Categories" />
            <StatisticsData number={statistics.number_of_products} text="_product.Products" />
            <StatisticsData number={statistics.number_of_orders} text="_order.Orders" />
            <StatisticsData amount={statistics.total_earnings} text="_transaction.Earnings" />
          </>
        }

        { statisticsLoading && <li className="flex-grow"> <Loading /> </li> }
        { statisticsError && <li className="flex-grow"> <Reload action={fetchStatistics} /> </li> }
      </ul>
    </div>
  );
}

function DeliveryFirms() {

  const [
    fetchDeliveryFirms,
    deliveryFirms, 
    deliveryFirmsLoading,
    deliveryFirmsLoaded,
    deliveryFirmsError,
    refreshDeliveryFirms
  ] = useDashboardDeliveryFirmList();

  useEffect(
    function() {
      if (!deliveryFirmsLoaded && deliveryFirmsError === null) 
        fetchDeliveryFirms();
    }, 
    [deliveryFirmsLoaded, deliveryFirmsError, fetchDeliveryFirms]
  );

  return(
    <div className="my-4">
      <div className="container-x">
        <H4Heading text="_delivery.Recent_delivery_firms" href="/delivery-firms" />
      </div>
      <DeliveryFirmList
        single={true}
        fetchDeliveryFirms={fetchDeliveryFirms}
        deliveryFirms={deliveryFirms} 
        deliveryFirmsLoading={deliveryFirmsLoading}
        deliveryFirmsLoaded={deliveryFirmsLoaded}
        deliveryFirmsError={deliveryFirmsError}
        refreshList={refreshDeliveryFirms}
        />
    </div>
  );
}

function Stores() {

  const [
    fetchStores,
    stores, 
    storesLoading,
    storesLoaded,
    storesError,
    refreshStores
  ] = useDashboardStoreList();
  
  useEffect(
    function() {
      if (!storesLoaded && storesError === null) 
        fetchStores();
    }, 
    [storesLoaded, storesError, fetchStores]
  );

  return(
    <div className="my-4">
      <div className="container-x">
        <H4Heading text="_store.Recent_stores" href="/stores" />
      </div>
      <StoreList 
        single={true}
        stores={stores}
        storesError={storesError}
        storesLoaded={storesLoaded}
        storesLoading={storesLoading}
        fetchStores={fetchStores}
        refreshList={refreshStores}
        />
    </div>
  );
}

function Customers() {

  const [
    fetchCustomers,
    customers, 
    customersLoading,
    customersLoaded,
    customersError,
    refreshCustomers
  ] = useDashboardCustomerList();

  useEffect(
    function() {
      if (!customersLoaded && customersError === null) 
        fetchCustomers();
    }, 
    [customersLoaded, customersError, fetchCustomers]
  );
  
  return(
    <div className="my-4">
      <div className="container-x">
        <H4Heading text="_user.Recent_customers" href="/customers" />
      </div>
      <CustomerList
        single={true}
        fetchCustomers={fetchCustomers}
        customers={customers} 
        customersLoading={customersLoading}
        customersLoaded={customersLoaded}
        customersError={customersError}
        refreshList={refreshCustomers}
        />
    </div>
  );
}

function Orders() {

  const [
    fetchOrders,
    orders, 
    ordersLoading,
    ordersLoaded,
    ordersError,
    refreshOrders
  ] = useDashboardOrderList();

  useEffect(
    function() { 
      if (!ordersLoaded && ordersError === null) 
        fetchOrders(); 
    },
    [ordersLoaded, ordersError, fetchOrders]
  );
  
  return (
    <div className="my-4">
      <div className="container-x">
        <H4Heading text="_order.Recent_orders" href="/orders" />
      </div>
      <OrderList
        single={true}
        orders={orders}
        ordersError={ordersError}
        ordersLoaded={ordersLoaded}
        ordersLoading={ordersLoading}
        fetchOrders={()=> fetchOrders()}
        refreshList={refreshOrders}
        />
    </div>
  );
}

export default function Dashboard() {

  useHeader({
    topNavPaths: ['/messages']
  });
  
  return (
    <section>
        
      <Statistics />

      <Orders />
      
      <Customers /> 
      
      <Stores /> 

      <DeliveryFirms />
      
    </section>
  );
}
