
export const CUSTOMER = {
  AUTHED: 'CUSTOMER_AUTHED',
  UNAUTHED: 'CUSTOMER_UNAUTHED',

  FETCHED: 'CUSTOMER_FETCHED',
  UNFETCHED: 'CUSTOMER_UNFETCHED',
  FETCH_STATUS_CHANGED: 'CUSTOMER_FETCH_STATUS_CHANGED',

  LIST_FETCHED: 'CUSTOMERS_FETCHED',
  LIST_UNFETCHED: 'CUSTOMERS_UNFETCHED',
  LIST_FETCH_STATUS_CHANGED: 'CUSTOMERS_FETCH_STATUS_CHANGED',
};

export const getCustomerFetchStatusAction = (fetchStatus, id, loading) => ({
  type: CUSTOMER.FETCH_STATUS_CHANGED,
  payload: {
    fetchStatus, id, loading
  }
});

export const getCustomersListFetchStatusAction = (fetchStatus, loading) => ({
  type: CUSTOMER.LIST_FETCH_STATUS_CHANGED,
  payload: {
    fetchStatus, loading
  }
});

