import { FETCH_STATUSES } from "../../repositories/Fetch";

export const searchState = {

  query: null,

  stores: [],
  storesPage: 1,
  storesNumberOfPages: 0,
  storesSubCategory: null,
  storesFetchStatus: FETCH_STATUSES.LOADING,

  products: [],
  productsPage: 1,
  productsNumberOfPages: 0,
  productsSubCategory: null,
  productsFetchStatus: FETCH_STATUSES.LOADING
   
};

export default searchState;
