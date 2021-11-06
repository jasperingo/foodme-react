
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useHistory } from 'react-router-dom';
import AlertDialog from '../../components/AlertDialog';
import EmptyList from '../../components/EmptyList';
import FetchMoreButton from '../../components/FetchMoreButton';
import Loading from '../../components/Loading';
import Reload from '../../components/Reload';
import { CART, FETCH_STATUSES, SAVED_CART } from '../../context/AppActions';
import { API_URL, useAppContext } from '../../context/AppContext';
import { useHasMoreToFetchViaScroll, useListRender } from '../../context/AppHooks';
import CartIcon from '../../icons/CartIcon';
import CopyIcon from '../../icons/CopyIcon';


const getListFetchStatusAction = (payload) => ({
  type: SAVED_CART.LIST_FETCH_STATUS_CHANGED,
  payload
});


function SavedCartItem({ cart: { code, name, number_of_items } }) {

  const { t } = useTranslation();

  const history = useHistory()

  const { cartDispatch } = useAppContext();

  const [dialog, setDialog] = useState(null);

  async function fetchSavedCart() {
    
    try {
      let response = await fetch(`${API_URL}saved-cart.json?code=${code}`);

      if (!response.ok)
        throw new Error(response.status);
      
      let data = await response.json();
      
      cartDispatch({
        type: CART.DUMPED,
        payload: data.data
      });

      history.push('/cart');

    } catch (err) {
      
      setDialog({
        body: {
          layout() {
            return <Reload action={openCart} />
          }
        },
        negativeButton: {
          text: '_extra.Cancel',
          action() {
            setDialog(null);
          }
        }
      });

    }
  }

  function copyCode() {
    alert(code);
  }

  function openCart() {
    
    setDialog({
      body: {
        layout() {
          return <Loading />
        }
      },
      negativeButton: {
        text: '_extra.Cancel',
        action() {
          setDialog(null);
        }
      }
    });

    fetchSavedCart();
  }

  return (
    <li>
      <div className="mb-4 rounded md:shadow md:p-2">
        <div className="text-lg font-bold mb-1">{ code }</div>
        <div className="text-lg mb-1">{ name }</div>
        <div className="mb-1 text-color-gray">{ t('_order.item__Num', { count: number_of_items }) }</div>
        <div className="flex justify-between">
          <button className="flex gap-2 btn-color-blue p-2 rounded" onClick={copyCode}>
            <CopyIcon />
            <span>{ t('_cart.Copy_code') }</span>
          </button>
          <button className="flex gap-2 btn-color-primary p-2 rounded" onClick={openCart}>
            <CartIcon />
            <span>{ t('_cart.Open_cart') }</span>
          </button>
        </div>
        { dialog && <AlertDialog dialog={dialog} /> }
      </div>
    </li>
  );
}

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
                (k)=> <li key={k}> <EmptyList text="_empty.No_saved_cart" Icon={CartIcon} /> </li>, 
                (k)=> <li key={k}> <FetchMoreButton action={refetchSavedCarts} /> </li>,
              )
            }
          </ul>
        </InfiniteScroll>
      </div>
    </section>
  );
}

