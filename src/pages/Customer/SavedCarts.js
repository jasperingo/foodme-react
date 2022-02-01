
import React from 'react';
import { cartIcon } from '../../assets/icons';
import EmptyList from '../../components/EmptyList';
import FetchMoreButton from '../../components/FetchMoreButton';
import Loading from '../../components/Loading';
import Reload from '../../components/Reload';
import SavedCartItem from '../../components/list_item/SavedCartItem';
import { useSavedCartList } from '../../hooks/saved_cart/savedCartListHook';
import { useAppContext } from '../../hooks/contextHook';
import ScrollList from '../../components/list/ScrollList';
import { useHasMoreToFetchViaScroll, useRenderListFooter } from '../../hooks/viewHook';
import { useHeader } from '../../hooks/headerHook';

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
    savedCarts, 
    savedCartsFetchStatus, 
    savedCartsPage, 
    savedCartsNumberOfPages, 
    refetch, 
    refresh
  ] = useSavedCartList(customer.id, customerToken);

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
            ()=> <li key="transactions-footer"> <Loading /> </li>, 
            ()=> <li key="transactions-footer"> <Reload action={refetch} /> </li>,
            ()=> <li key="transactions-footer" className="col-span-2"> <EmptyList text="_empty.No_saved_cart" icon={cartIcon} /> </li>,
            ()=> <li key="transactions-footer"> <FetchMoreButton action={refetch} /> </li>
          )}
          />

      </div>
    </section>
  );
}

