
import React from 'react';
import { userIcon } from '../../assets/icons';
import CustomerItem from '../../components/list_item/CustomerItem';
import EmptyList from '../../components/EmptyList';
import FetchMoreButton from '../../components/FetchMoreButton';
import Loading from '../../components/Loading';
import Reload from '../../components/Reload';
import ScrollList from '../../components/list/ScrollList';
import { useHasMoreToFetchViaScroll, useRenderListFooter } from '../../hooks/viewHook';
import NotFound from '../../components/NotFound';
import Forbidden from '../../components/Forbidden';
import { useCustomerList } from '../../hooks/customer/customerListHook';
import { useAppContext } from '../../hooks/contextHook';
import { useHeader } from '../../hooks/headerHook';

export default function Customers() {

  useHeader({ 
    title: 'Customers - DailyNeeds',
    headerTitle: "_user.Customers"
  });

  const { 
    admin: { 
      admin: {
        adminToken
      }
    } 
  } = useAppContext();

  const [
    customers, 
    customersFetchStatus, 
    customersPage, 
    customersNumberOfPages, 
    refetch, 
    refresh
  ] = useCustomerList(adminToken);

  return (
    <section>
      
      <div className="container-x">

        <ScrollList
          data={customers}
          nextPage={refetch}
          refreshPage={refresh}
          hasMore={useHasMoreToFetchViaScroll(customersPage, customersNumberOfPages, customersFetchStatus)}
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
            ()=> <li key="customer-footer"> <NotFound /> </li>,
            ()=> <li key="customer-footer"> <Forbidden /> </li>,
          )}
          />

      </div>

    </section>
  );
}
