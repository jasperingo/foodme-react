
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import UserApi from '../../api/UserApi';
import Loading from '../../components/Loading';
import Reload from '../../components/Reload';
import { CUSTOMER, FETCH_STATUSES, getCustomerFetchStatusAction } from '../../context/AppActions';
import { useAppContext } from '../../context/AppContext';
import { useDataRender } from '../../context/AppHooks';

function CustomerData({ title, body }) {
  const { t } = useTranslation();
  return (
    <div className="mb-4">
      <dt className="text-color-primary">{ t(title) }</dt>
      <dd className="font-bold">{ body }</dd>
    </div>
  );
}

export default function Customer() {

  const { t } = useTranslation();

  const cID = parseInt(useParams().ID);

  const { user: { user }, customers: {
    customer: {
      customer,
      customerFetchStatus
    }
  }, customersDispatch } = useAppContext();

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
                <div className="pt-4 flex items-center gap-2 justify-between md:max-w-md md:mx-auto">
                  <img src="/photos/user.jpg" alt="user" width="50" height="50" className="w-20 h-20 rounded-full" />
                  <Link to={`/customer/${3}/update`} className="w-20 text-center btn-color-primary px-2 py-1 rounded-full">{ t('_extra.Edit') }</Link>
                </div>
                <dl className="py-4 md:max-w-md md:mx-auto">
                  <CustomerData title="_user.First_name" body={'Alfred'} />
                  <CustomerData title="_user.Last_name" body={'Bread'} />
                  <CustomerData title="_user.Email" body={'alfred@gmail.com'} />
                  <CustomerData title="_user.Phone_number" body={'09038484949'} />
                </dl>
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
