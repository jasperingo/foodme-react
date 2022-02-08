
import React from 'react';
import Forbidden from '../../components/Forbidden';
import Loading from '../../components/Loading';
import NotFound from '../../components/NotFound';
import SavedCartProfile from '../../components/profile/SavedCartProfile';
import Reload from '../../components/Reload';
import { useAppContext } from '../../hooks/contextHook';
import { useHeader } from '../../hooks/headerHook';
import { useSavedCartDelete } from '../../hooks/saved_cart/savedCartDeleteHook';
import { useSavedCartFetch } from '../../hooks/saved_cart/savedCartFetchHook';
import { useRenderOnDataFetched } from '../../hooks/viewHook';

export default function SavedCart() {

  const {
    store: {
      store: {
        storeToken
      } 
    } 
  } = useAppContext();

  const [
    savedCart, 
    savedCartFetchStatus, 
    refetch
  ] = useSavedCartFetch(storeToken);

  const onDeleteSubmit = useSavedCartDelete(storeToken);
  
  useHeader({ 
    title: `${savedCart?.code ?? 'Loading...'} - Saved Cart`,
    headerTitle: "_cart.Saved_cart",
    topNavPaths: ['/cart']
  });

  return (
    <section>
      {
        useRenderOnDataFetched(
          savedCartFetchStatus,
          ()=> <SavedCartProfile savedCart={savedCart} onDeleteSubmit={onDeleteSubmit} />,
          ()=> <div className="container-x"> <Loading /> </div>,
          ()=> <div className="container-x"> <Reload action={refetch} /> </div>,
          ()=> <div className="container-x"> <NotFound /> </div>,
          ()=> <div className="container-x"> <Forbidden /> </div>,
        )
      }
    </section>
  );
}
