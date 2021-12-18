
import Icon from '@mdi/react';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link, Route, Switch, useParams, useRouteMatch } from 'react-router-dom';
import OrderApi from '../../api/OrderApi';
import UserApi from '../../api/UserApi';
import AdminApp from '../../apps/AdminApp';
import { editIcon, orderIcon } from '../../assets/icons';
import EmptyList from '../../components/EmptyList';
import FetchMoreButton from '../../components/FetchMoreButton';
import Loading from '../../components/Loading';
import OrderItem from '../../components/OrderItem';
import Reload from '../../components/Reload';
import Tab from '../../components/Tab';
import { CUSTOMER, FETCH_STATUSES, getCustomerFetchStatusAction, getOrdersListFetchStatusAction } from '../../context/AppActions';
import { useAppContext } from '../../context/AppContext';
import { useDataRender, useHasMoreToFetchViaScroll, useListRender } from '../../context/AppHooks';

const TAB_LINKS = [
  { title : '_order.Orders', href: '' },
  { title : '_user.Addresses', href: '/addresses' },
];

function Addresses() {
  
  
  return (
    <div>
      Addresses...
    </div>
  );
}

function Orders() {

  const { 
    user: { user }, 
    customers: {
      customer: {
        customer
      },
      orders: {
        orders,
        ordersFetchStatus,
        ordersPage,
        ordersNumberOfPages
      }
    }, 
    customersDispatch 
  } = useAppContext();

  useEffect(()=>{
    if (ordersFetchStatus === FETCH_STATUSES.LOADING) {
      const api = new OrderApi(user.api_token);
      api.getListByCustomer(customer.id, customersDispatch);
    }
  }, [user, customer, ordersFetchStatus, customersDispatch]);

  function refetchOrders() {
    if (ordersFetchStatus !== FETCH_STATUSES.LOADING) 
      customersDispatch(getOrdersListFetchStatusAction(FETCH_STATUSES.LOADING));
  }

  return (
    <div>
      <InfiniteScroll
        dataLength={orders.length}
        next={refetchOrders}
        hasMore={useHasMoreToFetchViaScroll(ordersPage, ordersNumberOfPages, ordersFetchStatus)}
        >
        <ul className="list-2-x">
          { 
            useListRender(
              orders, 
              ordersFetchStatus,
              (item, i)=> <OrderItem key={`order-${i}`} order={item} href={`/order/${item.id}`} appType={AdminApp.TYPE} />, 
              (k)=> <li key={k}> <Loading /> </li>, 
              (k)=> <li key={k}> <Reload action={refetchOrders} /> </li>,
              (k)=> <li key={k}> <EmptyList text="_empty.No_order" icon={orderIcon} /> </li>, 
              (k)=> <li key={k}> <FetchMoreButton action={refetchOrders} /> </li>,
            )
          }
        </ul>
      </InfiniteScroll>
    </div>
  );
}

function CustomerData({ title, body }) {
  const { t } = useTranslation();
  return (
    <div className="mb-4 flex gap-2 md:border md:rounded md:px-2 md:mb-2">
      <dt className="text-color-primary">{ t(title) }</dt>
      <dd className="font-bold">{ body }</dd>
    </div>
  );
}

export default function Customer() {

  const { t } = useTranslation();

  const match = useRouteMatch();

  const cID = parseInt(useParams().ID);

  const { 
    user: { user }, 
    customers: {
      customer: {
        customer,
        customerFetchStatus
      }
    }, 
    customersDispatch 
  } = useAppContext();

  useEffect(()=> {
    if (customer !== null && cID !== customer.id) {
      customersDispatch({ type: CUSTOMER.UNFETCH });
    } else if (customerFetchStatus === FETCH_STATUSES.LOADING) {
      const api = new UserApi(user.api_token);
      api.get(cID, customersDispatch);
    }
  }, [cID, user, customer, customerFetchStatus, customersDispatch]);

  function refetchCustomer() {
    if (customerFetchStatus !== FETCH_STATUSES.LOADING) 
      customersDispatch(getCustomerFetchStatusAction(FETCH_STATUSES.LOADING));
  }

  return (
    <section>
      <div className="container-x">
        { 
          useDataRender(
            customer, 
            customerFetchStatus,
            ()=> (
              <>
                <div className="pt-4 flex items-center gap-2 justify-between">
                  <img src={`/photos/customer/${customer.photo}`} alt="user" width="50" height="50" className="w-20 h-20 rounded-full" />
                  <Link to={`/customer/${customer.id}/update`} className="flex gap-1 justify-center btn-color-primary px-2 py-1 rounded">
                    <Icon path={editIcon} className="w-5 h-5" />
                    <span>{ t('_extra.Edit') }</span>
                  </Link>
                </div>
                <dl className="pt-4 md:flex gap-2">
                  <CustomerData title="_user.First_name" body={customer.first_name} />
                  <CustomerData title="_user.Last_name" body={customer.last_name} />
                  <CustomerData title="_user.Email" body={customer.email} />
                  <CustomerData title="_user.Phone_number" body={customer.phone_number} />
                  <CustomerData title="_user.Registration_date" body={customer.created_at} />
                </dl>
                <Tab items={TAB_LINKS} />
                <Switch>
                  <Route path={`${match.url}/addresses`} render={()=> <Addresses />} />
                  <Route path={match.url} render={()=> <Orders />} />
                </Switch>
              </>
            ),
            (k)=> <div className="container-x"> <Loading /> </div>, 
            (k)=> <div className="container-x"> <Reload action={refetchCustomer} /> </div>,
          )
        }
      </div>
    </section>
  );
}
