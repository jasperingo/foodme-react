
import React, { useEffect } from 'react';
import SavedCartList from '../../components/list/SavedCartList';
import { useAppContext } from '../../hooks/contextHook';
import { useHeader } from '../../hooks/headerHook';
import { useStoreSavedCartList } from '../../hooks/store/storeSavedCartListHook';

export default function SavedCarts() {

  const {
    store: {
      store: {
        store,
        storeToken
      } 
    } 
  } = useAppContext();

  useHeader({ 
    title: `${store.user.name} - Saved Carts`,
    headerTitle: "_cart.Saved_carts"
  });

  const [
    fetchStoreSavedCarts, 
    savedCarts, 
    savedCartsLoading, 
    savedCartsLoaded, 
    savedCartsError,
    savedCartsPage, 
    savedCartsNumberOfPages,  
    refreshCustomerSavedCarts
  ] = useStoreSavedCartList(storeToken);

  useEffect(
    function() { 
      if (!savedCartsLoaded && savedCartsError === null) 
        fetchStoreSavedCarts(store.id); 
    },
    [store.id, savedCartsError, savedCartsLoaded, fetchStoreSavedCarts]
  );

  return (
    <section>
      
      <SavedCartList 
        savedCarts={savedCarts}
        savedCartsError={savedCartsError}
        savedCartsPage={savedCartsPage}
        savedCartsLoaded={savedCartsLoaded}
        savedCartsLoading={savedCartsLoading}
        savedCartsNumberOfPages={savedCartsNumberOfPages}
        fetchSavedCarts={()=> fetchStoreSavedCarts(store.id)}
        refreshList={refreshCustomerSavedCarts}
        />

    </section>
  );
}
