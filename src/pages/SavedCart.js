
import React, { useCallback, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Forbidden from '../components/Forbidden';
import Loading from '../components/Loading';
import NotFound from '../components/NotFound';
import SavedCartProfile from '../components/profile/SavedCartProfile';
import Reload from '../components/Reload';
import NetworkErrorCodes from '../errors/NetworkErrorCodes';
import { useHeader } from '../hooks/headerHook';
import { useSavedCartDelete } from '../hooks/saved_cart/savedCartDeleteHook';
import { useSavedCartFetch } from '../hooks/saved_cart/savedCartFetchHook';

export default function SavedCart({ userToken }) {

  const { ID } = useParams();

  const history = useHistory();

  const [
    fetchSavedCart,
    savedCart,
    savedCartLoading,
    savedCartError,
    savedCartID,
    unfetchSavedCart
  ] = useSavedCartFetch(userToken);

  const [
    onSubmit,
    loading,
    formSuccess,
    formError,
    resetSubmit
  ] = useSavedCartDelete(userToken);
  
  useHeader({ 
    title: `${savedCart?.code ?? 'Loading...'} - Saved Cart`,
    headerTitle: "_cart.Saved_cart",
    topNavPaths: ['/cart']
  });

  const savedCartsFetch = useCallback(
    function(ID) {
      if (!savedCartLoading) fetchSavedCart(ID);
    },
    [savedCartLoading, fetchSavedCart]
  );

  useEffect(
    function() {
      if ((savedCart !== null || savedCartError !== null) && savedCartID !== ID) 
        unfetchSavedCart();
      else if (savedCart === null && savedCartError === null)
        savedCartsFetch(ID);
    },
    [ID, savedCart, savedCartError, savedCartID, savedCartsFetch, unfetchSavedCart]
  );

  useEffect(
    function() {
      if (formSuccess !== null) history.push('/saved-carts');
    }, 
    [formSuccess, history]
  );

  return (
    <section>
      
      { 
        savedCart !== null && 
        <SavedCartProfile 
          savedCart={savedCart} 
          onDeleteSubmit={onSubmit} 
          deleteLoading={loading}
          deleteFormError={formError}
          resetDeleteSubmit={resetSubmit}
          /> 
      }

      {
        savedCart === null &&
        <div className="container-x">
          { savedCartLoading && <Loading /> }
          { savedCartError === NetworkErrorCodes.NOT_FOUND && <NotFound /> }
          { savedCartError === NetworkErrorCodes.FORBIDDEN && <Forbidden /> }
          { savedCartError === NetworkErrorCodes.UNKNOWN_ERROR  && <Reload action={()=> savedCartsFetch(ID)} /> }
          { savedCartError === NetworkErrorCodes.NO_NETWORK_CONNECTION  && <Reload message="_errors.No_netowrk_connection" action={()=> savedCartsFetch(ID)} /> }
        </div>
      }
      
    </section>
  );
}
