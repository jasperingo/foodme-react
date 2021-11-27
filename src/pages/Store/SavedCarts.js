
import React, { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { cartIcon } from '../../assets/icons';
import EmptyList from '../../components/EmptyList';
import FetchMoreButton from '../../components/FetchMoreButton';
import Loading from '../../components/Loading';
import Reload from '../../components/Reload';
import SavedCartItem from '../../components/SavedCartItem';
import { FETCH_STATUSES, SAVED_CART } from '../../context/AppActions';
import { API_URL, useAppContext } from '../../context/AppContext';
import { useHasMoreToFetchViaScroll, useListRender } from '../../context/AppHooks';

const getListFetchStatusAction = (payload) => ({
  type: SAVED_CART.LIST_FETCH_STATUS_CHANGED,
  payload
});


export default function SavedCarts() {

  const { savedCarts: {
    savedCarts: {
      savedCarts,
      savedCartsPage,
      savedCartsNumberOfPages,
      savedCartsFetchStatus,
    }
  }, savedCartsDispatch } = useAppContext();

  useEffect(()=>{

    async function fetchSavedCarts() {

      if (savedCartsFetchStatus !== FETCH_STATUSES.LOADING) 
        return;
      
      try {
        let response = await fetch(`${API_URL}saved-carts.json`);

        if (!response.ok)
          throw new Error(response.status);
        
        let data = await response.json();
        
        savedCartsDispatch({
          type: SAVED_CART.LIST_FETCHED,
          payload: {
            savedCarts: data.data,
            savedCartsNumberOfPages: data.total_pages
          }
        });

      } catch (err) {
        savedCartsDispatch(getListFetchStatusAction(FETCH_STATUSES.ERROR));
      }
    }

    fetchSavedCarts();
  });

  function refetchSavedCarts() {
    if (savedCartsFetchStatus === FETCH_STATUSES.LOADING) 
      return;
    
    savedCartsDispatch(getListFetchStatusAction(FETCH_STATUSES.LOADING));
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
