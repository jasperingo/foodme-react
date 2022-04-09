import { FETCH_STATUSES } from "../../repositories/Fetch";

export const storeState = {

  store: null,
  storeID: null,
  storeToken: null,
  storeAdminID: null,
  storeError: null,
  storeLoading: false,

  stores: [],
  storesPage: 1,
  storesLoading: true,
  storesNumberOfPages: 0,
  storesFetchStatus: FETCH_STATUSES.LOADING,
  
  productCategories: [],
  productCategoriesError: null,
  productCategoriesLoaded: false,
  productCategoriesLoading: false,
  
  products: [],
  productsPage: 1,
  productsError: null,
  productsLoaded: false,
  productsLoading: false,
  productsNumberOfPages: 0,

  reviews: [],
  reviewsPage: 1,
  reviewsError: null,
  reviewsLoaded: false,
  reviewsLoading: false,
  reviewsNumberOfPages: 0,

  discounts: [],
  discountsPage: 1,
  discountsError: null,
  discountsLoaded: false,
  discountsLoading: false,
  discountsNumberOfPages: 0,

  orders: [],
  ordersPage: 1,
  ordersLoading: true,
  ordersNumberOfPages: 0,
  ordersFetchStatus: FETCH_STATUSES.LOADING,


  transactions: [],
  transactionsPage: 1,
  transactionsLoading: true,
  transactionsNumberOfPages: 0,
  transactionsFetchStatus: FETCH_STATUSES.LOADING,

  
  transactionBalance: null,
  transactionBalanceLoading: true,
  transactionBalanceFetchStatus: FETCH_STATUSES.LOADING,

};

export default storeState;
