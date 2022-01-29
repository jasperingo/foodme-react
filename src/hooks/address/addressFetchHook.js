import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ADDRESS, getAddressFetchStatusAction } from "../../context/actions/addressActions";
import AddressRepository from "../../repositories/AddressRepository";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import { useAppContext } from "../contextHook";


export function useAddressFetch() {

  const { ID } = useParams();

  const { 
    address: { 
      addressDispatch,
      address: {
        address,
        addressFetchStatus
      } 
    },
    customer: {
      customer: {
        customer: {
          customerToken
        }
      } 
    } 
  } = useAppContext();

  const refetch = useCallback(
    ()=> {
      if (addressFetchStatus !== FETCH_STATUSES.LOADING && addressFetchStatus !== FETCH_STATUSES.DONE)
        addressDispatch(getAddressFetchStatusAction(FETCH_STATUSES.LOADING));
    },
    [addressFetchStatus, addressDispatch]
  );
  
  useEffect(
    ()=> {

      if (addressFetchStatus === FETCH_STATUSES.LOADING && !window.navigator.onLine) {
        addressDispatch(getAddressFetchStatusAction(FETCH_STATUSES.ERROR));
      } else if (addressFetchStatus === FETCH_STATUSES.LOADING) {
        const api = new AddressRepository(customerToken);
        api.get(ID)
        .then(res=> {
          
          if (res.status === 200) {
            addressDispatch({
              type: ADDRESS.FETCHED, 
              payload: {
                address: res.body.data, 
                fetchStatus: FETCH_STATUSES.DONE 
              }
            });
          } else if (res.status === 404) {
            addressDispatch(getAddressFetchStatusAction(FETCH_STATUSES.NOT_FOUND));
          } else if (res.status === 403) {
            addressDispatch(getAddressFetchStatusAction(FETCH_STATUSES.FORBIDDEN));
          } else {
            throw new Error();
          }
        })
        .catch(()=> {
          addressDispatch(getAddressFetchStatusAction(FETCH_STATUSES.ERROR));
        });
      }
    }
  );

  useEffect(
    ()=> {
      if (address !== null && address.id === Number(ID)) return;
      addressDispatch({ type: ADDRESS.UNFETCHED });
    },
    [ID, address, addressDispatch]
  );

  return [address, addressFetchStatus, refetch];
}

