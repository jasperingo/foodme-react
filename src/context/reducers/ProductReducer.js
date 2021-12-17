
import { PRODUCT, REVIEW, FETCH_STATUSES } from "../AppActions";
import { useListFetchStatus } from "../AppHooks";
import { initialProductsState } from "../AppInitialStates";

export default function ProductReducer (state, action) {

  const fetchUpdater = useListFetchStatus();
  
  switch (action.type) {  

    case PRODUCT.UNFETCH:
      return initialProductsState;
    
    case PRODUCT.FETCH_STATUS_CHANGED :
      return {
        ...state,
        product: {
          product: state.product.product,
          productFetchStatus: action.payload
        }
      };
    
    case PRODUCT.FETCHED :
      return {
        ...state,
        product: {
          product: action.payload, 
          productFetchStatus: FETCH_STATUSES.DONE,
        }
      };

    case REVIEW.LIST_FETCH_STATUS_CHANGED :
      return {
        ...state,
        reviews: {
          ...state.reviews,
          reviewsFetchStatus: action.payload
        }
      };

    case REVIEW.LIST_FETCHED:
      let status2 = fetchUpdater(
        state.reviews.reviewsPage, 
        action.payload.reviewsNumberOfPages, 
        state.reviews.reviews.length, 
        action.payload.reviews.length
      );
        
      const rev = state.reviews.reviews.filter(i=> i !== null);

      return {
        ...state,
        reviews: {
          reviewsFetchStatus: status2,
          reviewsPage: state.reviews.reviewsPage+1,
          reviewsNumberOfPages: action.payload.reviewsNumberOfPages,
          reviews: [...rev, ...action.payload.reviews, null],
        }
      }; 

    case PRODUCT.LIST_FETCH_STATUS_CHANGED :
      return {
        ...state,
        products: {
          ...state.products,
          productsFetchStatus: action.payload
        }
      };
    
    case PRODUCT.LIST_FETCHED :
      let status = fetchUpdater(
        state.products.productsPage, 
        action.payload.productsNumberOfPages, 
        state.products.products.length, 
        action.payload.products.length
      );
      
      const prods = state.products.products.filter(i=> i !== null);

      return {
        ...state,
        products: {
          productsFetchStatus: status,
          productsPage: state.products.productsPage+1,
          productsNumberOfPages: action.payload.productsNumberOfPages,
          products: [...prods, ...action.payload.products, null],
        }
      };

    case PRODUCT.RELATED_LIST_FETCH_STATUS_CHANGED :
      return {
        ...state,
        related: {
          ...state.related,
          relatedFetchStatus: action.payload
        }
      };
    
    case PRODUCT.RELATED_LIST_FETCHED :
      let status3 = fetchUpdater(
        state.related.relatedPage, 
        action.payload.relatedNumberOfPages, 
        state.related.related.length, 
        action.payload.related.length
      );
      
      const rel = state.related.related.filter(i=> i !== null);

      return {
        ...state,
        related: {
          relatedFetchStatus: status3,
          relatedPage: state.related.relatedPage+1,
          relatedNumberOfPages: action.payload.relatedNumberOfPages,
          related: [...rel, ...action.payload.related, null],
        }
      };

    default:
      return state;
  }
}

