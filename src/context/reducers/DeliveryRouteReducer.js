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


    case DELIVERY_ROUTE.LOCATION_UNFETCHED:
      return {
        ...state,
        deliveryLocation: deliveryRouteState.deliveryLocation,
        deliveryLocationID: deliveryRouteState.deliveryLocationID,
        deliveryLocationError: deliveryRouteState.deliveryLocationError,
        deliveryLocationLoading: deliveryRouteState.deliveryLocationLoading,
      };

    case DELIVERY_ROUTE.LOCATION_FETCHING:
      return {
        ...state,
        deliveryLocationError: null,
        deliveryLocationLoading: true,
      };

    case DELIVERY_ROUTE.LOCATION_ERROR_CHANGED:
      return {
        ...state,
        deliveryLocationLoading: false,
        deliveryLocationID: payload.id,
        deliveryLocationError: payload.error
      };

    case DELIVERY_ROUTE.LOCATION_FETCHED:
      return {
        ...state,
        deliveryLocationLoading: false,
        deliveryLocationID: payload.id,
        deliveryLocation: payload.deliveryLocation,
      };
      

    case DELIVERY_ROUTE.LOCATION_CREATED: 
      if (!state.deliveryRoute) {
        return state;
      } else {
        return {
          ...state,
          deliveryRoute: {
            ...state.deliveryRoute,
            delivery_route_locations: [payload.deliveryLocation, ...state.deliveryRoute.delivery_route_locations]
          }
        };
      }
    
    case DELIVERY_ROUTE.LOCATION_UPDATED:
      if (!state.deliveryRoute) {
        return state;
      } else {
        return {
          ...state,
          deliveryRoute: { 
            ...state.deliveryRoute, 
            delivery_route_locations: state.deliveryRoute.delivery_route_locations.map(i=> (i.id === payload.deliveryLocation.id) ? payload.deliveryLocation : i)
          } 
        };
      }

    case DELIVERY_ROUTE.LOCATION_DELETED:
      if (!state.deliveryRoute) {
        return state;
      } else {
        return {
          ...state,
          deliveryRoute: { 
            ...state.deliveryRoute, 
            delivery_route_locations: state.deliveryRoute.delivery_route_locations.filter(i=> i.id !== payload.id)
          } 
        };
      }


    case DELIVERY_ROUTE.WEIGHT_UNFETCHED:
      return {
        ...state,
        deliveryWeight: deliveryRouteState.deliveryWeight,
        deliveryWeightID: deliveryRouteState.deliveryWeightID,
        deliveryWeightError: deliveryRouteState.deliveryWeightError,
        deliveryWeightLoading: deliveryRouteState.deliveryWeightLoading,
      };

    case DELIVERY_ROUTE.WEIGHT_FETCHING:
      return {
        ...state,
        deliveryWeightError: null,
        deliveryWeightLoading: true,
      };

    case DELIVERY_ROUTE.WEIGHT_ERROR_CHANGED:
      return {
        ...state,
        deliveryWeightID: payload.id,
        deliveryWeightLoading: false,
        deliveryWeightError: payload.error
      };

    case DELIVERY_ROUTE.WEIGHT_FETCHED:
      return {
        ...state,
        deliveryWeightLoading: false,
        deliveryWeightID: payload.id,
        deliveryWeight: payload.deliveryWeight
      };


    case DELIVERY_ROUTE.WEIGHT_CREATED: 
      if (!state.deliveryRoute) {
        return state;
      } else {
        return {
          ...state,
          deliveryRoute: {
            ...state.deliveryRoute,
            delivery_route_weights: [payload.deliveryWeight, ...state.deliveryRoute.delivery_route_weights]
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
            delivery_route_weights: state.deliveryRoute.delivery_route_weights.map(i=> (i.id === payload.deliveryWeight.id) ? payload.deliveryWeight : i)
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
            delivery_route_weights: state.deliveryRoute.delivery_route_weights.filter(i=> i.id !== payload.id)
          } 
        };
      }

    default:
      return state;
  }
}
