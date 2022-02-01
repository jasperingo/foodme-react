
export const ORDER = {
  UNFETCHED: 'ORDER_UNFETCHED',
  FETCHED: 'ORDER_FETCHED',
  FETCH_STATUS_CHANGED: 'ORDER_FETCH_STATUS_CHANGED',
  LIST_FETCHED: 'ORDERS_FETCHED',
  LIST_UNFETCHED: 'ORDERS_UNFETCHED',
  LIST_FETCH_STATUS_CHANGED: 'ORDERS_FETCH_STATUS_CHANGED',
  LIST_STATUS_FILTER_CHANGED: 'ORDERS_STATUS_FILTER_CHANGED',
};

export const getOrderFetchStatusAction = (fetchStatus, id, loading) => ({
  type: ORDER.FETCH_STATUS_CHANGED,
  payload: {
    fetchStatus, id, loading
  }
});

export const getOrdersListFetchStatusAction = (fetchStatus, loading) => ({
  type: ORDER.LIST_FETCH_STATUS_CHANGED,
  payload: {
    fetchStatus, loading
  }
});

