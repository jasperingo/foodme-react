
import { FETCH_STATUSES } from './AppActions';

export const initialHomeState = {
  categories: {
    categories: [null],
    categoriesFetchStatus: FETCH_STATUSES.LOADING
  },
  stores: {
    stores: [null],
    storesFetchStatus: FETCH_STATUSES.LOADING,
    storesPage: 0,
    storesNumberOfPages: 0
  }
};

export const initialCategoriesState = {
  stores: {
    stores: [null],
    storesFetchStatus: FETCH_STATUSES.LOADING
  },
  products: {
    products: [null],
    productsFetchStatus: FETCH_STATUSES.LOADING
  }
};

export const initialStoreState = {
  store: {
    store: null,
    storeFetchStatus: FETCH_STATUSES.LOADING
  },
  products: {
    products: [null],
    productsPage: 0,
    productsCategory: 0,
    productsNumberOfPages: 0,
    productsFetchStatus: FETCH_STATUSES.LOADING
  },
  reviews: [],
  promotions: []
};

export const initialProductState = {
  product: {
    product: null,
    productFetchStatus: FETCH_STATUSES.LOADING
  },
  reviews: [],
  related: []
};

export const initialSearchState = {
  query: null,
  stores: {
    stores: [null],
    storesPage: 0,
    storesNumberOfPages: 0,
    storesFetchStatus: FETCH_STATUSES.LOADING
  },
  products: {
    products: [null],
    productsPage: 0,
    productsCategory: 0,
    productsNumberOfPages: 0,
    productsFetchStatus: FETCH_STATUSES.LOADING
  },
};


