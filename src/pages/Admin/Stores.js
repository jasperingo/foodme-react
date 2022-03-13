
import React from 'react';
import { storeIcon } from '../../assets/icons';
import EmptyList from '../../components/EmptyList';
import FetchMoreButton from '../../components/FetchMoreButton';
import Forbidden from '../../components/Forbidden';
import ScrollList from '../../components/list/ScrollList';
import StoreItem from '../../components/list_item/StoreItem';
import Loading from '../../components/Loading';
import NotFound from '../../components/NotFound';
import Reload from '../../components/Reload';
import { useAppContext } from '../../hooks/contextHook';
import { useHeader } from '../../hooks/headerHook';
import { useStoreList } from '../../hooks/store/storeListHook';
import { useHasMoreToFetchViaScroll, useRenderListFooter } from '../../hooks/viewHook';

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
    stores, 
    storesFetchStatus,
    storesPage, 
    storesNumberOfPages, 
    refetch
  ] = useStoreList(adminToken);

  return (
    <section>
      
      <div className="container-x">

        <ScrollList
          data={stores}
          nextPage={refetch}
          hasMore={useHasMoreToFetchViaScroll(storesPage, storesNumberOfPages, storesFetchStatus)}
          className="list-x"
          renderDataItem={(item)=> (
            <StoreItem key={`store-${item.id}`} store={item} />
          )}
          footer={useRenderListFooter(
            storesFetchStatus,
            ()=> <li key="store-footer" className="list-x-col-span"> <Loading /> </li>, 
            ()=> <li key="store-footer" className="list-x-col-span"> <Reload action={refetch} /> </li>,
            ()=> <li key="store-footer" className="list-x-col-span"> <EmptyList text="_empty.No_store" icon={storeIcon} /> </li>,
            ()=> <li key="store-footer" className="list-x-col-span"> <FetchMoreButton action={refetch} /> </li>,
            ()=> <li key="store-footer" className="list-x-col-span"> <NotFound /> </li>,
            ()=> <li key="store-footer" className="list-x-col-span"> <Forbidden /> </li>,
          )}
          />

      </div>

    </section>
  );
}
