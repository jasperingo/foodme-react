
import React, { useEffect } from 'react';
import { useCustomerList } from '../../hooks/customer/customerListHook';
import { useAppContext } from '../../hooks/contextHook';
import { useHeader } from '../../hooks/headerHook';
import CustomerList from '../../components/list/CustomerList';

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
    fetchCustomers,
    customers, 
    customersLoading,
    customersLoaded,
    customersError,
    customersPage, 
    customersNumberOfPages,
    refreshCustomers
  ] = useCustomerList(adminToken);

  useEffect(
    function() {
      if (!customersLoaded && customersError === null) 
        fetchCustomers();
    }, 
    [customersLoaded, customersError, fetchCustomers]
  );

  return (
    <section>
      
      <CustomerList
        fetchCustomers={fetchCustomers}
        customers={customers} 
        customersLoading={customersLoading}
        customersLoaded={customersLoaded}
        customersError={customersError}
        customersPage={customersPage} 
        customersNumberOfPages={customersNumberOfPages}
        refreshList={refreshCustomers}
        />

    </section>
  );
}
