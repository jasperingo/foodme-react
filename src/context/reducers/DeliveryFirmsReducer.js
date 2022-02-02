import { DELIVERY_FIRM } from "../actions/deliveryFirmActions";
import { ROUTE } from "../actions/routeActions";
import deliveryFirmState from "../states/deliveryFirmState";


export default function DeliveryFirmsReducer(state, { type, payload }) {
  
  switch (type) {  
    
    // case DELIVERY_FIRM.LIST_FETCH_STATUS_CHANGED :
    //   return {
    //     ...state,
    //     deliveryFirms: {
    //       ...state.deliveryFirms,
    //       deliveryFirmsFetchStatus: action.payload
    //     }
    //   };
    
    // case DELIVERY_FIRM.LIST_FETCHED :
    //   return {
    //     ...state,
    //     deliveryFirms: {
    //       deliveryFirmsFetchStatus: status,
    //       deliveryFirmsPage: state.deliveryFirms.deliveryFirmsPage+1,
    //       deliveryFirmsNumberOfPages: action.payload.deliveryFirmsNumberOfPages,
    //       deliveryFirms: [...delv, ...action.payload.deliveryFirms, null],
    //     }
    //   };

    case DELIVERY_FIRM.UNFETCHED:
      return {
        ...deliveryFirmState,
        deliveryFirms: state.deliveryFirms,
        deliveryFirmsPage: state.deliveryFirmsPage,
        deliveryFirmsLoading: state.deliveryFirmsLoading,
        deliveryFirmsNumberOfPages: state.deliveryFirmsNumberOfPages,
        deliveryFirmsFetchStatus: state.deliveryFirmsFetchStatus
      }
      
    case DELIVERY_FIRM.FETCH_STATUS_CHANGED:
      return {
        ...state,
        deliveryFirmID: payload.id,
        deliveryFirmLoading: payload.loading,
        deliveryFirmFetchStatus: payload.fetchStatus
      };
    
    case DELIVERY_FIRM.FETCHED:
      return {
        ...state,
        deliveryFirmLoading: false, 
        deliveryFirm: payload.deliveryFirm, 
        deliveryFirmID: payload.deliveryFirm.id,
        deliveryFirmFetchStatus: payload.fetchStatus
      };

    
    case ROUTE.LIST_FETCH_STATUS_CHANGED :
      return {
        ...state,
        routesLoading: payload.loading,
        routesFetchStatus: payload.fetchStatus
      };
    
    case ROUTE.LIST_FETCHED:
      return {
        ...state,
        routesLoading: false,
        routesPage: state.routesPage+1,
        routesFetchStatus: payload.fetchStatus,
        routesNumberOfPages: payload.numberOfPages,
        routes: [...state.routes, ...payload.list],
      };

    
    default:
      return state;
  }
}

