
import React, { useCallback, useEffect } from 'react';
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
  ] = useCustomerSavedCartList(customer.id, customerToken);

  const savedCartsFetch = useCallback(
    function() {
      if (!savedCartsLoading) 
        fetchCustomerSavedCarts();
    },
    [savedCartsLoading, fetchCustomerSavedCarts]
  );

  useEffect(
    function() { if (!savedCartsLoaded) savedCartsFetch(); },
    [savedCartsLoaded, savedCartsFetch]
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
          fetchSavedCarts={savedCartsFetch}
          refreshList={refreshCustomerSavedCarts}
          />

      </div>
    </section>
  );
}
