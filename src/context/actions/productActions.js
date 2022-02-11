
export const PRODUCT = {
  FETCHED: 'PRODUCT_FETCHED',
  UNFETCHED: 'PRODUCT_UNFETCHED',
  FETCH_STATUS_CHANGED: 'PRODUCT_FETCH_STATUS_CHANGED',
  
  LIST_FETCHED: 'PRODUCTS_FETCHED',
  LIST_UNFETCHED: 'PRODUCTS_UNFETCHED',
  LIST_FETCH_STATUS_CHANGED: 'PRODUCTS_FETCH_STATUS_CHANGED',

  RELATED_LIST_FETCHED: 'RELATED_PRODUCTS_FETCHED',
  RELATED_LIST_FETCH_STATUS_CHANGED: 'RELATED_PRODUCTS_FETCH_STATUS_CHANGED',

  FAVORITED: 'PRODUCT_FAVORITED',
  UNFAVORITED: 'PRODUCT_UNFAVORITED',

  VARIANT_CREATED: 'PRODUCT_VARIANT_CREATED',
  VARIANT_UPDATED: 'PRODUCT_VARIANT_UPDATED',
  VARIANT_DELETED: 'PRODUCT_VARIANT_DELETED',
  VARIANT_FETCHED: 'PRODUCT_VARIANT_FETCHED',
  VARIANT_UNFETCHED: 'PRODUCT_VARIANT_UNFETCHED',
  VARIANT_FETCH_STATUS_CHANGED: 'PRODUCT_VARIANT_FETCH_STATUS_CHANGED',
};

export const getProductFetchStatusAction = (fetchStatus, id, loading) => ({
  type: PRODUCT.FETCH_STATUS_CHANGED,
  payload: {
    fetchStatus, id, loading
  }
});

export const getProductVariantFetchStatusAction = (fetchStatus, id, loading) => ({
  type: PRODUCT.VARIANT_FETCH_STATUS_CHANGED,
  payload: {
    fetchStatus, id, loading
  }
});

export const getProductsListFetchStatusAction = (fetchStatus, loading) => ({
  type: PRODUCT.LIST_FETCH_STATUS_CHANGED,
  payload: {
    fetchStatus, loading
  }
});

export const getRelatedProductsListFetchStatusAction = (fetchStatus, loading) => ({
  type: PRODUCT.RELATED_LIST_FETCH_STATUS_CHANGED,
  payload: {
    fetchStatus, loading
  }
});

