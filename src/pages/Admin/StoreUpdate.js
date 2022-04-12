
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Forbidden from '../../components/Forbidden';
import RecommendForm from '../../components/form/RecommendForm';
import UserStatusForm from '../../components/form/UserStatusForm';
import Loading from '../../components/Loading';
import NotFound from '../../components/NotFound';
import Reload from '../../components/Reload';
import NetworkErrorCodes from '../../errors/NetworkErrorCodes';
import { useAppContext } from '../../hooks/contextHook';
import { useHeader } from '../../hooks/headerHook';
import { useStoreFetch } from '../../hooks/store/storeFetchHook';
import { useStoreRecommendedUpdate } from '../../hooks/store/storeRecommendedUpdateHook';
import { useStoreStatusUpdate } from '../../hooks/store/storeStatusUpdateHook';

export default function StoreUpdate() {

  const { ID } = useParams();

  const {
    admin: { 
      admin: {
        adminToken
      }
    } 
  } = useAppContext();

  const [
    fetchStore,
    store,
    storeLoading,
    storeError,
    storeID,
    unfetchStore
  ] = useStoreFetch(adminToken);

  useHeader({ 
    title: `${store?.user.name ?? 'Loading...'} - Store`,
    headerTitle: '_store.Edit_store'
  });

  const [
    onSubmit,
    dialog, 
    formSuccess,
    formError
  ] = useStoreStatusUpdate(adminToken);

  const [
    recommendedOnSubmit,
    recommendedLoading, 
    recommendedFormSuccess,
    recommendedFormError
  ] = useStoreRecommendedUpdate(adminToken);

  useEffect(
    function() {
      if ((store !== null || storeError !== null) && storeID !== ID) 
        unfetchStore();
      else if (store === null && storeError === null)
        fetchStore(ID);
    },
    [ID, store, storeError, storeID, fetchStore, unfetchStore]
  );

  return (
    <section>
      <div className="container-x">
        {
          store !== null && 
          <>
            <UserStatusForm 
              status={store.user.status} 
              onSubmit={onSubmit}
              dialog={dialog}
              formError={formError}
              formSuccess={formSuccess}
              />
            
            <RecommendForm 
              recommended={store.recommended}
              onSubmit={recommendedOnSubmit}
              dialog={recommendedLoading}
              formError={recommendedFormError}
              formSuccess={recommendedFormSuccess}
              />
          </>
        }
        
        { storeLoading && <Loading /> }
        { storeError === NetworkErrorCodes.NOT_FOUND && <NotFound /> }
        { storeError === NetworkErrorCodes.FORBIDDEN && <Forbidden /> }
        { storeError === NetworkErrorCodes.UNKNOWN_ERROR && <Reload action={()=> fetchStore(ID)} /> }
        { storeError === NetworkErrorCodes.NO_NETWORK_CONNECTION && <Reload message="_errors.No_netowrk_connection" action={()=> fetchStore(ID)} /> }
        
      </div>
    </section>
  );
}
