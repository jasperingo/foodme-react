
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Forbidden from '../components/Forbidden';
import Loading from '../components/Loading';
import NotFound from '../components/NotFound';
import CustomerProfile from '../components/profile/CustomerProfile';
import Reload from '../components/Reload';
import NetworkErrorCodes from '../errors/NetworkErrorCodes';
import { useCustomerFetch } from '../hooks/customer/customerFetchHook';
import { useHeader } from '../hooks/headerHook';

export default function Customer({ userToken }) {

  const { ID } = useParams();

  const [
    fetchCustomer,
    customer,
    customerLoading,
    customerError,
    customerID,
    unfetchCustomer
  ] = useCustomerFetch(userToken);

  useHeader({ 
    title: `${customer?.user.name ?? 'Loading...'} - Customer`,
    headerTitle: '_user.Customer'
  });

  useEffect(
    function() {
      if ((customer !== null || customerError !== null) && customerID !== ID) 
        unfetchCustomer();
      else if (customer === null && customerError === null)
        fetchCustomer(ID);
    },
    [ID, customer, customerError, customerID, fetchCustomer, unfetchCustomer]
  );
  
  return (
    <section>

      <div className="container-x">
        { customer !== null && <CustomerProfile customer={customer} navLinks={[]} /> }
        { customerLoading && <Loading /> }
        { customerError === NetworkErrorCodes.NOT_FOUND && <NotFound /> }
        { customerError === NetworkErrorCodes.FORBIDDEN && <Forbidden /> }
        { customerError === NetworkErrorCodes.UNKNOWN_ERROR && <Reload action={()=> fetchCustomer(ID)} /> }
        { customerError === NetworkErrorCodes.NO_NETWORK_CONNECTION && <Reload message="_errors.No_netowrk_connection" action={()=> fetchCustomer(ID)} /> }
      </div>
        
    </section>
  );
}
