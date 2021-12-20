
import React, { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import SavedCartApi from '../../api/SavedCartApi';
import { cartIcon } from '../../assets/icons';
import EmptyList from '../../components/EmptyList';
import FetchMoreButton from '../../components/FetchMoreButton';
import Loading from '../../components/Loading';
import Reload from '../../components/Reload';
import SavedCartItem from '../../components/SavedCartItem';
import { FETCH_STATUSES, getSavedCartsListFetchStatusAction } from '../../context/AppActions';
import { useAppContext } from '../../context/AppContext';
import { useHasMoreToFetchViaScroll, useListRender } from '../../context/AppHooks';

export default function SavedCarts() {

  const { 
    user: { user },
    savedCarts: {
      savedCarts: {
        savedCarts,
        savedCartsPage,
        savedCartsNumberOfPages,
        savedCartsFetchStatus,
      }
    }, 
    savedCartsDispatch
  } = useAppContext();

  useEffect(()=>{
    if (savedCartsFetchStatus === FETCH_STATUSES.LOADING) {
      const api = new SavedCartApi(user.api_token);
      api.getListByCustomer(user.id, savedCartsPage, savedCartsDispatch);
    }
  });

  function refetchSavedCarts() {
    if (savedCartsFetchStatus !== FETCH_STATUSES.LOADING) 
      savedCartsDispatch(getSavedCartsListFetchStatusAction(FETCH_STATUSES.LOADING));
  }

  return (
    <section className="flex-grow">
      <div className="container-x">
        <InfiniteScroll
          dataLength={savedCarts.length}
          next={refetchSavedCarts}
          hasMore={useHasMoreToFetchViaScroll(savedCartsPage, savedCartsNumberOfPages, savedCartsFetchStatus)}
          >
          <ul className="list-2-x">
            { 
              useListRender(
                savedCarts, 
                savedCartsFetchStatus,
                (item, i)=> <SavedCartItem key={`saved-cart-${i}`} cart={item} />, 
                (k)=> <li key={k}> <Loading /> </li>, 
                (k)=> <li key={k}> <Reload action={refetchSavedCarts} /> </li>,
                (k)=> <li key={k}> <EmptyList text="_empty.No_saved_cart" icon={cartIcon} /> </li>, 
                (k)=> <li key={k}> <FetchMoreButton action={refetchSavedCarts} /> </li>,
              )
            }
          </ul>
        </InfiniteScroll>
      </div>
    </section>
  );
}

