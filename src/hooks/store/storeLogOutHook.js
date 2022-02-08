import { STORE } from "../../context/actions/storeActions";
import { useAppContext } from "../contextHook";
import { STORE_ID, STORE_TOKEN } from "./storeConstants";

export function useStoreLogOut() {

  const { 
    store: { storeDispatch } 
  } = useAppContext();

  return ()=> {
    window.localStorage.removeItem(STORE_ID);
    window.localStorage.removeItem(STORE_TOKEN);

    storeDispatch({ type: STORE.UNAUTHED });
  }

}

