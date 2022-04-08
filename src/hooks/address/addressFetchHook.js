import { useCallback, useMemo } from "react";
import { ADDRESS } from "../../context/actions/addressActions";
import NetworkError from "../../errors/NetworkError";
import NetworkErrorCodes from "../../errors/NetworkErrorCodes";
import AddressRepository from "../../repositories/AddressRepository";
import { useAppContext } from "../contextHook";

export function useAddressFetch() {

  const { 
    address: { 
      addressDispatch,
      address: {
        address,
        addressID,
        addressLoading,
        addressError
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

  const api = useMemo(function() { return new AddressRepository(customerToken); }, [customerToken]);

  const unfetchAddress = useCallback(
    function() { addressDispatch({ type: ADDRESS.UNFETCHED }); },
    [addressDispatch]
  );
  
  const fetchAddress = useCallback(
    async function(ID) {

      if (!window.navigator.onLine) {
        addressDispatch({
          type: ADDRESS.ERROR_CHANGED,
          payload: {
            id: ID,
            error: NetworkErrorCodes.NO_NETWORK_CONNECTION
          }
        });
        return;
      } 

      addressDispatch({ type: ADDRESS.FETCHING });
      
      try {
        
        const res = await api.get(ID);
          
        if (res.status === 200) {
          addressDispatch({
            type: ADDRESS.FETCHED, 
            payload: {
              address: res.body.data, 
              id: String(res.body.data.id)
            }
          });
        } else if (res.status === 404) {
          throw new NetworkError(NetworkErrorCodes.NOT_FOUND);
        } else if (res.status === 403) {
          throw new NetworkError(NetworkErrorCodes.FORBIDDEN);
        } else {
          throw new Error();
        }

      } catch(error) {
        addressDispatch({
          type: ADDRESS.ERROR_CHANGED,
          payload: {
            id: ID,
            error: error instanceof NetworkError ? error.message : NetworkErrorCodes.UNKNOWN_ERROR
          }
        });
      };
      
    },
    [api, addressDispatch]
  );

  return [
    fetchAddress,
    address,
    addressLoading,
    addressError,
    addressID,
    unfetchAddress
  ];
}
