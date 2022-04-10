
import React, { useEffect } from 'react';
import { useAppContext } from '../../hooks/contextHook';
import { useHeader } from '../../hooks/headerHook';
import SavedCartList from '../../components/list/SavedCartList';
import { useCustomerSavedCartList } from '../../hooks/customer/customerSavedCartListHook';

export default function SavedCarts() {
  
  const {
    customer: {
      customer: {
        customer: {
          customer,
          customerToken
        }
      } 
    } 
  } = useAppContext();

  useHeader({ 
    title: `${customer.user.name} - Saved Carts`,
    headerTitle: "_cart.Saved_carts"
  });

  const [
    fetchCustomerSavedCarts, 
    savedCarts, 
    savedCartsLoading, 
    savedCartsLoaded, 
    savedCartsError,
    savedCartsPage, 
    savedCartsNumberOfPages,  
    refreshCustomerSavedCarts
  ] = useCustomerSavedCartList(customerToken);

  useEffect(
    function() { 
      if (!savedCartsLoaded && savedCartsError === null) 
        fetchCustomerSavedCarts(customer.id); 
    },
    [customer.id, savedCartsError, savedCartsLoaded, fetchCustomerSavedCarts]
  );

  return (
    <section>
      <div className="container-x">
        
        <SavedCartList 
          savedCarts={savedCarts}
          savedCartsError={savedCartsError}
          savedCartsPage={savedCartsPage}
          savedCartsLoaded={savedCartsLoaded}
          savedCartsLoading={savedCartsLoading}
          savedCartsNumberOfPages={savedCartsNumberOfPages}
          fetchSavedCarts={()=> fetchCustomerSavedCarts(customer.id)}
          refreshList={refreshCustomerSavedCarts}
          />

      </div>
    </section>
  );
}
