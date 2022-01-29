
export const STORE = {
  UNFETCH: 'STORE_UNFETCH',
  FETCHED: 'STORE_FETCHED',
  FETCH_STATUS_CHANGED: 'STORE_FETCH_STATUS_CHANGED',
  LIST_FETCHED: 'STORES_FETCHED',
  LIST_FETCH_STATUS_CHANGED: 'STORES_FETCH_STATUS_CHANGED',
};

export const getStoreFetchStatusAction = (payload) => ({
  type: STORE.FETCH_STATUS_CHANGED,
  payload
});

export const getStoresListFetchStatusAction = (payload) => ({
  type: STORE.LIST_FETCH_STATUS_CHANGED,
  payload
});
