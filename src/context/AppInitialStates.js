
import { FETCH_STATUSES } from './AppActions';

export const initialUserState = {
  user: null,
  userFetchStatus: FETCH_STATUSES.PENDING,
  addresses: {
    addresses: [null],
    addressesFetchStatus: FETCH_STATUSES.LOADING
  },
  address: {
    address: null,
    addressFetchStatus: FETCH_STATUSES.LOADING
  },
};

export const initialHomeState = {
  categories: {
    categories: [null],
    categoriesFetchStatus: FETCH_STATUSES.LOADING
  },
  stores: {
    stores: [null],
    storesPage: 0,
    storesNumberOfPages: 0,
    storesFetchStatus: FETCH_STATUSES.LOADING,
  },
  products: {
    products: [null],
    productsPage: 0,
    productsNumberOfPages: 0,
    productsFetchStatus: FETCH_STATUSES.LOADING
  },
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
  promotions: {
    promotions: [null],
    promotionsPage: 0,
    promotionsNumberOfPages: 0,
    promotionsFetchStatus: FETCH_STATUSES.LOADING
  }
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
    ordersPage: 0,
    ordersStatus: 'pending',
    ordersNumberOfPages: 0,
    ordersFetchStatus: FETCH_STATUSES.LOADING,
  },
  order: {
    order: null,
    orderFetchStatus: FETCH_STATUSES.LOADING,
  }
};

export const initialSavedCartsState = {
  savedCarts: {
    savedCarts: [null],
    savedCartsPage: 0,
    savedCartsNumberOfPages: 0,
    savedCartsFetchStatus: FETCH_STATUSES.LOADING,
  },
  savedCartItems: {
    savedCartItems: [null],
    savedCartItemsFetchStatus: FETCH_STATUSES.LOADING,
  }
};

export const initialPromotionsState = {
  promotions: {
    promotions: [null],
    promotionsPage: 0,
    promotionsNumberOfPages: 0,
    promotionsFetchStatus: FETCH_STATUSES.LOADING,
  },
  products: {
    products: [null],
    productsPage: 0,
    productsNumberOfPages: 0,
    productsFetchStatus: FETCH_STATUSES.LOADING
  },
  promotion: {
    promotion: null,
    promotionFetchStatus: FETCH_STATUSES.LOADING,
  }
};


export const initialTransactionsState = {
  transactions: {
    transactions: [null],
    transactionsPage: 0,
    transactionsNumberOfPages: 0,
    transactionsFetchStatus: FETCH_STATUSES.LOADING
  },
};


export const initialProductsState = {
  products: {
    products: [null],
    productsPage: 0,
    productsNumberOfPages: 0,
    productsFetchStatus: FETCH_STATUSES.LOADING
  }
};




