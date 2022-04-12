
import React, { useEffect } from 'react';
import StoreList from '../../components/list/StoreList';
import { useAppContext } from '../../hooks/contextHook';
import { useHeader } from '../../hooks/headerHook';
import { useStoreList } from '../../hooks/store/storeListHook';

export default function Stores() {

  useHeader({ 
    title: 'Stores - DailyNeeds',
    headerTitle: "_store.Stores"
  });

  const { 
    admin: { 
      admin: {
        adminToken
      }
    } 
  } = useAppContext();

  const [
    fetchStores,
    stores, 
    storesLoading,
    storesLoaded,
    storesError,
    storesPage, 
    storesNumberOfPages,
    refreshStores
  ] = useStoreList(adminToken);

  useEffect(
    function() {
      if (!storesLoaded && storesError === null) 
        fetchStores();
    }, 
    [storesLoaded, storesError, fetchStores]
  );

  return (
    <section>

      <StoreList 
        single={false}
        stores={stores}
        storesError={storesError}
        storesLoaded={storesLoaded}
        storesLoading={storesLoading}
        storesPage={storesPage} 
        storesNumberOfPages={storesNumberOfPages}
        fetchStores={fetchStores}
        refreshList={refreshStores}
        />

    </section>
  );
}
