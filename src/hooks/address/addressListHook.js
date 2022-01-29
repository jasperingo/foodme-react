import { useCallback, useEffect } from "react";
import { ADDRESS, getAddressesListFetchStatusAction } from "../../context/actions/addressActions";
import CustomerRepository from "../../repositories/CustomerRepository";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import { useAppContext } from "../contextHook";


export function useAddressList() {

  const { 
    address: { 
      addressDispatch,
      address: {
        addresses,
        addressesFetchStatus
      } 
    },
    customer: {
      customer: {
        customer: {
          customer,
          customerToken
        }
      } 
    } 
  } = useAppContext();

  const refetch = useCallback(
    ()=> {
      if (addressesFetchStatus !== FETCH_STATUSES.LOADING) 
        addressDispatch(getAddressesListFetchStatusAction(FETCH_STATUSES.LOADING));
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
      if (addressesFetchStatus === FETCH_STATUSES.LOADING && !window.navigator.onLine) {
        addressDispatch(getAddressesListFetchStatusAction(FETCH_STATUSES.ERROR));
      } else if (addressesFetchStatus === FETCH_STATUSES.LOADING) {
        const api = new CustomerRepository(customerToken);
        api.getAddressesList(customer.id)
        .then(res=> {
          
          if (res.status === 200) {
            addressDispatch({
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
          addressDispatch(getAddressesListFetchStatusAction(FETCH_STATUSES.ERROR));
        });
      }
    },
    [customer.id, customerToken, addressesFetchStatus, addressDispatch]
  );

  return [addresses, addressesFetchStatus, refetch, refresh];
}

