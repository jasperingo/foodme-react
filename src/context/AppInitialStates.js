
import { FETCH_STATUSES } from './AppActions';

export const initialUserState = {
  user: null,
  userFetchStatus: FETCH_STATUSES.PENDING
};

export const initialAddressesState = {
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

export const initialDashboardState = {
  statistics: {
    statistics: null,
    statisticsFetchStatus: FETCH_STATUSES.LOADING
  },
  stores: {
    stores: [null],
    storesFetchStatus: FETCH_STATUSES.LOADING,
  },
  customers: {
    customers: [null],
    customersFetchStatus: FETCH_STATUSES.LOADING
  },
  orders: {
    orders: [null],
    ordersFetchStatus: FETCH_STATUSES.LOADING,
  },
  deliveryFirms: {
    deliveryFirms: [null],
    deliveryFirmsFetchStatus: FETCH_STATUSES.LOADING
  },
};

export const initialCategoriesState = {
  category: {
    category: null,
    categoryFetchStatus: FETCH_STATUSES.LOADING
  },
  subCategory: {
    subCategory: null,
    subCategoryFetchStatus: FETCH_STATUSES.LOADING
  },
  stores: {
    stores: [null],
    storesFetchStatus: FETCH_STATUSES.LOADING
  },
  products: {
    products: [null],
    productsFetchStatus: FETCH_STATUSES.LOADING
  }
};

export const initialCustomerState = {
  customer: {
    customer: null,
    customerFetchStatus: FETCH_STATUSES.LOADING
  },
  customers: {
    customers: [null],
    customersPage: 0,
    customersNumberOfPages: 0,
    customersFetchStatus: FETCH_STATUSES.LOADING
  },
  orders: {
    orders: [null],
    ordersPage: 0,
    ordersNumberOfPages: 0,
    ordersFetchStatus: FETCH_STATUSES.LOADING,
  },
  products: {
    products: [null],
    productsPage: 0,
    productsCategory: 0,
    productsNumberOfPages: 0,
    productsFetchStatus: FETCH_STATUSES.LOADING
  },
  addresses: {
    addresses: [null],
    addressesFetchStatus: FETCH_STATUSES.LOADING
  },
  transactions: {
    transactions: [null],
    transactionsPage: 0,
    transactionsNumberOfPages: 0,
    transactionsFetchStatus: FETCH_STATUSES.LOADING
  },
};

export const initialStoreState = {
  store: {
    store: null,
    storeFetchStatus: FETCH_STATUSES.LOADING
  },
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
  },
  orders: {
    orders: [null],
    ordersPage: 0,
    ordersStatus: 'pending',
    ordersNumberOfPages: 0,
    ordersFetchStatus: FETCH_STATUSES.LOADING,
  },
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
  },
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

export const initialDeliveryFirmState = {
  deliveryFirm: {
    deliveryFirm: null,
    deliveryFirmFetchStatus: FETCH_STATUSES.LOADING
  },
  deliveryFirms: {
    deliveryFirms: [null],
    deliveryFirmsPage: 0,
    deliveryFirmsNumberOfPages: 0,
    deliveryFirmsFetchStatus: FETCH_STATUSES.LOADING
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
  wallet: {
    wallet: null,
    walletFetchStatus: FETCH_STATUSES.LOADING
  },
  transaction: {
    transaction: null,
    transactionFetchStatus: FETCH_STATUSES.LOADING
  },
  transactions: {
    transactions: [null],
    transactionsPage: 0,
    transactionsNumberOfPages: 0,
    transactionsFetchStatus: FETCH_STATUSES.LOADING
  },
};

export const initialReviewsState = {
  reviews: {
    reviews: [null],
    reviewsPage: 0,
    reviewsNumberOfPages: 0,
    reviewsFetchStatus: FETCH_STATUSES.LOADING
  },
};

export const initialRoutesState = {
  routes: {
    routes: [null],
    routesPage: 0,
    routesNumberOfPages: 0,
    routesFetchStatus: FETCH_STATUSES.LOADING
  },
};

