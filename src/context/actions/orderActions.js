
export const ORDER = {
  UNFETCHED: 'ORDER_UNFETCHED',
  FETCHED: 'ORDER_FETCHED',
  FETCHING: 'ORDER_FETCHING',
  ERROR_CHANGED: 'ORDER_ERROR_CHANGED',

  LIST_FETCHED: 'ORDERS_FETCHED',
  LIST_UNFETCHED: 'ORDERS_UNFETCHED',
  LIST_FETCHING: 'ORDERS_FETCHING',
  LIST_ERROR_CHANGED: 'ORDERS_ERROR_CHANGED',

  UPDATED: 'ORDER_UPDATED',
  ITEM_UPDATED: 'ORDER_ITEM_UPDATED',
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

