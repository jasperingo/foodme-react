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
  deliveryRouteFetchStatus: FETCH_STATUSES.LOADING,

  deliveryDuration: null,
  deliveryDurationID: null,
  deliveryDurationLoading: true,
  deliveryDurationFetchStatus: FETCH_STATUSES.LOADING,

  deliveryWeight: null,
  deliveryWeightID: null,
  deliveryWeightLoading: true,
  deliveryWeightFetchStatus: FETCH_STATUSES.LOADING
  
};

export default deliveryRouteState;
