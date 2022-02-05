
import React from 'react';
import Forbidden from '../../components/Forbidden';
import UserStatusForm from '../../components/form/UserStatusForm';
import Loading from '../../components/Loading';
import NotFound from '../../components/NotFound';
import Reload from '../../components/Reload';
import { useAppContext } from '../../hooks/contextHook';
import { useHeader } from '../../hooks/headerHook';
import { useStoreFetch } from '../../hooks/store/storeFetchHook';
import { useStoreStatusUpdate } from '../../hooks/store/storeStatusUpdateHook';
import { useRenderOnDataFetched } from '../../hooks/viewHook';

export default function StoreUpdate() {

  const {
    admin: { 
      admin: {
        adminToken
      }
    } 
  } = useAppContext();

  const [
    store, 
    storeFetchStatus, 
    refetch
  ] = useStoreFetch(adminToken);

  useHeader({ 
    title: `${store?.user.name ?? 'Loading...'} - Store`,
    headerTitle: '_store.Edit_store'
  });

  const [
    onSubmit,
    dialog, 
    formError, 
    formSuccess, 
    statusError
  ] = useStoreStatusUpdate(store?.id, adminToken);

  return (
    <section>
      <div className="container-x">
        {
          useRenderOnDataFetched(
            storeFetchStatus,
            ()=> (
              <UserStatusForm 
                status={store.user.status} 
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
