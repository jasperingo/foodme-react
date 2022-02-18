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


    case DELIVERY_ROUTE.DURATION_UNFETCHED:
      return {
        ...state,
        deliveryDuration: deliveryRouteState.deliveryDuration,
        deliveryDurationID: deliveryRouteState.deliveryDurationID,
        deliveryDurationLoading: deliveryRouteState.deliveryDurationLoading,
        deliveryDurationFetchStatus: deliveryRouteState.deliveryDurationFetchStatus
      };

    case DELIVERY_ROUTE.DURATION_FETCH_STATUS_CHANGED:
      return {
        ...state,
        deliveryDurationID: payload.id,
        deliveryDurationLoading: payload.loading,
        deliveryDurationFetchStatus: payload.fetchStatus
      };

    case DELIVERY_ROUTE.DURATION_FETCHED:
      return {
        ...state,
        deliveryDurationLoading: false,
        deliveryDuration: payload.deliveryDuration,
        deliveryDurationID: String(payload.deliveryDuration.id),
        deliveryDurationFetchStatus: payload.fetchStatus
      };

    case DELIVERY_ROUTE.DURATION_CREATED: 
      if (!state.deliveryRoute) {
        return state;
      } else {
        return {
          ...state,
          deliveryRoute: {
            ...state.deliveryRoute,
            delivery_route_durations: [...state.deliveryRoute.delivery_route_durations, payload]
          }
        };
      }
    
    case DELIVERY_ROUTE.DURATION_UPDATED:
      if (!state.deliveryRoute) {
        return state;
      } else {
        return {
          ...state,
          deliveryRoute: { 
            ...state.deliveryRoute, 
            delivery_route_durations: [...state.deliveryRoute.delivery_route_durations.map(i=> 
              (i.id === payload.id) ? payload : i
            )] 
          } 
        };
      }

    default:
      return state;
  }
}

