
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

  DURATION_CREATED: 'DELIVERY_ROUTE_DURATION_CREATED',
  DURATION_UPDATED: 'DELIVERY_ROUTE_DURATION_UPDATED',
  DURATION_DELETED: 'DELIVERY_ROUTE_DURATION_DELETED',
  DURATION_FETCHED: 'DELIVERY_ROUTE_DURATION_FETCHED',
  DURATION_UNFETCHED: 'DELIVERY_ROUTE_DURATION_UNFETCHED',
  DURATION_FETCH_STATUS_CHANGED: 'DELIVERY_ROUTE_DURATION_FETCH_STATUS_CHANGED',

  WEIGHT_CREATED: 'DELIVERY_ROUTE_WEIGHT_CREATED',
  WEIGHT_UPDATED: 'DELIVERY_ROUTE_WEIGHT_UPDATED',
  WEIGHT_DELETED: 'DELIVERY_ROUTE_WEIGHT_DELETED',
  WEIGHT_FETCHED: 'DELIVERY_ROUTE_WEIGHT_FETCHED',
  WEIGHT_UNFETCHED: 'DELIVERY_ROUTE_WEIGHT_UNFETCHED',
  WEIGHT_FETCH_STATUS_CHANGED: 'DELIVERY_ROUTE_WEIGHT_FETCH_STATUS_CHANGED',
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

export const getDeliveryRouteDurationFetchStatusAction = (fetchStatus, id, loading) => ({
  type: DELIVERY_ROUTE.DURATION_FETCH_STATUS_CHANGED,
  payload: {
    fetchStatus, id, loading
  }
});

export const getDeliveryRouteWeightFetchStatusAction = (fetchStatus, id, loading) => ({
  type: DELIVERY_ROUTE.WEIGHT_FETCH_STATUS_CHANGED,
  payload: {
    fetchStatus, id, loading
  }
});
