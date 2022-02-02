
export const ROUTE = {
  UNFETCH: 'ROUTE_UNFETCH',
  FETCHED: 'ROUTE_FETCHED',
  FETCH_STATUS_CHANGED: 'ROUTE_FETCH_STATUS_CHANGED',
  
  LIST_FETCHED: 'ROUTES_FETCHED',
  LIST_FETCH_STATUS_CHANGED: 'ROUTES_FETCH_STATUS_CHANGED',
};

export const getRouteFetchStatusAction = (fetchStatus, id, loading) => ({
  type: ROUTE.FETCH_STATUS_CHANGED,
  payload: {
    fetchStatus, id, loading
  }
});

export const getRoutesListFetchStatusAction = (fetchStatus, loading) => ({
  type: ROUTE.LIST_FETCH_STATUS_CHANGED,
  payload: {
    fetchStatus, loading
  }
});

