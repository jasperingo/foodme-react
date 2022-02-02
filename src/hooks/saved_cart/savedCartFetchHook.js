
import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSavedCartFetchStatusAction, SAVED_CART } from "../../context/actions/savedCartActions";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import SavedCartRepository from "../../repositories/SavedCartRepository";
import { useAppContext } from "../contextHook";


export function useSavedCartFetch(userToken) {

  const { ID } = useParams();

  const { 
    savedCart: { 
      savedCartDispatch,
      savedCart: {
        savedCart,
        savedCartID,
        savedCartLoading,
        savedCartFetchStatus
      } 
    }
  } = useAppContext();

  const refetch = useCallback(
    ()=> {
      if (savedCartFetchStatus !== FETCH_STATUSES.LOADING && savedCartFetchStatus !== FETCH_STATUSES.DONE)
        savedCartDispatch(getSavedCartFetchStatusAction(FETCH_STATUSES.LOADING, Number(ID), true));
    },
    [ID, savedCartFetchStatus, savedCartDispatch]
  );
  
  useEffect(
    ()=> {

      if (savedCartID !== null && savedCartID !== Number(ID)) {

        savedCartDispatch({ type: SAVED_CART.UNFETCHED });

      } else if (savedCartLoading && savedCartFetchStatus === FETCH_STATUSES.LOADING && !window.navigator.onLine) {

        savedCartDispatch(getSavedCartFetchStatusAction(FETCH_STATUSES.ERROR, Number(ID), false));

      } else if (savedCartLoading && savedCartFetchStatus === FETCH_STATUSES.LOADING) {

        savedCartDispatch(getSavedCartFetchStatusAction(FETCH_STATUSES.LOADING, Number(ID), false));

        const api = new SavedCartRepository(userToken);
        api.get(ID)
        .then(res=> {
          
          if (res.status === 200) {
            savedCartDispatch({
              type: SAVED_CART.FETCHED, 
              payload: {
                savedCart: res.body.data, 
                fetchStatus: FETCH_STATUSES.DONE 
              }
            });
          } else if (res.status === 404) {
            savedCartDispatch(getSavedCartFetchStatusAction(FETCH_STATUSES.NOT_FOUND, Number(ID), false));
          } else if (res.status === 403) {
            savedCartDispatch(getSavedCartFetchStatusAction(FETCH_STATUSES.FORBIDDEN, Number(ID), false));
          } else {
            throw new Error();
          }
        })
        .catch(()=> {
          savedCartDispatch(getSavedCartFetchStatusAction(FETCH_STATUSES.ERROR, Number(ID), false));
        });
      }
    }
  );
  
  return [savedCart, savedCartFetchStatus, refetch];
}

