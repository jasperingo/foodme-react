
export const STORE = {
  UNFETCHED: 'STORE_UNFETCHED',
  FETCHED: 'STORE_FETCHED',
  FETCH_STATUS_CHANGED: 'STORE_FETCH_STATUS_CHANGED',
  LIST_FETCHED: 'STORES_FETCHED',
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
