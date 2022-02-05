import { useCallback, useEffect } from "react";
import { ADDRESS, getAddressesListFetchStatusAction } from "../../context/actions/addressActions";
import CustomerRepository from "../../repositories/CustomerRepository";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import { useAppContext } from "../contextHook";


export function useCustomerAddressList(userId, userToken) {

  const { 
    customer: {
      dispatch,
      customer: {
        addresses: {
          addresses,
          addressesLoading,
          addressesFetchStatus
        }
      } 
    }
  } = useAppContext();

  const refetch = useCallback(
    ()=> {
      if (addressesFetchStatus !== FETCH_STATUSES.LOADING) 
        dispatch(getAddressesListFetchStatusAction(FETCH_STATUSES.LOADING, true));
    },
    [dispatch, addressesFetchStatus]
  );

  const refresh = useCallback(
    ()=> {
      dispatch({ type: ADDRESS.LIST_UNFETCHED });
    },
    [dispatch]
  );

  useEffect(
    ()=> {
      if (addressesLoading && addressesFetchStatus === FETCH_STATUSES.LOADING && !window.navigator.onLine) {

        dispatch(getAddressesListFetchStatusAction(FETCH_STATUSES.ERROR, false));

      } else if (addressesLoading && addressesFetchStatus === FETCH_STATUSES.LOADING) {

        dispatch(getAddressesListFetchStatusAction(FETCH_STATUSES.LOADING, false));

        const api = new CustomerRepository(userToken);
        api.getAddressesList(userId)
        .then(res=> {
          
          if (res.status === 200) {
            dispatch({
              type: ADDRESS.LIST_FETCHED, 
              payload: {
                list: res.body.data, 
                fetchStatus: FETCH_STATUSES.DONE 
              }
            });
          } else {
            throw new Error();
          }
        })
        .catch(()=> {
          dispatch(getAddressesListFetchStatusAction(FETCH_STATUSES.ERROR, false));
        });
      }
    },
    [userId, userToken, addressesLoading, addressesFetchStatus, dispatch]
  );

  return [addresses, addressesFetchStatus, refetch, refresh];
}

