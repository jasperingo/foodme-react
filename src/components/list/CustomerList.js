
import React from 'react';
import { userIcon } from '../../assets/icons';
import NetworkErrorCodes from '../../errors/NetworkErrorCodes';
import { useListFooter, useLoadOnListScroll } from '../../hooks/viewHook';
import EmptyList from '../EmptyList';
import FetchMoreButton from '../FetchMoreButton';
import CustomerItem from '../list_item/CustomerItem';
import Loading from '../Loading';
import Reload from '../Reload';
import ScrollList from './ScrollList';

export default function CustomerList(
  { single, customers, customersLoading, customersLoaded, customersError, customersPage, customersNumberOfPages, fetchCustomers, refreshList }
) {

  const listFooter = useListFooter();

  const loadOnScroll = useLoadOnListScroll();

  return (
    <div className="container-x">

      <ScrollList
        data={customers}
        nextPage={fetchCustomers}
        refreshPage={refreshList}
        hasMore={!single && loadOnScroll(customersPage, customersNumberOfPages, customersError)}
        className="list-3-x"
        renderDataItem={(item)=> (
          <CustomerItem key={`customer-${item.id}`} customer={item} />
        )}
        footer={listFooter([
          
          { 
            canRender: customersLoading,
            render() { 
              return <li key="customer-footer" className="list-3-x-col-span"> <Loading /> </li>; 
            } 
          },

          { 
            canRender: customersError === NetworkErrorCodes.UNKNOWN_ERROR,
            render() { 
              return <li key="customer-footer" className="list-3-x-col-span"> <Reload action={fetchCustomers} /> </li>;
            }
          },

          { 
            canRender: customersLoaded && customers.length === 0,
            render() { 
              return <li key="customer-footer" className="list-3-x-col-span"> <EmptyList text="_empty.No_order" icon={userIcon} /> </li>;
            }
          },

          { 
            canRender: !single && customersPage <= customersNumberOfPages,
            render() { 
              return <li key="customer-footer" className="list-3-x-col-span"> <FetchMoreButton action={fetchCustomers} /> </li>; 
            }
          },

          {
            canRender: customersError === NetworkErrorCodes.NO_NETWORK_CONNECTION,
            render() {
              return (
                <li key="customer-footer" className="list-3-x-col-span">
                  <Reload message="_errors.No_netowrk_connection" action={fetchCustomers} />
                </li>
              );
            }
          },
        ])}
        />

    </div>
  )
}

