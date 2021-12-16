
import React, { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import UserApi from '../../api/UserApi';
import { userIcon } from '../../assets/icons';
import AddButton from '../../components/AddButton';
import CustomerItem from '../../components/CustomerItem';
import EmptyList from '../../components/EmptyList';
import FetchMoreButton from '../../components/FetchMoreButton';
import Loading from '../../components/Loading';
import Reload from '../../components/Reload';
import { FETCH_STATUSES, getCustomersListFetchStatusAction } from '../../context/AppActions';
import { useAppContext } from '../../context/AppContext';
import { useHasMoreToFetchViaScroll, useListRender } from '../../context/AppHooks';

export default function Customers() {

  const { user: { user }, customers: {
    customers: {
      customers,
      customersPage,
      customersNumberOfPages,
      customersFetchStatus
    }
  }, customersDispatch } = useAppContext();

  useEffect(()=> {
    if (customersFetchStatus === FETCH_STATUSES.LOADING) {
      const api = new UserApi(user.api_token);
      api.getList(customersDispatch);
    }
  }, [user, customersFetchStatus, customersDispatch]);

  function refetchCustomers() {
    if (customersFetchStatus !== FETCH_STATUSES.LOADING) 
      customersDispatch(getCustomersListFetchStatusAction(FETCH_STATUSES.LOADING));
  }

  return (
    <section>
      
      <div className="container-x">

        <AddButton text="_user.Add_customer" href="/customer/add" />

        <InfiniteScroll 
          dataLength={customers.length}
          next={refetchCustomers}
          hasMore={useHasMoreToFetchViaScroll(customersPage, customersNumberOfPages, customersFetchStatus)}
          >
          <ul className="list-2-x">
            { 
              useListRender(
                customers, 
                customersFetchStatus,
                (item, i)=> <CustomerItem key={`customer-${i}`} customer={item} />, 
                (k)=> <li key={k}> <Loading /> </li>, 
                (k)=> <li key={k}> <Reload action={refetchCustomers} /> </li>,
                (k)=> <li key={k}> <EmptyList text="_empty.No_review" icon={userIcon} /> </li>, 
                (k)=> <li key={k}> <FetchMoreButton action={refetchCustomers} /> </li>,
              )
            }
          </ul>
        </InfiniteScroll>

      </div>

    </section>
  );
}
