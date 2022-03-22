
const CUSTOMER_ID = 'customer_id';
const CUSTOMER_TOKEN = 'customer_token';

export function useCustomerAuthSet() {
  return function(id, api_token) {
    window.localStorage.setItem(CUSTOMER_ID, id);
    window.localStorage.setItem(CUSTOMER_TOKEN, api_token);
  }
}

export function useCustomerAuthGet() {
  const customerId = window.localStorage.getItem(CUSTOMER_ID);
  const customerToken = window.localStorage.getItem(CUSTOMER_TOKEN);
  return [customerId, customerToken];
}

export function useCustomerAuthUnset() {
  return function() {
    window.localStorage.removeItem(CUSTOMER_ID);
    window.localStorage.removeItem(CUSTOMER_TOKEN);
  }
}

