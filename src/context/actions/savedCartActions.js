
export const SAVED_CART = {
  UNFETCHED: 'SAVED_CART_UNFETCHED',
  FETCHED: 'SAVED_CART_FETCHED',
  FETCH_STATUS_CHANGED: 'SAVED_CART_FETCH_STATUS_CHANGED',

  LIST_FETCHED: 'SAVED_CARTS_FETCHED',
  LIST_UNFETCHED: 'SAVED_CARTS_UNFETCHED',
  LIST_FETCH_STATUS_CHANGED: 'SAVED_CARTS_FETCH_STATUS_CHANGED',

  DELETED: 'SAVED_CART_DELETED'
};

export const getSavedCartFetchStatusAction = (payload) => ({
  type: SAVED_CART.FETCH_STATUS_CHANGED,
  payload
});

export const getSavedCartsListFetchStatusAction = (fetchStatus, loading) => ({
  type: SAVED_CART.LIST_FETCH_STATUS_CHANGED,
  payload: {
    fetchStatus, loading
  }
});
