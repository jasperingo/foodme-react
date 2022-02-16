import { DELIVERY_FIRM_ADMIN_ID, DELIVERY_FIRM_ID, DELIVERY_FIRM_TOKEN } from "./deliveryFirmConstants";


export function useSaveDeliveryFirmToken() {
  return (id, api_token, adminID)=> {
    window.localStorage.setItem(DELIVERY_FIRM_ID, id);
    window.localStorage.setItem(DELIVERY_FIRM_TOKEN, api_token);
    window.localStorage.setItem(DELIVERY_FIRM_ADMIN_ID, adminID);
  }
}

