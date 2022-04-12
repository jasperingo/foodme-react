
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Forbidden from '../../components/Forbidden';
import UserStatusForm from '../../components/form/UserStatusForm';
import Loading from '../../components/Loading';
import NotFound from '../../components/NotFound';
import Reload from '../../components/Reload';
import NetworkErrorCodes from '../../errors/NetworkErrorCodes';
import { useAppContext } from '../../hooks/contextHook';
import { useCustomerFetch } from '../../hooks/customer/customerFetchHook';
import { useCustomerStatusUpdate } from '../../hooks/customer/customerStatusUpdateHook';
import { useHeader } from '../../hooks/headerHook';

export default function CustomerUpdate() {

  const { ID } = useParams();

  const { 
    admin: { 
      admin: {
        adminToken
      }
    } 
  } = useAppContext();

  const [
    fetchCustomer,
    customer,
    customerLoading,
    customerError,
    customerID,
    unfetchCustomer
  ] = useCustomerFetch(adminToken);

  useHeader({ 
    title: `${customer?.user.name ?? 'Loading...'} - Customer`,
    headerTitle: '_user.Edit_customer'
  });

  const [
    onSubmit, 
    loading, 
    formSuccess, 
    formError
  ] = useCustomerStatusUpdate(adminToken);

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

        { 
          customer !== null &&  
          <UserStatusForm 
            status={customer.user.status} 
            onSubmit={onSubmit}
            dialog={loading}
            formError={formError}
            formSuccess={formSuccess}
            /> 
        }

        { customerLoading && <Loading /> }
        { customerError === NetworkErrorCodes.NOT_FOUND && <NotFound /> }
        { customerError === NetworkErrorCodes.FORBIDDEN && <Forbidden /> }
        { customerError === NetworkErrorCodes.UNKNOWN_ERROR && <Reload action={()=> fetchCustomer(ID)} /> }
        { customerError === NetworkErrorCodes.NO_NETWORK_CONNECTION && <Reload message="_errors.No_netowrk_connection" action={()=> fetchCustomer(ID)} /> }
      
      </div>
    </section>
  );
}
