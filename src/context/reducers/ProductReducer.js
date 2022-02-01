import { PRODUCT } from "../actions/productActions";
import { REVIEW } from "../actions/reviewActions";
import productState from "../states/productState";

export default function ProductReducer (state, action) {
  
  switch (action.type) {  

    case PRODUCT.UNFETCHED:
      return {
        ...productState,
        products: state.products,
        productsPage: state.productsPage,
        productsNumberOfPages: state.productsNumberOfPages,
        productsFetchStatus: state.productsFetchStatus
      };
    
    case PRODUCT.FETCH_STATUS_CHANGED :
      return {
        ...state,
        productID: action.payload.id,
        productFetchStatus: action.payload.fetchStatus
      };
    
    case PRODUCT.FETCHED :
      return {
        ...state,
        product: action.payload.product,
        productID: action.payload.product.id,
        productFetchStatus: action.payload.fetchStatus
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

    case PRODUCT.LIST_UNFETCHED:
      return {
        ...state,
        productsPage: 1,
        productsLoading: true,
        productsNumberOfPages: 0,
        products: productState.products,
        productsFetchStatus: productState.productsFetchStatus
      }

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
      
    case PRODUCT.RELATED_LIST_FETCH_STATUS_CHANGED:
      return {
        ...state,
        relatedFetchStatus: action.payload
      };
    
    case PRODUCT.RELATED_LIST_FETCHED:
      return {
        ...state,
        relatedPage: state.relatedPage+1,
        relatedFetchStatus: action.payload.fetchStatus,
        relatedNumberOfPages: action.payload.numberOfPages,
        related: [...state.related, ...action.payload.list],
      };

    default:
      return state;
  }
}

