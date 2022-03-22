
import { ADDRESS } from "../actions/addressActions";
import { CUSTOMER } from "../actions/customerActions";
import { ORDER } from "../actions/orderActions";
import { PRODUCT } from "../actions/productActions";
import { TRANSACTION } from "../actions/transactionActions";
import customerState from "../states/customerState";

export default function CustomerReducer (state, action) {
  
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

    case CUSTOMER.UNFETCHED: 
      return {
        ...customerState,
        customers: {
          customers: state.customers,
          customersPage: state.customersPage,
          customersLoading: state.customersLoading,
          customersNumberOfPages: state.customersNumberOfPages,
          customersFetchStatus: state.customersFetchStatus
        }
      };

    case CUSTOMER.FETCH_STATUS_CHANGED:
      return {
        ...state,
        customer: {
          customerID: action.payload.id,
          customerLoading: action.payload.loading,
          customerFetchStatus: action.payload.fetchStatus
        }
      };
    
    case CUSTOMER.FETCHED:
      return {
        ...state,
        customer: {
          ...state.customer,
          customerLoading: false, 
          customer: action.payload.customer,
          customerID: action.payload.customer.id,
          customerFetchStatus: action.payload.fetchStatus,
        }
      };

    case CUSTOMER.LIST_UNFETCHED:
      return {
        ...state,
        customers: customerState.customers
      };
    
    case CUSTOMER.LIST_FETCH_STATUS_CHANGED:
      return {
        ...state,
        customers: {
          ...state.customers,
          customersLoading: action.payload.loading,
          customersFetchStatus: action.payload.fetchStatus
        }
      };
    
    case CUSTOMER.LIST_FETCHED:
      return {
        ...state,
        customers: {
          customersLoading: false,
          customersPage: state.customers.customersPage+1,
          customersFetchStatus: action.payload.fetchStatus,
          customersNumberOfPages: action.payload.numberOfPages,
          customers: [...state.customers.customers, ...action.payload.list],
        }
      };
    
    case ORDER.LIST_UNFETCHED:
      return {
        ...state,
        orders: customerState.orders
      };
      
    case ORDER.LIST_FETCH_STATUS_CHANGED:
      return {
        ...state,
        orders: {
          ...state.orders,
          ordersLoading: action.payload.loading,
          ordersFetchStatus: action.payload.fetchStatus,
        }
      };
      
    case ORDER.LIST_FETCHED:
      return {
        ...state,
        orders: {
          ordersLoading: false,
          ordersPage: state.orders.ordersPage+1,
          ordersFetchStatus: action.payload.fetchStatus,
          ordersNumberOfPages: action.payload.numberOfPages,
          orders: [...state.orders.orders, ...action.payload.list],
        }
      };
    
  
    case PRODUCT.LIST_FETCH_STATUS_CHANGED:
      return {
        ...state,
        products: {
          ...state.products,
          productsLoading: action.payload.loading,
          productsFetchStatus: action.payload.fetchStatus
        }
      };
    
    case PRODUCT.LIST_FETCHED:
      return {
        ...state,
        products: {
          productsLoading: false,
          productsPage: state.products.productsPage+1,
          productsFetchStatus: action.payload.fetchStatus,
          productsNumberOfPages: action.payload.numberOfPages,
          products: [...state.products.products, ...action.payload.list],
        }
      };

    case TRANSACTION.LIST_UNFETCHED:
      return {
        ...state,
        transactions: customerState.transactions
      };

    case TRANSACTION.LIST_FETCH_STATUS_CHANGED:
      return {
        ...state,
        transactions: {
          ...state.transactions,
          transactionsLoading: action.payload.loading,
          transactionsFetchStatus: action.payload.fetchStatus
        }
      };
    
    case TRANSACTION.LIST_FETCHED:
      return {
        ...state,
        transactions: {
          transactionsLoading: false,
          transactionsPage: state.transactions.transactionsPage+1,
          transactionsFetchStatus: action.payload.fetchStatus,
          transactionsNumberOfPages: action.payload.numberOfPages,
          transactions: [...state.transactions.transactions, ...action.payload.list],
        }
      };

    case ADDRESS.LIST_UNFETCHED:
      return {
        ...state,
        addresses: customerState.addresses
      };
    
    case ADDRESS.LIST_ERROR_CHANGED:
      return {
        ...state,
        addresses: {
          ...state.addresses,
          addressesLoading: false,
          addressesError: action.payload.error
        }
      };
    
    case ADDRESS.LIST_FETCHING:
      return {
        ...state,
        addresses: {
          ...state.addresses,
          addressesLoading: true
        }
      };

    case ADDRESS.LIST_FETCHED:
      return {
        ...state,
        addresses: {
          ...state.addresses,
          addressesLoaded: true,
          addressesLoading: false, 
          addresses: action.payload.list, 
        }
      };


    default:
      return state;
  }
}
