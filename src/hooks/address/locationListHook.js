import { useCallback, useEffect } from "react";
import { ADDRESS, getLocationsListFetchStatusAction } from "../../context/actions/addressActions";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import LocationRepository from "../../repositories/LocationRepository";
import { useAppContext } from "../contextHook";

export function useLocationList() {

  const { 
    address: { 
      addressDispatch,
      address: {
        locations,
        locationsFetchStatus
      } 
    }
  } = useAppContext();

  const refetch = useCallback(
    ()=> {
      if (locationsFetchStatus !== FETCH_STATUSES.LOADING && locationsFetchStatus !== FETCH_STATUSES.DONE)
        addressDispatch(getLocationsListFetchStatusAction(FETCH_STATUSES.LOADING));
    },
    [locationsFetchStatus, addressDispatch]
  );

  useEffect(
    ()=> {
      if (locationsFetchStatus === FETCH_STATUSES.LOADING && !window.navigator.onLine) {
        addressDispatch(getLocationsListFetchStatusAction(FETCH_STATUSES.ERROR));
      } else if (locationsFetchStatus === FETCH_STATUSES.LOADING) {
        const api = new LocationRepository();
        api.getList()
        .then(res=> {
          
          if (res.status === 200) {
            addressDispatch({
              type: ADDRESS.LOCATIONS_LIST_FETCHED, 
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
          addressDispatch(getLocationsListFetchStatusAction(FETCH_STATUSES.ERROR));
        });
      }
    },
    [locationsFetchStatus, addressDispatch]
  )

  return [locations, locationsFetchStatus, refetch];
}

