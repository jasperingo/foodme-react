
export const DISCOUNT = {
  UNFETCHED: 'DISCOUNT_UNFETCHED',
  FETCHED: 'DISCOUNT_FETCHED',
  FETCH_STATUS_CHANGED: 'DISCOUNT_FETCH_STATUS_CHANGED',
  LIST_FETCHED: 'DISCOUNTS_FETCHED',
  LIST_FETCH_STATUS_CHANGED: 'DISCOUNTS_FETCH_STATUS_CHANGED',
};

export const getDiscountFetchStatusAction = (fetchStatus, id) => ({
  type: DISCOUNT.FETCH_STATUS_CHANGED,
  payload: {
    fetchStatus, id
  }
});

export const getDiscountsListFetchStatusAction = (payload) => ({
  type: DISCOUNT.LIST_FETCH_STATUS_CHANGED,
  payload
});

