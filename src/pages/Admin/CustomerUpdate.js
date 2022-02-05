
import React from 'react';
import Forbidden from '../../components/Forbidden';
import UserStatusForm from '../../components/form/UserStatusForm';
import Loading from '../../components/Loading';
import NotFound from '../../components/NotFound';
import Reload from '../../components/Reload';
import { useAppContext } from '../../hooks/contextHook';
import { useCustomerFetch } from '../../hooks/customer/customerFetchHook';
import { useCustomerStatusUpdate } from '../../hooks/customer/customerStatusUpdateHook';
import { useHeader } from '../../hooks/headerHook';
import { useRenderOnDataFetched } from '../../hooks/viewHook';

export default function CustomerUpdate() {

  const { 
    admin: { 
      admin: {
        adminToken
      }
    } 
  } = useAppContext();

  const [
    customer, 
    customerFetchStatus, 
    refetch
  ] = useCustomerFetch(adminToken);

  useHeader({ 
    title: `${customer?.user.name ?? 'Loading...'} - Customer`,
    headerTitle: '_user.Edit_customer'
  });

  const [
    onSubmit,
    dialog, 
    formError, 
    formSuccess, 
    statusError
  ] = useCustomerStatusUpdate(customer.id, adminToken);
  
  return (
    <section>
      <div className="container-x">
        {
          useRenderOnDataFetched(
            customerFetchStatus,
            ()=> (
              <UserStatusForm 
                status={customer.user.status} 
                onSubmit={onSubmit}
                dialog={dialog}
                formError={formError}
                formSuccess={formSuccess}
                statusError={statusError}
                />
            ),
            ()=> <Loading />,
            ()=> <Reload action={refetch} />,
            ()=> <NotFound />,
            ()=> <Forbidden />,
          )
        }
      </div>
    </section>
  );
}
