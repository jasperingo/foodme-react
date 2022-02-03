import { FETCH_STATUSES } from "../../repositories/Fetch";

const deliveryRouteState = {
  
  deliveryRoutes: [],
  deliveryRoutesPage: 1,
  deliveryRoutesLoading: true,
  deliveryRoutesNumberOfPages: 0,
  deliveryRoutesFetchStatus: FETCH_STATUSES.LOADING,

  deliveryRoute: null,
  deliveryRouteID: null,
  deliveryRouteLoading: true,
  deliveryRouteFetchStatus: FETCH_STATUSES.LOADING
  
};

export default deliveryRouteState;
