import { ADDRESS, CUSTOMER, FETCH_STATUSES, ORDER } from "../AppActions";
import { useListFetchStatus } from "../AppHooks";
import { initialCustomerState } from "../AppInitialStates";

export default function CustomersReducer (state, action) {

  const fetchUpdater = useListFetchStatus();
  
  switch (action.type) {  
    
    case CUSTOMER.LIST_FETCH_STATUS_CHANGED :
      return {
        ...state,
        customers: {
          ...state.customers,
          customersFetchStatus: action.payload
        }
      };
    
    case CUSTOMER.LIST_FETCHED :
      let status = fetchUpdater(
        state.customers.customersPage, 
        action.payload.customersNumberOfPages, 
        state.customers.customers.length, 
        action.payload.customers.length
      );
      
      const cus = state.customers.customers.filter(i=> i !== null);
      
      return {
        ...state,
        customers: {
          customersFetchStatus: status,
          customersPage: state.customers.customersPage+1,
          customersNumberOfPages: action.payload.customersNumberOfPages,
          customers: [...cus, ...action.payload.customers, null],
        }
      };

    case CUSTOMER.UNFETCH:
      return initialCustomerState;
      
    case CUSTOMER.FETCH_STATUS_CHANGED :
      return {
        ...state,
        customer: {
          customer: state.customer.customer,
          customerFetchStatus: action.payload
        }
      };
    
    case CUSTOMER.FETCHED :
      return {
        ...state,
        customer: {
          customer: action.payload, 
          customerFetchStatus: FETCH_STATUSES.DONE,
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
      let status1 = fetchUpdater(
        state.orders.ordersPage, 
        action.payload.ordersNumberOfPages, 
        state.orders.orders.length, 
        action.payload.orders.length
      );
      
      const ord = state.orders.orders.filter(i=> i !== null);
      
      return {
        ...state,
        orders: {
          ordersFetchStatus: status1,
          ordersPage: state.orders.ordersPage+1,
          ordersStatus: state.orders.ordersStatus,
          ordersNumberOfPages: action.payload.ordersNumberOfPages,
          orders: [...ord, ...action.payload.orders, null],
        }
      };

    case ADDRESS.LIST_FETCH_STATUS_CHANGED: 
      return {
        ...state,
        addresses: {
          ...state.addresses,
          addressesFetchStatus: action.payload
        }
      };

    case ADDRESS.LIST_FETCHED:
      return {
        ...state,
        addresses: {
          addresses: action.payload, 
          addressesFetchStatus: FETCH_STATUSES.DONE,
        }
      };

    default:
      return state;
  }
}
