import { FETCH_STATUSES } from "../../repositories/Fetch";

export const storeState = {

  store: null,
  storeID: null,
  storeLoading: true,
  storeFetchStatus: FETCH_STATUSES.LOADING,

  stores: [],
  storesPage: 1,
  storesLoading: true,
  storesNumberOfPages: 0,
  storesFetchStatus: FETCH_STATUSES.LOADING,


  products: [],
  productsPage: 1,
  productsLoading: true,
  productsNumberOfPages: 0,
  productsFetchStatus: FETCH_STATUSES.LOADING,

  reviews: [],
  reviewsPage: 1,
  reviewsLoading: true,
  reviewsNumberOfPages: 0,
  reviewsFetchStatus: FETCH_STATUSES.LOADING,

  discounts: [],
  discountsPage: 1,
  discountsLoading: true,
  discountsNumberOfPages: 0,
  discountsFetchStatus: FETCH_STATUSES.LOADING,

  orders: [],
  ordersPage: 1,
  ordersLoading: true,
  ordersNumberOfPages: 0,
  ordersFetchStatus: FETCH_STATUSES.LOADING,


  transactions: [],
  transactionsPage: 1,
  transactionsLoading: true,
  transactionsNumberOfPages: 0,
  transactionsFetchStatus: FETCH_STATUSES.LOADING

};


export default storeState;

