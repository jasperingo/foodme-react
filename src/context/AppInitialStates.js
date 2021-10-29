
import { FETCH_STATUSES } from './AppActions';


export const initialCustomerState = null;

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
  reviews: {
    reviews: [null],
    reviewsPage: 0,
    reviewsNumberOfPages: 0,
    reviewsFetchStatus: FETCH_STATUSES.LOADING
  },
  promotions: []
};

export const initialProductState = {
  product: {
    product: null,
    productFetchStatus: FETCH_STATUSES.LOADING
  },
  reviews: {
    reviews: [null],
    reviewsPage: 0,
    reviewsNumberOfPages: 0,
    reviewsFetchStatus: FETCH_STATUSES.LOADING
  },
  related: {
    related: [null],
    relatedPage: 0,
    relatedNumberOfPages: 0,
    relatedFetchStatus: FETCH_STATUSES.LOADING
  },
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

export const initialCartState = {
  cartItems: [null],
  cartItemsFetchStatus: FETCH_STATUSES.EMPTY
};

export const initialOrdersState = {
  orders: {
    orders: [null],
    ordersFetchStatus: FETCH_STATUSES.LOADING,
    ordersPage: 0,
    ordersNumberOfPages: 0
  },
  order: {
    order: null,
    orderFetchStatus: FETCH_STATUSES.LOADING,
  },
  orderItems: {
    orderItems: [null],
    orderItemsFetchStatus: FETCH_STATUSES.LOADING,
  }
};



