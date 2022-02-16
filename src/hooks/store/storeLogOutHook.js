import { STORE } from "../../context/actions/storeActions";
import { useAppContext } from "../contextHook";
import { STORE_ADMIN_ID, STORE_ID, STORE_TOKEN } from "./storeConstants";

export function useStoreLogOut() {

  const { 
    store: { storeDispatch } 
  } = useAppContext();

  return ()=> {
    window.localStorage.removeItem(STORE_ID);
    window.localStorage.removeItem(STORE_TOKEN);
    window.localStorage.removeItem(STORE_ADMIN_ID);

    storeDispatch({ type: STORE.UNAUTHED });
  }

}

