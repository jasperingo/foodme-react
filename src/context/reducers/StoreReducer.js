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
        ...storeState,
        stores: state.stores,
        storesPage: state.storesPage,
        storesLoading: state.storesLoading,
        storesNumberOfPages: state.storesNumberOfPages,
        storesFetchStatus: state.storesFetchStatus
      };
    
    case STORE.FETCH_STATUS_CHANGED:
      return {
        ...state,
        storeID: action.payload.id,
        storeLoading: action.payload.loading,
        storeFetchStatus: action.payload.fetchStatus
      };
    
    case STORE.FETCHED:
      return {
        ...state,
        storeLoading: false, 
        store: action.payload.store, 
        storeID: action.payload.store.id,
        storeFetchStatus: action.payload.fetchStatus
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

    case PRODUCT.LIST_FETCH_STATUS_CHANGED:
      return {
        ...state,
        productsLoading: action.payload.loading,
        productsFetchStatus: action.payload.fetchStatus
      };
    
    case PRODUCT.LIST_FETCHED:
      return {
        ...state,
        productsLoading: false,
        productsPage: state.productsPage+1,
        productsFetchStatus: action.payload.fetchStatus,
        productsNumberOfPages: action.payload.numberOfPages,
        products: [...state.products, ...action.payload.list],
      };
    

    case REVIEW.LIST_FETCH_STATUS_CHANGED :
      return {
        ...state,
        reviewsLoading: action.payload.loading,
        reviewsFetchStatus: action.payload.fetchStatus
      };

    case REVIEW.LIST_FETCHED:
      return {
        ...state,
        reviewsLoading: false,
        reviewsPage: state.reviewsPage+1,
        reviewsFetchStatus: action.payload.fetchStatus,
        reviewsNumberOfPages: action.payload.numberOfPages,
        reviews: [...state.reviews, ...action.payload.list],
      };
      

    case DISCOUNT.LIST_FETCH_STATUS_CHANGED :
      return {
        ...state,
        discountsLoading: action.payload.loading,
        discountsFetchStatus: action.payload.fetchStatus
      };

    case DISCOUNT.LIST_FETCHED:
      return {
        ...state,
        discountsLoading: false,
        discountsPage: state.discountsPage+1,
        discountsFetchStatus: action.payload.fetchStatus,
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

