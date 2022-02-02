import { FETCH_STATUSES } from "../../repositories/Fetch";

export const searchState = {

  query: null,

  stores: [],
  storesPage: 1,
  storesLoading: true,
  storesNumberOfPages: 0,
  storesSubCategory: null,
  storesFetchStatus: FETCH_STATUSES.LOADING,

  products: [],
  productsPage: 1,
  productsLoading: true,
  productsNumberOfPages: 0,
  productsSubCategory: null,
  productsFetchStatus: FETCH_STATUSES.LOADING
   
};

export default searchState;
