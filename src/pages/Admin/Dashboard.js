
import React from 'react';
import { useTranslation } from 'react-i18next';
import { deliveryIcon, orderIcon, storeIcon, userIcon } from '../../assets/icons';
import EmptyList from '../../components/EmptyList';
import FetchMoreButton from '../../components/FetchMoreButton';
import H4Heading from '../../components/H4Heading';
import SingleList from '../../components/list/SingleList';
import CustomerItem from '../../components/list_item/CustomerItem';
import DeliveryFirmItem from '../../components/list_item/DeliveryFirmItem';
import OrderItem from '../../components/list_item/OrderItem';
import StoreItem from '../../components/list_item/StoreItem';
import Loading from '../../components/Loading';
import Reload from '../../components/Reload';
import { useAppContext } from '../../hooks/contextHook';
import { useDashboardCustomerList } from '../../hooks/dashboard/dashboardCustomerListHook';
import { useDashboardDeliveryFirmList } from '../../hooks/dashboard/dashboardDeliveryFirmListHook';
import { useDashboardOrderList } from '../../hooks/dashboard/dashboardOrderListHook';
import { useDashboardStatistics } from '../../hooks/dashboard/dashboardStatisticsHook';
import { useDashboardStoreList } from '../../hooks/dashboard/dashboardStoreListHook';
import { useHeader } from '../../hooks/headerHook';
import { useMoneyFormat, useRenderListFooter, useRenderOnDataFetched } from '../../hooks/viewHook';
import { FETCH_STATUSES } from '../../repositories/Fetch';

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

function Statistics() {
  
  const [
    statistics, 
    statisticsFetchStatus, 
    refetch
  ] = useDashboardStatistics();

  return(
    <div className="my-4">
      <H4Heading text="_extra.Statistics" />
      <ul className="flex gap-2 flex-wrap mb-8 md:gap-4">
        { 
          useRenderOnDataFetched(
            statisticsFetchStatus,
            ()=> (
              <>
                <StatisticsData number={statistics.number_of_customers} text="_user.Customers" />
                <StatisticsData number={statistics.number_of_stores} text="_store.Stores" />
                <StatisticsData number={statistics.number_of_delivery_firms} text="_delivery.Delivery_firms" />
                <StatisticsData number={statistics.number_of_categories} text="_category.Categories" />
                <StatisticsData number={statistics.number_of_products} text="_product.Products" />
                <StatisticsData number={statistics.number_of_orders} text="_order.Orders" />
                <StatisticsData amount={statistics.total_earnings} text="_transaction.Earnings" />
              </>
            ),
            ()=> <li className="flex-grow"> <Loading /> </li>, 
            ()=> <li className="flex-grow"> <Reload action={refetch} /> </li>,
          )
        }
      </ul>
    </div>
  );
}

function DeliveryFirms() {

  const [
    deliveryFirms, 
    deliveryFirmsFetchStatus, 
    refetch
  ] = useDashboardDeliveryFirmList();

  return(
    <div className="my-4">
      <H4Heading text="_delivery.Recent_delivery_firms" href="/delivery-firms" />
      <SingleList
        data={deliveryFirms}
        className="list-x"
        renderDataItem={(item)=> (
          <DeliveryFirmItem key={`delivery-firm-${item.id}`} deliveryFirm={item} />
        )}
        footer={useRenderListFooter(
          deliveryFirmsFetchStatus,
          ()=> <li key="delivery-firm-footer" className="list-x-col-span"> <Loading /> </li>, 
          ()=> <li key="delivery-firm-footer" className="list-x-col-span"> <Reload action={refetch} /> </li>,
          ()=> <li key="delivery-firm-footer" className="list-x-col-span"> <EmptyList text="_empty.No_delivery_firm" icon={deliveryIcon} /> </li>,
          ()=> <li key="delivery-firm-footer" className="list-x-col-span"> <FetchMoreButton action={refetch} /> </li>
        )}
        />
    </div>
  );
}

function Stores() {

  const [
    stores, 
    storesFetchStatus,
    refetch
  ] = useDashboardStoreList();
  
  return(
    <div className="my-4">
      <H4Heading text="_store.Recent_stores" href="/stores" />
      <SingleList
        data={stores}
        className="list-x"
        renderDataItem={(item)=> (
          <StoreItem key={`store-${item.id}`} store={item} />
        )}
        footer={useRenderListFooter(
          storesFetchStatus,
          ()=> <li key="store-footer" className="list-x-col-span"> <Loading /> </li>, 
          ()=> <li key="store-footer" className="list-x-col-span"> <Reload action={refetch} /> </li>,
          ()=> <li key="store-footer" className="list-x-col-span"> <EmptyList text="_empty.No_store" icon={storeIcon} /> </li>,
          ()=> <li key="store-footer" className="list-x-col-span"> <FetchMoreButton action={refetch} /> </li>
        )}
        />
    </div>
  );
}

function Customers() {

  const [
    customers, 
    customersFetchStatus, 
    refetch,
  ] = useDashboardCustomerList();
  
  return(
    <div className="my-4">
      <H4Heading text="_user.Recent_customers" href="/customers" />
      <SingleList
        data={customers}
        className="list-3-x"
        renderDataItem={(item)=> (
          <CustomerItem key={`customer-${item.id}`} customer={item} />
        )}
        footer={useRenderListFooter(
          customersFetchStatus,
          ()=> <li key="customer-footer" className="list-3-x-col-span"> <Loading /> </li>, 
          ()=> <li key="customer-footer" className="list-3-x-col-span"> <Reload action={refetch} /> </li>,
          ()=> <li key="customer-footer" className="list-3-x-col-span"> <EmptyList text="_empty.No_customer" icon={userIcon} /> </li>,
          ()=> <li key="customer-footer" className="list-3-x-col-span"> <FetchMoreButton action={refetch} /> </li>,
        )}
        />
    </div>
  );
}

function Orders() {

  const [
    orders, 
    ordersFetchStatus, 
    refetch
  ] = useDashboardOrderList();
  
  return (
    <div className="my-4">
      <H4Heading text="_order.Recent_orders" href="/orders" />
      <SingleList
        data={orders}
        nextPage={refetch}
        className="list-2-x"
        renderDataItem={(item)=> (
          <OrderItem key={`order-${item.id}`} order={item} />
        )}
        footer={useRenderListFooter(
          ordersFetchStatus,
          ()=> <li key="order-footer" className="list-2-x-col-span"> <Loading /> </li>, 
          ()=> <li key="order-footer" className="list-2-x-col-span"> <Reload action={refetch} /> </li>,
          ()=> <li key="order-footer" className="list-2-x-col-span"> <EmptyList text="_empty.No_order" icon={orderIcon} /> </li>,
          ()=> <li key="order-footer" className="list-2-x-col-span"> <FetchMoreButton action={refetch} /> </li>
        )}
        />
    </div>
  );
}

export default function Dashboard() {

  useHeader({
    topNavPaths: ['/messages']
  });

  const {
    dashboard: {
      dashboard: {
        statisticsFetchStatus,
        storesFetchStatus,
        customersFetchStatus,
        ordersFetchStatus
      }
    }
  } = useAppContext();
  
  return (
    <section>
      <div className="container-x">
        
        <Statistics />

        { 
          (statisticsFetchStatus  === FETCH_STATUSES.DONE || 
            statisticsFetchStatus === FETCH_STATUSES.EMPTY) 
          &&
          <Orders />
        }

        { 
          (ordersFetchStatus === FETCH_STATUSES.DONE || 
          ordersFetchStatus === FETCH_STATUSES.EMPTY)          
          && 
          <Customers /> 
        }

        { 
          ((ordersFetchStatus === FETCH_STATUSES.DONE || 
            ordersFetchStatus === FETCH_STATUSES.EMPTY) 
          && 
          (customersFetchStatus === FETCH_STATUSES.DONE || 
            customersFetchStatus === FETCH_STATUSES.EMPTY))
          && 
          <Stores /> 
        }


        { 
          ((ordersFetchStatus === FETCH_STATUSES.DONE || 
            ordersFetchStatus === FETCH_STATUSES.EMPTY) 
          && 
          (customersFetchStatus === FETCH_STATUSES.DONE || 
            customersFetchStatus === FETCH_STATUSES.EMPTY) 
          &&
          (storesFetchStatus === FETCH_STATUSES.DONE || 
            storesFetchStatus === FETCH_STATUSES.EMPTY) )
          && 
          <DeliveryFirms /> 
        }

      </div>
    </section>
  );
}
