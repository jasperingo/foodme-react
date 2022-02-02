import { DISCOUNT } from "../actions/discountActions";
import { PRODUCT } from "../actions/productActions";
import { REVIEW } from "../actions/reviewActions";
import { STORE } from "../actions/storeActions";
import storeState from "../states/storeState";


export default function StoreReducer (state, action) {
  
  switch (action.type) {  

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

    // case STORE.LIST_FETCH_STATUS_CHANGED :
    //   return {
    //     ...state,
    //     stores: {
    //       ...state.stores,
    //       storesFetchStatus: action.payload
    //     }
    //   };
    
    // case STORE.LIST_FETCHED :
    //   let statusx = fetchUpdater(
    //     state.stores.storesPage, 
    //     action.payload.storesNumberOfPages, 
    //     state.stores.stores.length, 
    //     action.payload.stores.length
    //   );
      
    //   const st = state.stores.stores.filter(i=> i !== null);
      
    //   return {
    //     ...state,
    //     stores: {
    //       storesFetchStatus: statusx,
    //       storesPage: state.stores.storesPage+1,
    //       storesNumberOfPages: action.payload.storesNumberOfPages,
    //       stores: [...st, ...action.payload.stores, null],
    //     }
    //   };

    case PRODUCT.LIST_FETCH_STATUS_CHANGED :
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
    
    // case ORDER.LIST_FETCH_STATUS_CHANGED :
    //   return {
    //     ...state,
    //     orders: {
    //       ...state.orders,
    //       ordersFetchStatus: action.payload,
    //     }
    //   };
    
    // case ORDER.LIST_FETCHED :
    //   let status4 = fetchUpdater(
    //     state.orders.ordersPage, 
    //     action.payload.ordersNumberOfPages, 
    //     state.orders.orders.length, 
    //     action.payload.orders.length
    //   );
      
    //   const ord = state.orders.orders.filter(i=> i !== null);
      
    //   return {
    //     ...state,
    //     orders: {
    //       ordersFetchStatus: status4,
    //       ordersPage: state.orders.ordersPage+1,
    //       ordersStatus: state.orders.ordersStatus,
    //       ordersNumberOfPages: action.payload.ordersNumberOfPages,
    //       orders: [...ord, ...action.payload.orders, null],
    //     }
    //   };

    // case TRANSACTION.LIST_FETCH_STATUS_CHANGED :
    //   return {
    //     ...state,
    //     transactions: {
    //       ...state.transactions,
    //       transactionsFetchStatus: action.payload
    //     }
    //   };
    
    // case TRANSACTION.LIST_FETCHED :
    //   let status5 = fetchUpdater(
    //     state.transactions.transactionsPage, 
    //     action.payload.transactionsNumberOfPages, 
    //     state.transactions.transactions.length, 
    //     action.payload.transactions.length
    //   );
      
    //   const trans = state.transactions.transactions.filter(i=> i !== null);

    //   return {
    //     ...state,
    //     transactions: {
    //       transactionsFetchStatus: status5,
    //       transactionsPage: state.transactions.transactionsPage+1,
    //       transactionsNumberOfPages: action.payload.transactionsNumberOfPages,
    //       transactions: [...trans, ...action.payload.transactions, null],
    //     }
    //   };

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

