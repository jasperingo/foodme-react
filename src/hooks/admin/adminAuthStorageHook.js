import { useCallback } from 'react';

export const ADMIN_ID = 'admin_id';
export const ADMIN_TOKEN = 'admin_token';

export function useAdminAuthSet() {
  return useCallback(function(id, api_token) {
    window.localStorage.setItem(ADMIN_ID, id);
    window.localStorage.setItem(ADMIN_TOKEN, api_token);
  }, []);
}

export function useAdminAuthGet() {
  const adminId = window.localStorage.getItem(ADMIN_ID);
  const adminToken = window.localStorage.getItem(ADMIN_TOKEN);
  return [adminId, adminToken];
}

export function useAdminAuthUnset() {
  return function() {
    window.localStorage.removeItem(ADMIN_ID);
    window.localStorage.removeItem(ADMIN_TOKEN);
  }
}

