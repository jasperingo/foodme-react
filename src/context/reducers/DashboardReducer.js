import { CUSTOMER } from "../actions/customerActions";
import { DELIVERY_FIRM } from "../actions/deliveryFirmActions";
import { ORDER } from "../actions/orderActions";
import { STORE } from "../actions/storeActions";


export default function DashboardReducer (state, { type, payload }) {
  
  switch (type) {  
    
    // case STATISTICS.FETCH_STATUS_CHANGED :
    //   return {
    //     ...state,
    //     statistics: {
    //       ...state.statistics,
    //       statisticsFetchStatus: action.payload
    //     }
    //   };
    
    // case STATISTICS.FETCHED :
    //   return {
    //     ...state,
    //     statistics: {
    //       statistics: action.payload, 
    //       statisticsFetchStatus: FETCH_STATUSES.DONE,
    //     }
    //   };
    
    
    case ORDER.LIST_FETCH_STATUS_CHANGED:
      return {
        ...state,
        ordersLoading: payload.loading,
        ordersFetchStatus: payload.fetchStatus,
      };
      
    case ORDER.LIST_FETCHED: 
      return {
        ...state,
        ordersLoading: false,
        orders: payload.list,
        ordersFetchStatus: payload.fetchStatus,
      };
    

    case CUSTOMER.LIST_FETCH_STATUS_CHANGED:
      return {
        ...state,
        customersLoading: payload.loading,
        customersFetchStatus: payload.fetchStatus
      };
    
    case CUSTOMER.LIST_FETCHED:
      return {
        ...state,
        customersLoading: false,
        customers: payload.list,
        customersFetchStatus: payload.fetchStatus,
      };
    

    case STORE.LIST_FETCH_STATUS_CHANGED:
      return {
        ...state,
        storesLoading: payload.loading,
        storesFetchStatus: payload.fetchStatus
      };
    
    case STORE.LIST_FETCHED:
      return {
        ...state,
        storesLoading: false,
        stores: payload.list,
        storesFetchStatus: payload.fetchStatus,
      };


    case DELIVERY_FIRM.LIST_FETCH_STATUS_CHANGED:
      return {
        ...state,
        deliveryFirmsLoading: payload.loading,
        deliveryFirmsFetchStatus: payload.fetchStatus
      };
    
    case DELIVERY_FIRM.LIST_FETCHED:
      return {
        ...state,
        deliveryFirmsLoading: false,
        deliveryFirms: payload.list,
        deliveryFirmsFetchStatus: payload.fetchStatus,
      };


    default:
      return state;
  }
}



