import { PRODUCT } from "../actions/productActions";
import { STORE } from "../actions/storeActions";
import storeState from "../states/storeState";


export default function StoreReducer (state, action) {
  
  switch (action.type) {  

    case STORE.UNFETCHED: 
      return {
        ...state,
        store: storeState.store,
        storeFetchStatus: storeState.storeFetchStatus
      };
    
    case STORE.FETCH_STATUS_CHANGED:
      return {
        ...state,
        storeFetchStatus: action.payload
      };
    
    case STORE.FETCHED:
      return {
        ...state,
        store: action.payload.store, 
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
        productsFetchStatus: action.payload
      };
    
    case PRODUCT.LIST_FETCHED:
      return {
        ...state,
        productsPage: state.productsPage+1,
        productsFetchStatus: action.payload.fetchStatus,
        productsNumberOfPages: action.payload.numberOfPages,
        products: [...state.products, ...action.payload.list],
      };
    

    // case REVIEW.LIST_FETCH_STATUS_CHANGED :
    //   return {
    //     ...state,
    //     reviews: {
    //       ...state.reviews,
    //       reviewsFetchStatus: action.payload
    //     }
    //   };

    // case REVIEW.LIST_FETCHED:
    //   let status2 = fetchUpdater(
    //     state.reviews.reviewsPage,
    //     action.payload.reviewsNumberOfPages,
    //     state.reviews.reviews.length,
    //     action.payload.reviews.length
    //   );
        
    //   const rev = state.reviews.reviews.filter(i=> i !== null);

    //   return {
    //     ...state,
    //     reviews: {
    //       reviewsFetchStatus: status2,
    //       reviewsPage: state.reviews.reviewsPage+1,
    //       reviewsNumberOfPages: action.payload.reviewsNumberOfPages,
    //       reviews: [...rev, ...action.payload.reviews, null],
    //     }
    //   }; 

    // case PROMOTION.LIST_FETCH_STATUS_CHANGED :
    //   return {
    //     ...state,
    //     promotions: {
    //       ...state.promotions,
    //       promotionsFetchStatus: action.payload
    //     }
    //   };

    // case PROMOTION.LIST_FETCHED:
    //   let status3 = fetchUpdater(
    //     state.promotions.promotionsPage,
    //     action.payload.promotionsNumberOfPages,
    //     state.promotions.promotions.length,
    //     action.payload.promotions.length
    //   );
        
    //   const prom = state.promotions.promotions.filter(i=> i !== null);

    //   return {
    //     ...state,
    //     promotions: {
    //       promotionsFetchStatus: status3,
    //       promotionsPage: state.promotions.promotionsPage+1,
    //       promotionsNumberOfPages: action.payload.promotionsNumberOfPages,
    //       promotions: [...prom, ...action.payload.promotions, null],
    //     }
    //   }; 
    
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
    
    default:
      return state;
  }
}

