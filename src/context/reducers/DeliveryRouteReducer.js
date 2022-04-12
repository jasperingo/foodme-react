import { DELIVERY_ROUTE } from "../actions/deliveryRouteActions";
import deliveryRouteState from "../states/deliveryRouteState";

export default function DeliveryRouteReducer (state, { type, payload }) {
  
  switch (type) {  

    case DELIVERY_ROUTE.UNFETCHED:
      return {
        ...state,
        deliveryRoute: deliveryRouteState.deliveryRoute,
        deliveryRouteID: deliveryRouteState.deliveryRouteID,
        deliveryRouteLoading: deliveryRouteState.deliveryRouteLoading,
        deliveryRouteError: deliveryRouteState.deliveryRouteError
      };

    case DELIVERY_ROUTE.FETCHING:
      return {
        ...state,
        deliveryRouteError: null,
        deliveryRouteLoading: true
      };

    case DELIVERY_ROUTE.ERROR_CHANGED:
      return {
        ...state,
        deliveryRouteLoading: false,
        deliveryRouteID: payload.id,
        deliveryRouteError: payload.error
      };

    case DELIVERY_ROUTE.FETCHED:
      return {
        ...state,
        deliveryRouteLoading: false,
        deliveryRouteID: payload.id,
        deliveryRoute: payload.deliveryRoute
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

    case DELIVERY_ROUTE.DURATION_DELETED:
      if (!state.deliveryRoute) {
        return state;
      } else {
        return {
          ...state,
          deliveryRoute: { 
            ...state.deliveryRoute, 
            delivery_route_durations: [...state.deliveryRoute.delivery_route_durations.filter(i=> i.id !== payload)] 
          } 
        };
      }


    case DELIVERY_ROUTE.WEIGHT_UNFETCHED:
      return {
        ...state,
        deliveryWeight: deliveryRouteState.deliveryWeight,
        deliveryWeightID: deliveryRouteState.deliveryWeightID,
        deliveryWeightLoading: deliveryRouteState.deliveryWeightLoading,
        deliveryWeightFetchStatus: deliveryRouteState.deliveryWeightFetchStatus
      };

    case DELIVERY_ROUTE.WEIGHT_FETCH_STATUS_CHANGED:
      return {
        ...state,
        deliveryWeightID: payload.id,
        deliveryWeightLoading: payload.loading,
        deliveryWeightFetchStatus: payload.fetchStatus
      };

    case DELIVERY_ROUTE.WEIGHT_FETCHED:
      return {
        ...state,
        deliveryWeightLoading: false,
        deliveryWeight: payload.deliveryWeight,
        deliveryWeightID: String(payload.deliveryWeight.id),
        deliveryWeightFetchStatus: payload.fetchStatus
      };

    case DELIVERY_ROUTE.WEIGHT_CREATED: 
      if (!state.deliveryRoute) {
        return state;
      } else {
        return {
          ...state,
          deliveryRoute: {
            ...state.deliveryRoute,
            delivery_route_weights: [...state.deliveryRoute.delivery_route_weights, payload]
          }
        };
      }
    
    case DELIVERY_ROUTE.WEIGHT_UPDATED:
      if (!state.deliveryRoute) {
        return state;
      } else {
        return {
          ...state,
          deliveryRoute: { 
            ...state.deliveryRoute, 
            delivery_route_weights: [...state.deliveryRoute.delivery_route_weights.map(i=> 
              (i.id === payload.id) ? payload : i
            )] 
          } 
        };
      }

    case DELIVERY_ROUTE.WEIGHT_DELETED:
      if (!state.deliveryRoute) {
        return state;
      } else {
        return {
          ...state,
          deliveryRoute: { 
            ...state.deliveryRoute, 
            delivery_route_weights: [...state.deliveryRoute.delivery_route_weights.filter(i=> i.id !== payload)] 
          } 
        };
      }

    default:
      return state;
  }
}

