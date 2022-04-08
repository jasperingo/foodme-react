
export const SAVED_CART = {
  FETCHED: 'SAVED_CART_FETCHED',
  UNFETCHED: 'SAVED_CART_UNFETCHED',
  FETCH_STATUS_CHANGED: 'SAVED_CART_FETCH_STATUS_CHANGED',

  LIST_FETCHED: 'SAVED_CARTS_FETCHED',
  LIST_UNFETCHED: 'SAVED_CARTS_UNFETCHED',
  LIST_FETCHING: 'SAVED_CARTS_FETCHING',
  LIST_ERROR_CHANGED: 'SAVED_CARTS_ERROR_CHANGED',
  LIST_FETCH_STATUS_CHANGED: 'SAVED_CARTS_FETCH_STATUS_CHANGED',

  CREATED: 'SAVED_CART_CREATED',
  DELETED: 'SAVED_CART_DELETED'
};

export const getSavedCartFetchStatusAction = (fetchStatus, id, loading) => ({
  type: SAVED_CART.FETCH_STATUS_CHANGED,
  payload: {
    fetchStatus, id, loading
  }
});

export const getSavedCartsListFetchStatusAction = (fetchStatus, loading) => ({
  type: SAVED_CART.LIST_FETCH_STATUS_CHANGED,
  payload: {
    fetchStatus, loading
  }
});
