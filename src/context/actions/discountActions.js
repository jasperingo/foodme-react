
export const DISCOUNT = {
  FETCHED: 'DISCOUNT_FETCHED',
  UNFETCHED: 'DISCOUNT_UNFETCHED',
  FETCH_STATUS_CHANGED: 'DISCOUNT_FETCH_STATUS_CHANGED',

  LIST_FETCHED: 'DISCOUNTS_FETCHED',
  LIST_UNFETCHED: 'DISCOUNTS_UNFETCHED',
  LIST_FETCH_STATUS_CHANGED: 'DISCOUNTS_FETCH_STATUS_CHANGED',
};

export const getDiscountFetchStatusAction = (fetchStatus, id, loading) => ({
  type: DISCOUNT.FETCH_STATUS_CHANGED,
  payload: {
    fetchStatus, id, loading
  }
});

export const getDiscountsListFetchStatusAction = (fetchStatus, loading) => ({
  type: DISCOUNT.LIST_FETCH_STATUS_CHANGED,
  payload: {
    fetchStatus, loading
  }
});

