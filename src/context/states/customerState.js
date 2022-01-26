import { FETCH_STATUSES } from "../../repositories/Fetch";

const customerState = {
  
  customer: {
    customer: null,
    customerToken: null,
    customerFetchStatus: FETCH_STATUSES.LOADING
  },

  customers: {
    customers: [],
    customersPage: 0,
    customersNumberOfPages: 0,
    customersFetchStatus: FETCH_STATUSES.LOADING
  },

  orders: {
    orders: [],
    ordersPage: 0,
    ordersNumberOfPages: 0,
    ordersFetchStatus: FETCH_STATUSES.LOADING,
  },

  products: {
    products: [],
    productsPage: 0,
    productsNumberOfPages: 0,
    productsFetchStatus: FETCH_STATUSES.LOADING
  },

  addresses: {
    addresses: [],
    addressesFetchStatus: FETCH_STATUSES.LOADING
  },

  transactions: {
    transactions: [],
    transactionsPage: 0,
    transactionsNumberOfPages: 0,
    transactionsFetchStatus: FETCH_STATUSES.LOADING
  },
};


export default customerState;

