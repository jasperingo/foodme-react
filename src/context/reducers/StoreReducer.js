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
        storesNumberOfPages: state.storesNumberOfPages,
        storesFetchStatus: state.storesPage
      };
    
    case STORE.FETCH_STATUS_CHANGED:
      return {
        ...state,
        storeID: action.payload.id,
        storeFetchStatus: action.payload.fetchStatus
      };
    
    case STORE.FETCHED:
      return {
        ...state,
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
    

    case REVIEW.LIST_FETCH_STATUS_CHANGED :
      return {
        ...state,
        reviewsFetchStatus: action.payload
      };

    case REVIEW.LIST_FETCHED:
      return {
        ...state,
        reviewsPage: state.reviewsPage+1,
        reviewsFetchStatus: action.payload.fetchStatus,
        reviewsNumberOfPages: action.payload.numberOfPages,
        reviews: [...state.reviews, ...action.payload.list],
      };
      

    case DISCOUNT.LIST_FETCH_STATUS_CHANGED :
      return {
        ...state,
        discountsFetchStatus: action.payload
      };

    case DISCOUNT.LIST_FETCHED:
      return {
        ...state,
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
    
    default:
      return state;
  }
}

