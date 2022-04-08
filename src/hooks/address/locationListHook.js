import { useCallback, useMemo } from "react";
import { ADDRESS } from "../../context/actions/addressActions";
import NetworkErrorCodes from "../../errors/NetworkErrorCodes";
import LocationRepository from "../../repositories/LocationRepository";
import { useAppContext } from "../contextHook";

export function useLocationList() {

  const { 
    address: { 
      addressDispatch,
      address: {
        locations,
        locationsLoading,
        locationsLoaded,
        locationsError,
      } 
    }
  } = useAppContext();

  const api = useMemo(function() { return new LocationRepository(); }, []);

  const fetchLocations = useCallback(
    async function() {

      if (!window.navigator.onLine) {
        addressDispatch({
          type: ADDRESS.LOCATIONS_LIST_ERROR_CHANGED,
          payload: { error: NetworkErrorCodes.NO_NETWORK_CONNECTION }
        });
        return;
      }

      addressDispatch({ type: ADDRESS.LOCATIONS_LIST_FETCHING });

      try {

        const res = await api.getList();
          
        if (res.status === 200) {
          addressDispatch({
            type: ADDRESS.LOCATIONS_LIST_FETCHED, 
            payload: { list: res.body.data }
          });
        } else {
          throw new Error();
        }
      } catch(error) {
        addressDispatch({
          type: ADDRESS.LOCATIONS_LIST_ERROR_CHANGED,
          payload: { error: NetworkErrorCodes.UNKNOWN_ERROR }
        });
      }
    },
    [api, addressDispatch]
  );

  return [
    fetchLocations,
    locations,
    locationsLoading,
    locationsError,
    locationsLoaded
  ];
}
