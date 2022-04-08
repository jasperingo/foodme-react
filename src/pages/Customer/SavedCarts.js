
import React, { useCallback, useEffect } from 'react';
import { useAppContext } from '../../hooks/contextHook';
import { useHeader } from '../../hooks/headerHook';
import SavedCartList from '../../components/list/SavedCartList';
import { useCustomerSavedCartList } from '../../hooks/customer/customerSavedCartListHook';
import NetworkErrorCodes from '../../errors/NetworkErrorCodes';

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
    setCustomerSavedCartsError, 
    refreshCustomerSavedCarts
  ] = useCustomerSavedCartList(customer.id, customerToken);

  const fetch = useCallback(
    function() {
      if (!window.navigator.onLine && savedCartsError === null)
        setCustomerSavedCartsError(NetworkErrorCodes.NO_NETWORK_CONNECTION);
      else if (window.navigator.onLine && !savedCartsLoading) 
        fetchCustomerSavedCarts();
    },
    [savedCartsError, savedCartsLoading, fetchCustomerSavedCarts, setCustomerSavedCartsError]
  );

  useEffect(
    function() { if (!savedCartsLoaded) fetch(); },
    [savedCartsLoaded, fetch]
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
          getNextPage={fetch}
          retryFetch={()=> setCustomerSavedCartsError(null)}
          refreshList={refreshCustomerSavedCarts}
          />

      </div>
    </section>
  );
}

