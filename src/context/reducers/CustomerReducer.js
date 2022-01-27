//import { useListFetchStatus } from "../AppHooks";
//import { initialCustomerState } from "../AppInitialStates";

import { CUSTOMER } from "../actions/customerActions";
import customerState from "../states/customerState";

export default function CustomerReducer (state, action) {

  //const fetchUpdater = useListFetchStatus();
  
  switch (action.type) {

    case CUSTOMER.UNAUTHED:
      return {
        ...state,
        customer: customerState.customer
      };

    case CUSTOMER.AUTHED:
      return {
        ...state,
        customer: {
          customer: action.payload.customer,
          customerToken: action.payload.token,
          customerFetchStatus: action.payload.fetchStatus
        }
      };

    case CUSTOMER.FETCH_STATUS_CHANGED:
      return {
        ...state,
        customer: {
          customer: state.customer.customer,
          customerFetchStatus: action.payload
        }
      };
    
    case CUSTOMER.FETCHED:
      return {
        ...state,
        customer: {
          ...state.customer,
          customer: action.payload.customer, 
          customerFetchStatus: action.payload.fetchStatus,
        }
      };

    
    /*case CUSTOMER.LIST_FETCH_STATUS_CHANGED :
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

    case PRODUCT.LIST_FETCH_STATUS_CHANGED :
      return {
        ...state,
        products: {
          ...state.products,
          productsFetchStatus: action.payload
        }
      };
    
    case PRODUCT.LIST_FETCHED :
      let status2 = fetchUpdater(
        state.products.productsPage,
        action.payload.productsNumberOfPages,
        state.products.products.length,
        action.payload.products.length
      );
      
      const prod = state.products.products.filter(i=> i !== null);

      return {
        ...state,
        products: {
          productsFetchStatus: status2,
          productsPage: state.products.productsPage+1,
          productsNumberOfPages: action.payload.productsNumberOfPages,
          products: [...prod, ...action.payload.products, null],
        }
      };

    case TRANSACTION.LIST_FETCH_STATUS_CHANGED :
      return {
        ...state,
        transactions: {
          ...state.transactions,
          transactionsFetchStatus: action.payload
        }
      };
    
    case TRANSACTION.LIST_FETCHED :
      let status3 = fetchUpdater(
        state.transactions.transactionsPage, 
        action.payload.transactionsNumberOfPages, 
        state.transactions.transactions.length, 
        action.payload.transactions.length
      );
      
      const trans = state.transactions.transactions.filter(i=> i !== null);

      return {
        ...state,
        transactions: {
          transactionsFetchStatus: status3,
          transactionsPage: state.transactions.transactionsPage+1,
          transactionsNumberOfPages: action.payload.transactionsNumberOfPages,
          transactions: [...trans, ...action.payload.transactions, null],
        }
      };*/

    default:
      return state;
  }
}
