
export const STORE = {
  AUTHED: 'STORE_AUTHED',
  UNAUTHED: 'STORE_UNAUTHED',

  FETCHED: 'STORE_FETCHED',
  UNFETCHED: 'STORE_UNFETCHED',
  FETCHING: 'STORE_FETCHING',
  ERROR_CHANGED: 'STORE_ERROR_CHANGED',

  LIST_FETCHED: 'STORES_FETCHED',
  LIST_UNFETCHED: 'STORES_UNFETCHED',
  LIST_FETCH_STATUS_CHANGED: 'STORES_FETCH_STATUS_CHANGED',

  LIST_FETCHING: 'STORES_FETCHING',
  LIST_ERROR_CHANGED: 'STORES_FETCH_FAILED',
};

export const getStoreFetchStatusAction = (fetchStatus, id, loading) => ({
  type: STORE.FETCH_STATUS_CHANGED,
  payload: {
    id, 
    fetchStatus,
    loading
  }
});

export const getStoresListFetchStatusAction = (fetchStatus, loading) => ({
  type: STORE.LIST_FETCH_STATUS_CHANGED,
  payload: {
    fetchStatus, loading
  }
});
