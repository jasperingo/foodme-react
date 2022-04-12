
import { useCallback } from 'react';

const DELIVERY_FIRM_ID = 'delivery_firm_id';
const DELIVERY_FIRM_TOKEN = 'delivery_firm_token';
const DELIVERY_FIRM_ADMIN_ID= 'delivery_Firm_admin_id';

export function useDeliveryFirmAuthSet() {
  return useCallback(function(id, api_token, adminId) {
    window.localStorage.setItem(DELIVERY_FIRM_ID, id);
    window.localStorage.setItem(DELIVERY_FIRM_TOKEN, api_token);
    window.localStorage.setItem(DELIVERY_FIRM_ADMIN_ID, adminId);
  }, []);
}

export function useDeliveryFirmAuthGet() {
  const deliveryFirmId = window.localStorage.getItem(DELIVERY_FIRM_ID);
  const deliveryFirmToken = window.localStorage.getItem(DELIVERY_FIRM_TOKEN);
  const deliveryFirmAdminId = window.localStorage.getItem(DELIVERY_FIRM_ADMIN_ID);
  return [deliveryFirmId, deliveryFirmToken, deliveryFirmAdminId];
}

export function useDeliveryFirmAuthUnset() {
  return function() {
    window.localStorage.removeItem(DELIVERY_FIRM_ID);
    window.localStorage.removeItem(DELIVERY_FIRM_TOKEN);
    window.localStorage.removeItem(DELIVERY_FIRM_ADMIN_ID);
  }
}
