import { FETCH_STATUSES } from "../../repositories/Fetch";

const homeState = {
  
  categories: [],
  categoriesFetchStatus: FETCH_STATUSES.LOADING,
  
  stores: [],
  storesError: null,
  storesLoaded: false,
  storesLoading: false,
  storesFetchStatus: FETCH_STATUSES.LOADING,

  products: [],
  productsFetchStatus: FETCH_STATUSES.LOADING
  
};

export default homeState;
