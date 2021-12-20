
import { CUSTOMER, DELIVERY_FIRM, FETCH_STATUSES, ORDER, STATISTICS, STORE } from "../AppActions";

export default function DashboardReducer (state, action) {
  
  switch (action.type) {  
    
    case STATISTICS.FETCH_STATUS_CHANGED :
      return {
        ...state,
        statistics: {
          ...state.statistics,
          statisticsFetchStatus: action.payload
        }
      };
    
    case STATISTICS.FETCHED :
      return {
        ...state,
        statistics: {
          statistics: action.payload, 
          statisticsFetchStatus: FETCH_STATUSES.DONE,
        }
      };
    
    case ORDER.LIST_FETCH_STATUS_CHANGED :
      return {
        ...state,
        orders: {
          ...state.orders,
          ordersFetchStatus: action.payload,
        }
      };
      
    case ORDER.LIST_FETCHED: 
      return {
        ...state,
        orders: {
          ordersFetchStatus: FETCH_STATUSES.DONE,
          orders: [...action.payload.orders],
        }
      };
    
    case CUSTOMER.LIST_FETCH_STATUS_CHANGED :
      return {
        ...state,
        customers: {
          ...state.customers,
          customersFetchStatus: action.payload
        }
      };
    
    case CUSTOMER.LIST_FETCHED :
      return {
        ...state,
        customers: {
          customersFetchStatus: FETCH_STATUSES.DONE,
          customers: [...action.payload.customers],
        }
      };
    
    case STORE.LIST_FETCH_STATUS_CHANGED :
      return {
        ...state,
        stores: {
          ...state.stores,
          storesFetchStatus: action.payload
        }
      };
    
    case STORE.LIST_FETCHED :
      return {
        ...state,
        stores: {
          storesFetchStatus: FETCH_STATUSES.DONE,
          stores: [...action.payload.stores],
        }
      };

    case DELIVERY_FIRM.LIST_FETCH_STATUS_CHANGED :
      return {
        ...state,
        deliveryFirms: {
          ...state.deliveryFirms,
          deliveryFirmsFetchStatus: action.payload
        }
      };
    
    case DELIVERY_FIRM.LIST_FETCHED :
      return {
        ...state,
        deliveryFirms: {
          deliveryFirmsFetchStatus: FETCH_STATUSES.DONE,
          deliveryFirms: [...action.payload.deliveryFirms],
        }
      };

    default:
      return state;
  }
}



