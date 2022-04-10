import { useCallback } from 'react';

const STORE_ID = 'store_id';
const STORE_TOKEN = 'store_token';
const STORE_ADMIN_ID= 'store_admin_id';

export function useStoreAuthSet() {
  return useCallback(function(id, api_token, adminId) {
    window.localStorage.setItem(STORE_ID, id);
    window.localStorage.setItem(STORE_TOKEN, api_token);
    window.localStorage.setItem(STORE_ADMIN_ID, adminId);
  }, []);
}

export function useStoreAuthGet() {
  const storeId = window.localStorage.getItem(STORE_ID);
  const storeToken = window.localStorage.getItem(STORE_TOKEN);
  const storeAdminId = window.localStorage.getItem(STORE_ADMIN_ID);
  return [storeId, storeToken, storeAdminId];
}

export function useStoreAuthUnset() {
  return function() {
    window.localStorage.removeItem(STORE_ID);
    window.localStorage.removeItem(STORE_TOKEN);
    window.localStorage.removeItem(STORE_ADMIN_ID);
  }
}
