
import React from 'react';
import { cartIcon } from '../../assets/icons';
import EmptyList from '../../components/EmptyList';
import FetchMoreButton from '../../components/FetchMoreButton';
import ScrollList from '../../components/list/ScrollList';
import SavedCartItem from '../../components/list_item/SavedCartItem';
import Loading from '../../components/Loading';
import Reload from '../../components/Reload';
import { useAppContext } from '../../hooks/contextHook';
import { useHeader } from '../../hooks/headerHook';
import { useStoreSavedCartList } from '../../hooks/store/storeSavedCartListHook';
import { useHasMoreToFetchViaScroll, useRenderListFooter } from '../../hooks/viewHook';

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
    savedCarts, 
    savedCartsFetchStatus, 
    savedCartsPage, 
    savedCartsNumberOfPages, 
    refetch, 
    refresh
  ] = useStoreSavedCartList(store.id, storeToken);

  return (
    <section>
      <div className="container-x">
        
        <ScrollList
          data={savedCarts}
          nextPage={refetch}
          refreshPage={refresh}
          hasMore={useHasMoreToFetchViaScroll(savedCartsPage, savedCartsNumberOfPages, savedCartsFetchStatus)}
          className="list-2-x"
          renderDataItem={(item)=> (
            <SavedCartItem key={`saved-cart-${item.id}`} cart={item} />
          )}
          footer={useRenderListFooter(
            savedCartsFetchStatus,
            ()=> <li key="saved-cart-footer"> <Loading /> </li>, 
            ()=> <li key="saved-cart-footer"> <Reload action={refetch} /> </li>,
            ()=> <li key="saved-cart-footer" className="col-span-2"> <EmptyList text="_empty.No_saved_cart" icon={cartIcon} /> </li>,
            ()=> <li key="saved-cart-footer"> <FetchMoreButton action={refetch} /> </li>
          )}
          />

      </div>
    </section>
  );
}
