
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import StoreApi from '../../api/StoreApi';
import AdminApp from '../../apps/AdminApp';
import Loading from '../../components/Loading';
import Reload from '../../components/Reload';
import StoreForm from '../../components/StoreForm';
import { FETCH_STATUSES, getStoreFetchStatusAction, STORE } from '../../context/AppActions';
import { useAppContext } from '../../context/AppContext';
import { useDataRender } from '../../context/AppHooks';

export default function StoreUpdate() {

  const ID = parseInt(useParams().ID);

  const { 
    stores: {
      store: {
        store,
        storeFetchStatus
      }
    }, 
    storesDispatch 
  } = useAppContext();

  useEffect(()=> {
    if (store !== null && ID !== store.id) {
      storesDispatch({ type: STORE.UNFETCH });
    } else if (storeFetchStatus === FETCH_STATUSES.LOADING) {
      const api = new StoreApi();
      api.get(ID, storesDispatch);
    }
  }, [ID, store, storeFetchStatus, storesDispatch]);

  function refetchStore() {
    if (storeFetchStatus !== FETCH_STATUSES.LOADING) 
      storesDispatch(getStoreFetchStatusAction(FETCH_STATUSES.LOADING));
  }

  return (
    <section>
      <div className="container-x">
        { 
          useDataRender(
            store, 
            storeFetchStatus,
            ()=> <StoreForm type={StoreForm.UPDATE} store={store} appType={AdminApp.TYPE} />,
            ()=> <Loading />, 
            ()=> <Reload action={refetchStore} />,
          )
        }
      </div>
    </section>
  );
}
