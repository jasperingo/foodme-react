import { CUSTOMER } from "../actions/customerActions";
import { DELIVERY_FIRM } from "../actions/deliveryFirmActions";
import { ORDER } from "../actions/orderActions";
import { STATISTICS } from "../actions/statisticsActions";
import { STORE } from "../actions/storeActions";
import dashboardState from "../states/dashboardState";

export default function DashboardReducer (state, { type, payload }) {
  
  switch (type) {  
    
    case STATISTICS.UNFETCHED:
      return {
        ...state,
        statistics: dashboardState.statistics,
        statisticsError: dashboardState.statisticsError,
        statisticsLoading: dashboardState.statisticsLoading
      };

    case STATISTICS.FETCHING:
      return {
        ...state,
        statisticsError: null,
        statisticsLoading: true
      };

    case STATISTICS.ERROR_CHANGED:
      return {
        ...state,
        statisticsLoading: false,
        statisticsError: payload.error
      };
    
    case STATISTICS.FETCHED:
      return {
        ...state,
        statisticsLoading: false,
        statistics: payload.statistics
      };
    
    
    case ORDER.LIST_UNFETCHED:
      return {
        ...state,
        orders: dashboardState.orders,
        ordersError: dashboardState.ordersError,
        ordersLoaded: dashboardState.ordersLoaded,
        ordersLoading: dashboardState.ordersLoading
      };
    
    case ORDER.LIST_ERROR_CHANGED:
      return {
        ...state,
        ordersLoading: false,
        ordersError: payload.error
      };
    
    case ORDER.LIST_FETCHING:
      return {
        ...state,
        ordersError: null,
        ordersLoading: true
      };
      
    case ORDER.LIST_FETCHED:
      return {
        ...state,
        ordersLoaded: true,
        ordersLoading: false,
        orders: payload.list,
      };
  

    case CUSTOMER.LIST_UNFETCHED:
      return {
        ...state,
        customers: dashboardState.customers,
        customersError: dashboardState.customersError,
        customersLoaded: dashboardState.customersLoaded,
        customersLoading: dashboardState.customersLoading
      };
    
    case CUSTOMER.LIST_FETCHING:
      return {
        ...state,
        customersError: null,
        customersLoading: true
      };

    case CUSTOMER.LIST_ERROR_CHANGED:
      return {
        ...state,
        customersLoading: false,
        customersError: payload.error
      };
      
    case CUSTOMER.LIST_FETCHED:
      return {
        ...state,
        customersLoaded: true,
        customersLoading: false,
        customers: payload.list
      };
      

    case STORE.LIST_UNFETCHED:
      return {
        ...state,
        stores: dashboardState.stores,
        storesError: dashboardState.storesError,
        storesLoaded: dashboardState.storesLoaded,
        storesLoading: dashboardState.storesLoading
      };

    case STORE.LIST_FETCHING:
      return {
        ...state,
        storesError: null,
        storesLoading: true,
      };

    case STORE.LIST_ERROR_CHANGED:
      return {
        ...state,
        storesLoading: false,
        storesError: payload.error
      };
    
    case STORE.LIST_FETCHED:
      return {
        ...state,
        storesLoaded: true,
        storesLoading: false,
        stores: payload.list,
      };


    case DELIVERY_FIRM.LIST_UNFETCHED:
      return {
        ...state,
        deliveryFirms: dashboardState.deliveryFirms,
        deliveryFirmsError: dashboardState.deliveryFirmsError,
        deliveryFirmsLoaded: dashboardState.deliveryFirmsLoaded,
        deliveryFirmsLoading: dashboardState.deliveryFirmsLoading
      };

    case DELIVERY_FIRM.LIST_FETCHING:
      return {
        ...state,
        deliveryFirmsError: null,
        deliveryFirmsLoading: true
      };

    case DELIVERY_FIRM.LIST_ERROR_CHANGED:
      return {
        ...state,
        deliveryFirmsLoading: false,
        deliveryFirmsError: payload.error
      };
    
    case DELIVERY_FIRM.LIST_FETCHED:
      return {
        ...state,
        deliveryFirmsLoaded: true,
        deliveryFirmsLoading: false,
        deliveryFirms: payload.list,
      };


    default:
      return state;
  }
}
