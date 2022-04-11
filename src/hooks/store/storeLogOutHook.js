import { STORE } from "../../context/actions/storeActions";
import { useAppContext } from "../contextHook";
import { useStoreAuthUnset } from "./storeAuthStorageHook";

export function useStoreLogOut() {

  const { 
    store: { storeDispatch } 
  } = useAppContext();

  const unauth = useStoreAuthUnset();

  return function() {
    unauth();
    storeDispatch({ type: STORE.UNAUTHED });
  }
}
