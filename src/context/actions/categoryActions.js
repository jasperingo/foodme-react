
export const CATEGORY = {
  UNFETCHED: 'CATEGORY_UNFETCHED',
  FETCHED: 'CATEGORY_FETCHED',
  FETCHING: 'CATEGORY_FETCHING',
  ERROR_CHANGED: 'CATEGORY_ERROR_CHANGED',

  LIST_FETCHED: 'CATEGORIES_FETCHED',
  LIST_FETCHING: 'CATEGORIES_FETCHING',
  LIST_ERROR_CHANGED: 'CATEGORIES_ERROR_CHANGED',

  STORES_LIST_FETCHED: 'STORE_CATEGORIES_FETCHED',
  STORES_LIST_FETCHING: 'STORES_CATEGORIES_FETCHING',
  STORES_LIST_ERROR_CHANGED: 'STORES_CATEGORIES_ERROR_CHANGED',

  PRODUCTS_LIST_FETCHED: 'PRODUCT_CATEGORIES_FETCHED',
  PRODUCTS_LIST_FETCHING: 'PRODUCT_CATEGORIES_FETCHING',
  PRODUCTS_LIST_ERROR_CHANGED: 'PRODUCT_CATEGORIES_FETCH_FAILED',
};

export const getCategoryFetchStatusAction = (fetchStatus, id) => ({
  type: CATEGORY.FETCH_STATUS_CHANGED,
  payload: {
    fetchStatus, id
  }
});

export const getSubCategoryFetchStatusAction = (fetchStatus, id) => ({
  type: CATEGORY.SUB_FETCH_STATUS_CHANGED,
  payload: {
    fetchStatus, id
  }
});

export const getCategoriesListFetchStatusAction = (payload) => ({
  type: CATEGORY.LIST_FETCH_STATUS_CHANGED,
  payload
});

export const getStoreCategoriesListFetchStatusAction = (payload) => ({
  type: CATEGORY.STORES_LIST_FETCH_STATUS_CHANGED,
  payload
});

export const getProductCategoriesListFetchStatusAction = (payload) => ({
  type: CATEGORY.PRODUCTS_LIST_FETCH_STATUS_CHANGED,
  payload
});

