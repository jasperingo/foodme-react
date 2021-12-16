
import React, { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import StoreApi from '../../api/StoreApi';
import { storeIcon } from '../../assets/icons';
import AddButton from '../../components/AddButton';
import EmptyList from '../../components/EmptyList';
import FetchMoreButton from '../../components/FetchMoreButton';
import Loading from '../../components/Loading';
import Reload from '../../components/Reload';
import StoreItem from '../../components/StoreItem';
import { FETCH_STATUSES, getStoresListFetchStatusAction } from '../../context/AppActions';
import { useAppContext } from '../../context/AppContext';
import { useHasMoreToFetchViaScroll, useListRender } from '../../context/AppHooks';

export default function Stores() {

  const {
    user: { user },
    stores: {
      stores: {
        stores,
        storesPage,
        storesNumberOfPages,
        storesFetchStatus
      }
    },
    storesDispatch
  } = useAppContext();

  useEffect(()=> {
    if (storesFetchStatus === FETCH_STATUSES.LOADING) {
      const api = new StoreApi(user.api_token);
      api.getList(storesDispatch);
    }
  }, [user, storesFetchStatus, storesDispatch]);

  function refetchStores() {
    if (storesFetchStatus !== FETCH_STATUSES.LOADING) 
      storesDispatch(getStoresListFetchStatusAction(FETCH_STATUSES.LOADING));
  }

  return (
    <section>
      
      <div className="container-x">

        <AddButton text="_store.Add_store" href="/store/add" />

        <InfiniteScroll
          dataLength={stores.length}
          next={refetchStores}
          hasMore={useHasMoreToFetchViaScroll(storesPage, storesNumberOfPages, storesFetchStatus)}
          >
          <ul className="list-x">
            { 
              useListRender(
                stores, 
                storesFetchStatus,
                (item, i)=> <li key={`store-${i}`}> <StoreItem store={item} /> </li>, 
                (k)=> <li key={k}> <Loading /> </li>, 
                (k)=> <li key={k}> <Reload action={refetchStores} /> </li>,
                (k)=> <li key={k}> <EmptyList text="_empty.No_store" icon={storeIcon} /> </li>, 
                (k)=> <li key={k}> <FetchMoreButton action={refetchStores} /> </li>,
              )
            }
          </ul>
        </InfiniteScroll>

      </div>

    </section>
  );
}
