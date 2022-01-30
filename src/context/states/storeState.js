import { FETCH_STATUSES } from "../../repositories/Fetch";

export const storeState = {

  store: null,
  storeFetchStatus: FETCH_STATUSES.LOADING,

  stores: [],
  storesPage: 1,
  storesNumberOfPages: 0,
  storesFetchStatus: FETCH_STATUSES.LOADING,


  products: [],
  productsPage: 1,
  productsNumberOfPages: 0,
  productsFetchStatus: FETCH_STATUSES.LOADING,

  reviews: [],
  reviewsPage: 1,
  reviewsNumberOfPages: 0,
  reviewsFetchStatus: FETCH_STATUSES.LOADING,

  promotions: [],
  promotionsPage: 1,
  promotionsNumberOfPages: 0,
  promotionsFetchStatus: FETCH_STATUSES.LOADING,

  orders: [],
  ordersPage: 1,
  ordersNumberOfPages: 0,
  ordersFetchStatus: FETCH_STATUSES.LOADING,


  transactions: [],
  transactionsPage: 1,
  transactionsNumberOfPages: 0,
  transactionsFetchStatus: FETCH_STATUSES.LOADING

};


export default storeState;

