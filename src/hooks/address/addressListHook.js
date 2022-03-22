import { useCallback, useEffect } from "react";
import { ADDRESS, getAddressesListFetchStatusAction } from "../../context/actions/addressActions";
import CustomerRepository from "../../repositories/CustomerRepository";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import { useAppContext } from "../contextHook";


export function useAddressList(user, userToken) {

  const { 
    address: { 
      addressDispatch,
      address: {
        addresses,
        addressesLoading,
        addressesFetchStatus
      } 
    }
  } = useAppContext();

  const refetch = useCallback(
    ()=> {
      if (addressesFetchStatus !== FETCH_STATUSES.LOADING) 
        addressDispatch(getAddressesListFetchStatusAction(FETCH_STATUSES.LOADING, true));
    },
    [addressDispatch, addressesFetchStatus]
  );

  const refresh = useCallback(
    ()=> {
      addressDispatch({ type: ADDRESS.LIST_UNFETCHED });
    },
    [addressDispatch]
  );

  useEffect(
    ()=> {
      if (addressesLoading && addressesFetchStatus === FETCH_STATUSES.LOADING && !window.navigator.onLine) {

        addressDispatch(getAddressesListFetchStatusAction(FETCH_STATUSES.ERROR, false));

      } else if (addressesLoading && addressesFetchStatus === FETCH_STATUSES.LOADING) {

        addressDispatch(getAddressesListFetchStatusAction(FETCH_STATUSES.LOADING, false));

        const api = new CustomerRepository(userToken);
        api.getAddressesList(user.id)
        .then(res=> {
          
          if (res.status === 200) {
            addressDispatch({
              type: ADDRESS.LIST_FETCHED, 
              payload: {
                list: res.body.data, 
                fetchStatus: res.body.data.length < 1 ? FETCH_STATUSES.EMPTY : FETCH_STATUSES.DONE 
              }
            });
          } else {
            throw new Error();
          }
        })
        .catch(()=> {
          addressDispatch(getAddressesListFetchStatusAction(FETCH_STATUSES.ERROR, false));
        });
      }
    },
    [user.id, userToken, addressesLoading, addressesFetchStatus, addressDispatch]
  );

  return [addresses, addressesFetchStatus, refetch, refresh];
}

