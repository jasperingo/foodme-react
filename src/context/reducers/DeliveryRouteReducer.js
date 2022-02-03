import { DELIVERY_ROUTE } from "../actions/deliveryRouteActions";
import deliveryRouteState from "../states/deliveryRouteState";


export default function DeliveryRouteReducer (state, { type, payload }) {
  
  switch (type) {  

    case DELIVERY_ROUTE.UNFETCHED:
      return {
        ...deliveryRouteState,
        deliveryRoutes: state.deliveryRoutes,
        deliveryRoutesPage: state.deliveryRoutesPage,
        deliveryRoutesLoading: state.deliveryRoutesLoading,
        deliveryRoutesNumberOfPages: state.deliveryRoutesNumberOfPages,
        deliveryRoutesFetchStatus: state.deliveryRoutesFetchStatus
      };

    
    case DELIVERY_ROUTE.FETCH_STATUS_CHANGED:
      return {
        ...state,
        deliveryRouteID: payload.id,
        deliveryRouteLoading: payload.loading,
        deliveryRouteFetchStatus: payload.fetchStatus
      };

    case DELIVERY_ROUTE.FETCHED:
      return {
        ...state,
        deliveryRouteLoading: false,
        deliveryRoute: payload.deliveryRoute,
        deliveryRouteID: payload.deliveryRoute.id,
        deliveryRouteFetchStatus: payload.fetchStatus
      };

    default:
      return state;
  }
}

