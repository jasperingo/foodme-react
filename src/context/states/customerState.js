import { FETCH_STATUSES } from "../../repositories/Fetch";

const customerState = {
  
  customer: {
    customer: null,
    customerToken: null,
    customerID: null,
    customerLoading: true,
    customerFetchStatus: FETCH_STATUSES.LOADING
  },

  customers: {
    customers: [],
    customersPage: 1,
    customersLoading: true,
    customersNumberOfPages: 0,
    customersFetchStatus: FETCH_STATUSES.LOADING
  },

  orders: {
    orders: [],
    ordersPage: 1,
    ordersLoading: true,
    ordersNumberOfPages: 0,
    ordersFetchStatus: FETCH_STATUSES.LOADING,
  },

  products: {
    products: [],
    productsPage: 1,
    productsLoading: true,
    productsNumberOfPages: 0,
    productsFetchStatus: FETCH_STATUSES.LOADING
  },

  addresses: {
    addresses: [],
    addressesFetchStatus: FETCH_STATUSES.LOADING
  },

  transactions: {
    transactions: [],
    transactionsPage: 1,
    transactionsLoading: true,
    transactionsNumberOfPages: 0,
    transactionsFetchStatus: FETCH_STATUSES.LOADING
  },
};


export default customerState;

