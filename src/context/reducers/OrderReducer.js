import { ORDER } from "../actions/orderActions";
import orderState from "../states/orderState";

export default function OrderReducer (state, action) {
  
  switch (action.type) {
    
    case ORDER.LIST_UNFETCHED:
      return {
        ...state,
        orders: orderState.orders,
        ordersPage: orderState.ordersPage,
        ordersError: orderState.ordersError,
        ordersLoaded: orderState.ordersLoaded,
        ordersLoading: orderState.ordersLoading,
        ordersNumberOfPages: orderState.ordersNumberOfPages
      };
    
    case ORDER.LIST_ERROR_CHANGED:
      return {
        ...state,
        ordersLoading: false,
        ordersError: action.payload.error
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
        ordersPage: state.ordersPage + 1,
        ordersNumberOfPages: action.payload.numberOfPages,
        orders: [...state.orders, ...action.payload.list],
      };


    case ORDER.UNFETCHED:
      return {
        ...state,
        order: orderState.order,
        orderID: orderState.orderID,
        orderError: orderState.orderError,
        orderLoading: orderState.orderLoading
      };

    case ORDER.FETCHING:
      return {
        ...state,
        orderError: null,
        orderLoading: true
      };
    
    case ORDER.ERROR_CHANGED:
      return {
        ...state,
        orderLoading: false,
        orderID: action.payload.id, 
        orderError: action.payload.error
      };

    case ORDER.FETCHED:
      return {
        ...state,
        orderLoading: false,
        orderID: action.payload.id,
        order: action.payload.order 
      };
    
    case ORDER.UPDATED:
      return {
        ...state,
        order: {
          ...state.order,
          ...action.payload.order,
          order_items: state.order.order_items
        }
      };

    case ORDER.ITEM_UPDATED:
      return {
        ...state,
        order: {
          ...state.order,
          status: action.payload.orderItem.order.status,
          order_items: state.order.order_items.map(i=> {
            if (i.id === action.payload.orderItem.id) {
              delete action.payload.orderItem.order;
              return action.payload.orderItem;
            } else {
              return i;
            }
          })
        }
      };

    default:
      return state;
  }
}
