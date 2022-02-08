import { STORE_ADMIN_ID, STORE_ID, STORE_TOKEN } from "./storeConstants";


export function useSaveStoreToken() {
  return (id, api_token, adminID)=> {
    window.localStorage.setItem(STORE_ID, id);
    window.localStorage.setItem(STORE_TOKEN, api_token);
    window.localStorage.setItem(STORE_ADMIN_ID, adminID);
  }
}

