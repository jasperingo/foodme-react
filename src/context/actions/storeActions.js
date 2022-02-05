
export const STORE = {
  FETCHED: 'STORE_FETCHED',
  UNFETCHED: 'STORE_UNFETCHED',
  FETCH_STATUS_CHANGED: 'STORE_FETCH_STATUS_CHANGED',

  LIST_FETCHED: 'STORES_FETCHED',
  LIST_UNFETCHED: 'STORES_UNFETCHED',
  LIST_FETCH_STATUS_CHANGED: 'STORES_FETCH_STATUS_CHANGED',
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
