
export const DELIVERY_ROUTE = {
  FETCHED: 'DELIVERY_ROUTE_FETCHED',
  UNFETCHED: 'DELIVERY_ROUTE_UNFETCHED',
  FETCH_STATUS_CHANGED: 'DELIVERY_ROUTE_FETCH_STATUS_CHANGED',

  LIST_FETCHED: 'DELIVERY_ROUTES_FETCHED',
  LIST_UNFETCHED: 'DELIVERY_ROUTES_UNFETCHED',
  LIST_FETCH_STATUS_CHANGED: 'DELIVERY_ROUTES_FETCH_STATUS_CHANGED',

  BASE_LIST_FETCHED: 'DELIVERY_BASE_ROUTES_FETCHED',
  BASE_LIST_UNFETCHED: 'DELIVERY_BASE_ROUTES_UNFETCHED',
  BASE_LIST_FETCH_STATUS_CHANGED: 'DELIVERY_BASE_ROUTES_FETCH_STATUS_CHANGED',
};

export const getDeliveryRouteFetchStatusAction = (fetchStatus, id, loading) => ({
  type: DELIVERY_ROUTE.FETCH_STATUS_CHANGED,
  payload: {
    fetchStatus, id, loading
  }
});

export const getDeliveryRoutesListFetchStatusAction = (fetchStatus, loading) => ({
  type: DELIVERY_ROUTE.LIST_FETCH_STATUS_CHANGED,
  payload: {
    fetchStatus, loading
  }
});

export const getDeliveryBaseRoutesListFetchStatusAction = (fetchStatus, loading) => ({
  type: DELIVERY_ROUTE.BASE_LIST_FETCH_STATUS_CHANGED,
  payload: {
    fetchStatus, loading
  }
});
