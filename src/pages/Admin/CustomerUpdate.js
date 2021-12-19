
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserApi from '../../api/UserApi';
import AdminApp from '../../apps/AdminApp';
import CustomerForm from '../../components/CustomerForm';
import Loading from '../../components/Loading';
import Reload from '../../components/Reload';
import { CUSTOMER, FETCH_STATUSES, getCustomerFetchStatusAction } from '../../context/AppActions';
import { useAppContext } from '../../context/AppContext';
import { useDataRender } from '../../context/AppHooks';

export default function CustomerUpdate() {

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
            ()=> <CustomerForm type={CustomerForm.UPDATE} customer={customer} appType={AdminApp.TYPE} />,
            ()=> <Loading />, 
            ()=> <Reload action={refetchCustomer} />,
          )
        }
      </div>
    </section>
  );
}
