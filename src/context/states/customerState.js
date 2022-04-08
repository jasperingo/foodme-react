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
    ordersError: null,
    ordersLoaded: false,
    ordersLoading: false,
    ordersNumberOfPages: 0
  },

  products: {
    products: [],
    productsPage: 1,
    productsError: null,
    productsLoaded: false,
    productsLoading: false,
    productsNumberOfPages: 0
  },

  savedCarts: {
    savedCarts: [],
    savedCartsPage: 1,
    savedCartsError: null,
    savedCartsLoaded: false,
    savedCartsLoading: false,
    savedCartsNumberOfPages: 0
  },

  addresses: {
    addresses: [],
    addressesError: null,
    addressesLoaded: false,
    addressesLoading: false,
  },

  transactions: {
    transactions: [],
    transactionsPage: 1,
    transactionsError: null,
    transactionsLoaded: false,
    transactionsLoading: false,
    transactionsNumberOfPages: 0
  },
};


export default customerState;

