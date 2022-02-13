
export const DISCOUNT = {
  FETCHED: 'DISCOUNT_FETCHED',
  UNFETCHED: 'DISCOUNT_UNFETCHED',
  FETCH_STATUS_CHANGED: 'DISCOUNT_FETCH_STATUS_CHANGED',

  LIST_FETCHED: 'DISCOUNTS_FETCHED',
  LIST_UNFETCHED: 'DISCOUNTS_UNFETCHED',
  LIST_FETCH_STATUS_CHANGED: 'DISCOUNTS_FETCH_STATUS_CHANGED',

  PRODUCT_CREATED: 'DISCOUNT_PRODUCT_CREATED',
  PRODUCT_DELETED: 'DISCOUNT_PRODUCT_DELETED',
  PRODUCT_LIST_FETCHED: 'DISCOUNT_PRODUCTS_FETCHED',
  PRODUCT_LIST_UNFETCHED: 'DISCOUNT_PRODUCTS_UNFETCHED',
  PRODUCT_LIST_FETCH_STATUS_CHANGED: 'DISCOUNT_PRODUCTS_FETCH_STATUS_CHANGED',
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

export const getDiscountProductsListFetchStatusAction = (fetchStatus, loading) => ({
  type: DISCOUNT.PRODUCT_LIST_FETCH_STATUS_CHANGED,
  payload: {
    fetchStatus, loading
  }
});

