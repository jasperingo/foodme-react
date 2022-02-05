
import React from 'react';
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
import { useDashboardStoreList } from '../../hooks/dashboard/dashboardStoreListHook';
import { useHeader } from '../../hooks/headerHook';
import { useRenderListFooter } from '../../hooks/viewHook';
import { FETCH_STATUSES } from '../../repositories/Fetch';


// function StatisticsData({ number, text, amount }) {

//   const { t } = useTranslation();

//   const _amount = useMoneyFormat(amount || 0);

//   return (
//     <li className="flex-grow w-1/3 md:w-1/4">
//       <div className="shadow p-3 rounded">
//         { number && <div className="font-bold">{ number }</div> }
//         { amount && <div className="font-bold">{ _amount }</div> }
//         <div className="text-sm">{ t(text) }</div>
//       </div>
//     </li>
//   );
// }

// function Statistics() {
  
//   const {
//     user: { user },
//     dashboard: {
//       statistics: {
//         statistics,
//         statisticsFetchStatus
//       }
//     },
//     dashboardDispatch
//   } = useAppContext();

//   useEffect(()=> {
//     if (statisticsFetchStatus === FETCH_STATUSES.LOADING) {
//       const api = new AdminApi(user.api_token);
//       api.getStatistics(dashboardDispatch);
//     }
//   });

//   function refetchStatistics() {
//     if (statisticsFetchStatus !== FETCH_STATUSES.LOADING) 
//       dashboardDispatch(getStatisticsFetchStatusAction(FETCH_STATUSES.LOADING));
//   }


//   return(
//     <div className="my-4">
//       <H3 text="_extra.Statistics" />
//       <ul className="flex gap-2 flex-wrap mb-8 md:gap-4">
//         { 
//           useDataRender(
//             statistics, 
//             statisticsFetchStatus,
//             ()=> (
//               <>
//                 <StatisticsData number={statistics.customers_number} text="_user.Customers" />
//                 <StatisticsData number={statistics.stores_number} text="_store.Stores" />
//                 <StatisticsData number={statistics.delivery_firms_number} text="_delivery.Delivery_firms" />
//                 <StatisticsData number={statistics.categories_number} text="_category.Categories" />
//                 <StatisticsData number={statistics.orders_number} text="_order.Orders" />
//                 <StatisticsData amount={statistics.earnings_total} text="_transaction.Earnings" />
//               </>
//             ),
//             ()=> <li> <Loading /> </li>, 
//             ()=> <li> <Reload action={refetchStatistics} /> </li>,
//           )
//         }
//       </ul>
//     </div>
//   );
// }


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
          ()=> <li key="delivery-firm-footer"> <Loading /> </li>, 
          ()=> <li key="delivery-firm-footer"> <Reload action={refetch} /> </li>,
          ()=> <li key="delivery-firm-footer"> <EmptyList text="_empty.No_delivery_firm" icon={deliveryIcon} /> </li>,
          ()=> <li key="delivery-firm-footer"> <FetchMoreButton action={refetch} /> </li>
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
          ()=> <li key="store-footer"> <Loading /> </li>, 
          ()=> <li key="store-footer"> <Reload action={refetch} /> </li>,
          ()=> <li key="store-footer"> <EmptyList text="_empty.No_store" icon={storeIcon} /> </li>,
          ()=> <li key="store-footer"> <FetchMoreButton action={refetch} /> </li>
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
        className="list-x"
        renderDataItem={(item)=> (
          <CustomerItem key={`customer-${item.id}`} customer={item} />
        )}
        footer={useRenderListFooter(
          customersFetchStatus,
          ()=> <li key="customer-footer"> <Loading /> </li>, 
          ()=> <li key="customer-footer"> <Reload action={refetch} /> </li>,
          ()=> <li key="customer-footer"> <EmptyList text="_empty.No_customer" icon={userIcon} /> </li>,
          ()=> <li key="customer-footer"> <FetchMoreButton action={refetch} /> </li>,
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
          ()=> <li key="order-footer"> <Loading /> </li>, 
          ()=> <li key="order-footer"> <Reload action={refetch} /> </li>,
          ()=> <li key="order-footer" className="col-span-2"> <EmptyList text="_empty.No_order" icon={orderIcon} /> </li>,
          ()=> <li key="order-footer"> <FetchMoreButton action={refetch} /> </li>
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
        storesFetchStatus,
        customersFetchStatus,
        ordersFetchStatus
      }
    }
  } = useAppContext();
  
  return (
    <section>
      <div className="container-x">
        
        {/* <Statistics /> */}

        <Orders />

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


