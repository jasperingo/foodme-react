
import { FETCH_STATUSES, ORDER } from "../AppActions";
import { useListFetchStatus } from "../AppHooks";
import { initialOrdersState } from "../AppInitialStates";

export default function OrdersReducer (state, action) {

  const fetchUpdater = useListFetchStatus();
  
  switch (action.type) {
    
    case ORDER.UNFETCH:
      return initialOrdersState;

    case ORDER.LIST_STATUS_FILTER_CHANGED :
      return {
        ...state,
        orders: {
          ...initialOrdersState.orders,
          orders: [null],
          ordersStatus: action.payload
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
    
    case ORDER.LIST_FETCHED :
      let status = fetchUpdater(
        state.orders.ordersPage, 
        action.payload.ordersNumberOfPages, 
        state.orders.orders.length, 
        action.payload.orders.length
      );
      
      const ord = state.orders.orders.filter(i=> i !== null);
      
      return {
        ...state,
        orders: {
          ordersFetchStatus: status,
          ordersPage: state.orders.ordersPage+1,
          ordersStatus: state.orders.ordersStatus,
          ordersNumberOfPages: action.payload.ordersNumberOfPages,
          orders: [...ord, ...action.payload.orders, null],
        }
      };

    case ORDER.FETCH_STATUS_CHANGED :
      return {
        ...state,
        order: {
          order: state.order.order,
          orderFetchStatus: action.payload
        }
      };
    
    case ORDER.FETCHED :
      return {
        ...state,
        order: {
          order: action.payload, 
          orderFetchStatus: FETCH_STATUSES.DONE,
        }
      };
    

    default:
      return state;
  }
}

