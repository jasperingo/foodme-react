import { CATEGORY } from "../actions/categoryActions";
import { DISCOUNT } from "../actions/discountActions";
import { ORDER } from "../actions/orderActions";
import { PRODUCT } from "../actions/productActions";
import { REVIEW } from "../actions/reviewActions";
import { STORE } from "../actions/storeActions";
import { TRANSACTION } from "../actions/transactionActions";
import storeState from "../states/storeState";

export default function StoreReducer (state, action) {
  
  switch (action.type) {  

    case STORE.UNAUTHED:
      return { ...storeState };

    case STORE.AUTHED:
      return {
        ...state,
        store: action.payload.store,
        storeToken: action.payload.token,
        storeAdminID: action.payload.adminID,
        storeFetchStatus: action.payload.fetchStatus
      };

    case STORE.UNFETCHED: 
      return {
        ...state,
        store: storeState.store,
        storeID: storeState.storeID,
        storeError: storeState.storeError,
        storeLoading: storeState.storeLoading,

        productCategories: storeState.productCategories,
        productCategoriesError: storeState.productCategoriesError,
        productCategoriesLoaded: storeState.productCategoriesLoaded,
        productCategoriesLoading: storeState.productCategoriesLoading,

        products: storeState.products,
        productsPage: storeState.productsPage,
        productsError: storeState.productsError,
        productsLoaded: storeState.productsLoaded,
        productsLoading: storeState.productsLoading,
        productsNumberOfPages: storeState.productsNumberOfPages,

        reviews: storeState.reviews,
        reviewsPage: storeState.reviewsPage,
        reviewsError: storeState.reviewsError,
        reviewsLoaded: storeState.reviewsLoaded,
        reviewsLoading: storeState.reviewsLoading,
        reviewsNumberOfPages: storeState.reviewsNumberOfPages,

        discounts: storeState.discounts,
        discountsPage: storeState.discountsPage,
        discountsError: storeState.discountsError,
        discountsLoaded: storeState.discountsLoaded,
        discountsLoading: storeState.discountsLoading,
        discountsNumberOfPages: storeState.discountsNumberOfPages
      };
    
    case STORE.ERROR_CHANGED:
      return {
        ...state,
        storeLoading: false,
        storeID: action.payload.id,
        storeError: action.payload.error
      };

    case STORE.FETCHING:
      return {
        ...state,
        storeError: null,
        storeLoading: true
      };
    
    case STORE.FETCHED:
      return {
        ...state,
        storeLoading: false, 
        storeID: action.payload.id,
        store: action.payload.store
      };


    case STORE.LIST_FETCH_STATUS_CHANGED:
      return {
        ...state,
        storesLoading: action.payload.loading,
        storesFetchStatus: action.payload.fetchStatus
      };
    
    case STORE.LIST_FETCHED:
      return {
        ...state,
        storesLoading: false,
        storesPage: state.storesPage+1,
        storesFetchStatus: action.payload.fetchStatus,
        storesNumberOfPages: action.payload.numberOfPages,
        stores: [...state.stores, ...action.payload.list],
      };


    case CATEGORY.PRODUCTS_LIST_ERROR_CHANGED:
      return {
        ...state,
        productCategoriesLoading: false,
        productCategoriesError: action.payload.error
      }
    
    case CATEGORY.PRODUCTS_LIST_FETCHING:
      return {
        ...state,
        productCategoriesError: null,
        productCategoriesLoading: true
      };
    
    case CATEGORY.PRODUCTS_LIST_FETCHED:
      return {
        ...state,
        productCategoriesLoaded: true,
        productCategoriesLoading: false,
        productCategories: action.payload.list
      };

    
    case PRODUCT.LIST_UNFETCHED:
      return {
        ...state,
        products: storeState.products,
        productsPage: storeState.productsPage,
        productsError: storeState.productsError,
        productsLoaded: storeState.productsLoaded,
        productsLoading: storeState.productsLoading,
        productsNumberOfPages: storeState.productsNumberOfPages
      };

    case PRODUCT.LIST_ERROR_CHANGED:
      return {
        ...state,
        productsLoading: false,
        productsError: action.payload.error
      };

    case PRODUCT.LIST_FETCHING:
      return {
        ...state,
        productsError: null,
        productsLoading: true
      };
    
    case PRODUCT.LIST_FETCHED:
      return {
        ...state,
        productsLoaded: true,
        productsLoading: false,
        productsPage: state.productsPage + 1,
        productsNumberOfPages: action.payload.numberOfPages,
        products: [...state.products, ...action.payload.list],
      };
    

    case REVIEW.LIST_UNFETCHED:
      return {
        reviews: storeState.reviews,
        reviewsPage: storeState.reviewsPage,
        reviewsError: storeState.reviewsError,
        reviewsLoaded: storeState.reviewsLoaded,
        reviewsLoading: storeState.reviewsLoading,
        reviewsNumberOfPages: storeState.reviewsNumberOfPages
      };

    case REVIEW.LIST_FETCHING:
      return {
        ...state,
        reviewsError: null,
        reviewsLoading: true
      };

    case REVIEW.LIST_ERROR_CHANGED:
      return {
        ...state,
        reviewsLoading: false,
        reviewsError: action.payload.error
      };

    case REVIEW.LIST_FETCHED:
      return {
        ...state,
        reviewsLoaded: true,
        reviewsLoading: false,
        reviewsPage: state.reviewsPage + 1,
        reviewsNumberOfPages: action.payload.numberOfPages,
        reviews: [...state.reviews, ...action.payload.list],
      };
      

    case DISCOUNT.LIST_UNFETCHED:
      return {
        discounts: storeState.discounts,
        discountsPage: storeState.discountsPage,
        discountsError: storeState.discountsError,
        discountsLoaded: storeState.discountsLoaded,
        discountsLoading: storeState.discountsLoading,
        discountsNumberOfPages: storeState.discountsNumberOfPages
      };

    case DISCOUNT.LIST_FETCHING:
      return {
        ...state,
        discountsError: null,
        discountsLoading: true
      };

    case DISCOUNT.LIST_ERROR_CHANGED:
      return {
        ...state,
        discountsLoading: false,
        discountsError: action.payload.error
      };

    case DISCOUNT.LIST_FETCHED:
      return {
        ...state,
        discountsLoaded: true,
        discountsLoading: false,
        discountsPage: state.discountsPage + 1,
        discountsNumberOfPages: action.payload.numberOfPages,
        discounts: [...state.discounts, ...action.payload.list],
      };


    case ORDER.LIST_UNFETCHED:
    case ORDER.LIST_STATUS_FILTER_CHANGED:
      return {
        ...state,
        ordersPage: 1,
        ordersLoading: true,
        ordersNumberOfPages: 0,
        orders: storeState.orders,
        ordersFetchStatus: storeState.ordersFetchStatus,
      };
    
    case ORDER.LIST_FETCH_STATUS_CHANGED:
      return {
        ...state,
        ordersLoading: action.payload.loading,
        ordersFetchStatus: action.payload.fetchStatus,
      };
      
    case ORDER.LIST_FETCHED:
      return {
        ...state,
        ordersLoading: false,
        ordersPage: state.ordersPage+1,
        ordersFetchStatus: action.payload.fetchStatus,
        ordersNumberOfPages: action.payload.numberOfPages,
        orders: [...state.orders, ...action.payload.list],
      };

    case TRANSACTION.LIST_FETCH_STATUS_CHANGED:
      return {
        ...state,
        transactionsLoading: action.payload.loading,
        transactionsFetchStatus: action.payload.fetchStatus
      };
    
    case TRANSACTION.LIST_FETCHED:
      return {
        ...state,
        transactionsLoading: false,
        transactionsPage: state.transactionsPage+1,
        transactionsFetchStatus: action.payload.fetchStatus,
        transactionsNumberOfPages: action.payload.numberOfPages,
        transactions: [...state.transactions, ...action.payload.list],
      };

    case TRANSACTION.BALANCE_UNFETCHED:
      return {
        ...state,
        transactionBalanceLoading: true,
        transactionBalance: storeState.transactionBalance,
        transactionBalanceFetchStatus: storeState.transactionBalanceFetchStatus
      };

    case TRANSACTION.BALANCE_FETCH_STATUS_CHANGED:
      return {
        ...state,
        transactionBalanceLoading: action.payload.loading,
        transactionBalanceFetchStatus: action.payload.fetchStatus
      };
    
    case TRANSACTION.BALANCE_FETCHED:
      return {
        ...state,
        transactionBalanceLoading: false,
        transactionBalance: action.payload.balance,
        transactionBalanceFetchStatus: action.payload.fetchStatus
      };

    case TRANSACTION.BALANCE_WITHDRAWN:
      return {
        ...state,
        transactionBalance: state.transactionBalance - action.payload,
      };


    case REVIEW.CREATED:

      const review = action.payload;

      const summary = { ...state.store.review_summary };

      summary.total++;

      summary.ratings[review.rating-1] = summary.ratings[review.rating-1] + 1;

      const average = summary.ratings.reduce((prev, cur, i) => prev + (cur * (i+1)), 0);
      
      summary.average = average / summary.total;

      return {
        ...state,
        store: {
          ...state.store,
          reviews: [ review ],
          review_summary: summary
        }
      };

    case REVIEW.UPDATED:

      const reviewCur = action.payload;

      const reviewPrev = state.store.reviews[0];

      const summaryY = { ...state.store.review_summary };

      summaryY.ratings[reviewCur.rating-1] = summaryY.ratings[reviewCur.rating-1] + 1;

      summaryY.ratings[reviewPrev.rating-1] = summaryY.ratings[reviewPrev.rating-1] - 1;

      const averageY = summaryY.ratings.reduce((prev, cur, i) => prev + (cur * (i+1)), 0);

      summaryY.average = averageY / summaryY.total;
      
      return {
        ...state,
        store: {
          ...state.store,
          reviews: [ reviewCur ],
          review_summary: summaryY,
        }
      };

    case REVIEW.DELETED:

      const reviewX = state.store.reviews[0];

      const summaryX = { ...state.store.review_summary };

      summaryX.total--;

      summaryX.ratings[reviewX.rating-1] = summaryX.ratings[reviewX.rating-1] - 1;

      if (summaryX.total > 0) {
        const averageX = summaryX.ratings.reduce((prev, cur, i) => prev + (cur * (i+1)), 0);
        summaryX.average = averageX / summaryX.total;
      } else {
        summaryX.average = 0;
      }

      return {
        ...state,
        store: {
          ...state.store,
          reviews: undefined,
          review_summary: summaryX
        }
      };
    
    default:
      return state;
  }
}

