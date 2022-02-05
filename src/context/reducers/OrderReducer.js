import { ORDER } from "../actions/orderActions";
import orderState from "../states/orderState";


export default function OrderReducer (state, action) {
  
  switch (action.type) {
    
    case ORDER.LIST_UNFETCHED:
      return {
        ...state,
        ordersPage: 1,
        ordersLoading: true,
        ordersNumberOfPages: 0,
        orders: orderState.orders,
        ordersFetchStatus: orderState.ordersFetchStatus,
      };

    case ORDER.LIST_FETCH_STATUS_CHANGED:
      return {
        ...state,
        ordersLoading: action.payload.loading,
        ordersFetchStatus: action.payload.fetchStatus,
      };
    
    case ORDER.LIST_FETCHED:
      return {
        ...state,
        ordersLoading: false,
        ordersPage: state.ordersPage+1,
        ordersFetchStatus: action.payload.fetchStatus,
        ordersNumberOfPages: action.payload.numberOfPages,
        orders: [...state.orders, ...action.payload.list],
      };

    case ORDER.UNFETCHED:
      return {
        ...state,
        orderLoading: true,
        order: orderState.order,
        orderID: orderState.orderID,
        orderFetchStatus: orderState.orderFetchStatus
      };

    case ORDER.FETCH_STATUS_CHANGED:
      return {
        ...state,
        orderID: action.payload.id,
        orderLoading: action.payload.loading,
        orderFetchStatus: action.payload.fetchStatus
      };
    
    case ORDER.FETCHED:
      return {
        ...state,
        orderLoading: false,
        order: action.payload.order, 
        orderID: action.payload.order.id, 
        orderFetchStatus: action.payload.fetchStatus,
      };

    case ORDER.LIST_STATUS_FILTER_CHANGED:
      return {
        ...state,
        ordersPage: 1,
        ordersLoading: true,
        ordersNumberOfPages: 0,
        orders: orderState.orders,
        ordersFetchStatus: orderState.ordersFetchStatus,
        orderStatus: action.payload.status
      };
  
    default:
      return state;
  }
}

