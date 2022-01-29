import { ORDER } from "../actions/orderActions";
import orderState from "../states/orderState";


export default function OrderReducer (state, action) {
  
  switch (action.type) {
    
    case ORDER.LIST_UNFETCHED:
      return {
        ...state,
        ordersPage: 1,
        ordersNumberOfPages: 0,
        orders: orderState.orders,
        ordersFetchStatus: orderState.ordersFetchStatus,
      };

    case ORDER.LIST_FETCH_STATUS_CHANGED :
      return {
        ...state,
        ordersFetchStatus: action.payload,
      };
    
    case ORDER.LIST_FETCHED :
      return {
        ...state,
        ordersPage: state.ordersPage+1,
        ordersFetchStatus: action.payload.fetchStatus,
        ordersNumberOfPages: action.payload.numberOfPages,
        orders: [...state.orders, ...action.payload.list],
      };

    case ORDER.UNFETCHED:
      return {
        ...state,
        order: orderState.order,
        orderFetchStatus: orderState.orderFetchStatus
      };

    case ORDER.FETCH_STATUS_CHANGED :
      return {
        ...state,
        orderFetchStatus: action.payload
      };
    
    case ORDER.FETCHED :
      return {
        ...state,
        order: action.payload.order, 
        orderFetchStatus: action.payload.fetchStatus,
      };

    // case ORDER.LIST_STATUS_FILTER_CHANGED :
    //   return {
    //     ...state,
    //     orders: {
    //       ...initialOrdersState.orders,
    //       orders: [null],
    //       ordersStatus: action.payload
    //     }
    //   };
  
    default:
      return state;
  }
}

