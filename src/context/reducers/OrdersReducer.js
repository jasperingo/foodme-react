
import { ORDER } from "../AppActions";
import { useListFetchStatus } from "../AppHooks";

export default function OrdersReducer (state, action) {

  const fetchUpdater = useListFetchStatus();
  
  switch (action.type) {  
    
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
      
      state.orders.orders.pop();

      return {
        ...state,
        orders: {
          ordersFetchStatus: status,
          ordersPage: state.orders.ordersPage+1,
          ordersNumberOfPages: action.payload.ordersNumberOfPages,
          orders: [...state.orders.orders, ...action.payload.orders, null],
        }
      };
    

    default:
      return state;
  }
}

