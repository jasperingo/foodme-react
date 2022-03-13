import { FETCH_STATUSES } from "../../repositories/Fetch";

const homeState = {
  
  categories: [],
  categoriesFetchStatus: FETCH_STATUSES.LOADING,
  
  stores: [],
  storesError: null,
  storesLoaded: false,
  storesLoading: false,

  products: [],
  productsError: null,
  productsLoaded: false,
  productsLoading: false,
  
};

export default homeState;
