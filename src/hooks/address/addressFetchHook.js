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
        addressID,
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
        addressDispatch(getAddressFetchStatusAction(FETCH_STATUSES.LOADING, Number(ID)));
    },
    [ID, addressFetchStatus, addressDispatch]
  );
  
  useEffect(
    ()=> {

      if (addressID !== null && addressID !== Number(ID)) {
        
        addressDispatch({ type: ADDRESS.UNFETCHED });

    } else if (addressFetchStatus === FETCH_STATUSES.LOADING && !window.navigator.onLine) {

        addressDispatch(getAddressFetchStatusAction(FETCH_STATUSES.ERROR, Number(ID)));

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
            addressDispatch(getAddressFetchStatusAction(FETCH_STATUSES.NOT_FOUND, Number(ID)));
          } else if (res.status === 403) {
            addressDispatch(getAddressFetchStatusAction(FETCH_STATUSES.FORBIDDEN, Number(ID)));
          } else {
            throw new Error();
          }
        })
        .catch(()=> {
          addressDispatch(getAddressFetchStatusAction(FETCH_STATUSES.ERROR, Number(ID)));
        });
      }
    }
  );

  return [address, addressFetchStatus, refetch];
}

