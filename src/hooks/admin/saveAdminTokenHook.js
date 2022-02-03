import { ADMIN_ID, ADMIN_TOKEN } from "./adminConstants";

export function useSaveAdminToken() {
  return (id, api_token)=> {
    window.localStorage.setItem(ADMIN_ID, id);
    window.localStorage.setItem(ADMIN_TOKEN, api_token);
  }
}

