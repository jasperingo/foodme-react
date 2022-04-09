import { PRODUCT } from "../actions/productActions";
import { REVIEW } from "../actions/reviewActions";
import productState from "../states/productState";

export default function ProductReducer (state, action) {
  
  switch (action.type) {  

    case PRODUCT.UNFETCHED:
      return {
        ...state,
        product: productState.product,
        productID: productState.productID,
        productError: productState.productError,
        productLoading: productState.productLoading,
        reviews: productState.reviews,
        reviewsPage: productState.reviewsPage,
        reviewsError: productState.reviewsError,
        reviewsLoaded: productState.reviewsLoaded,
        reviewsLoading: productState.reviewsLoading,
        reviewsNumberOfPages: productState.reviewsNumberOfPages,
        related: productState.related,
        relatedPage: productState.relatedPage,
        relatedError: productState.relatedError,
        relatedLoaded: productState.relatedLoaded,
        relatedLoading: productState.relatedLoading,
        relatedNumberOfPages: productState.relatedNumberOfPages
      };
    
    case PRODUCT.FETCHING:
      return {
        ...state,
        productError: null,
        productLoading: true
      };

    case PRODUCT.ERROR_CHANGED:
      return {
        ...state,
        productLoading: false,
        productID: action.payload.id,
        productError: action.payload.error
      };
    
    case PRODUCT.FETCHED:
      return {
        ...state,
        productLoading: false,
        productID: action.payload.id,
        product: action.payload.product
      };


    case PRODUCT.VARIANT_UNFETCHED:
      return {
        ...state,
        productVariant: productState.productVariant,
        productVariantID: productState.productVariantID,
        productVariantLoading: productState.productVariantLoading,
        productVariantFetchStatus: productState.productVariantFetchStatus
      };
    
    case PRODUCT.VARIANT_FETCH_STATUS_CHANGED:
      return {
        ...state,
        productVariantID: action.payload.id,
        productVariantLoading: action.payload.loading,
        productVariantFetchStatus: action.payload.fetchStatus
      };
    
    case PRODUCT.VARIANT_FETCHED:
      return {
        ...state,
        productVariantLoading: false,
        productVariant: action.payload.productVariant,
        productVariantID: action.payload.productVariant.id,
        productVariantFetchStatus: action.payload.fetchStatus
      };


    case REVIEW.LIST_UNFETCHED:
      return {
        ...state,
        reviews: productState.reviews,
        reviewsPage: productState.reviewsPage,
        reviewsError: productState.reviewsError,
        reviewsLoaded: productState.reviewsLoaded,
        reviewsLoading: productState.reviewsLoading,
        reviewsNumberOfPages: productState.reviewsNumberOfPages,
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


    case PRODUCT.LIST_UNFETCHED:
      return {
        ...state,
        productsPage: 1,
        productsLoading: true,
        productsNumberOfPages: 0,
        products: productState.products,
        productsFetchStatus: productState.productsFetchStatus
      }

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
      

    case PRODUCT.RELATED_LIST_ERROR_CHANGED:
      return {
        ...state,
        relatedLoading: false,
        relatedError: action.payload.error
      };

    case PRODUCT.RELATED_LIST_FETCHING:
      return {
        ...state,
        relatedError: null,
        relatedLoading: true
      };
    
    case PRODUCT.RELATED_LIST_FETCHED:
      return {
        ...state,
        relatedLoaded: true,
        relatedLoading: false,
        relatedPage: state.relatedPage + 1,
        relatedNumberOfPages: action.payload.numberOfPages,
        related: [...state.related, ...action.payload.list],
      };


    case PRODUCT.VARIANT_CREATED: 
    if (!state.product) {
      return state;
    } else {
      return {
        ...state,
        product: { 
          ...state.product, 
          product_variants: [...state.product.product_variants, action.payload] 
        } 
      };
    }

    case PRODUCT.VARIANT_UPDATED: 
      if (!state.product) {
        return state;
      } else {
        return {
          ...state,
          product: { 
            ...state.product, 
            product_variants: [...state.product.product_variants.map(i=> 
              (i.id === action.payload.id) ? action.payload : i
            )] 
          } 
        };
      }

    case PRODUCT.VARIANT_DELETED: 
      if (!state.product) {
        return state;
      } else {
        return {
          ...state,
          product: { 
            ...state.product, 
            product_variants: [...state.product.product_variants.filter(i=> i.id !== action.payload)] 
          } 
        };
      }
      
    case PRODUCT.FAVORITED:
      return {
        ...state,
        product: {
          ...state.product,
          favorites: [ action.payload ]
        }
      }

    case PRODUCT.UNFAVORITED:
      return {
        ...state,
        product: {
          ...state.product,
          favorites: undefined
        }
      };

    case REVIEW.CREATED:

      const review = action.payload;

      const summary = { ...state.product.review_summary };

      summary.total++;

      summary.ratings[review.rating-1] = summary.ratings[review.rating-1] + 1;

      const average = summary.ratings.reduce((prev, cur, i) => prev + (cur * (i+1)), 0);
      
      summary.average = average / summary.total;

      return {
        ...state,
        product: {
          ...state.product,
          reviews: [ review ],
          review_summary: summary
        }
      };
      
    case REVIEW.UPDATED:

      const reviewCur = action.payload;

      const reviewPrev = state.product.reviews[0];

      const summaryY = { ...state.product.review_summary };

      summaryY.ratings[reviewCur.rating-1] = summaryY.ratings[reviewCur.rating-1] + 1;

      summaryY.ratings[reviewPrev.rating-1] = summaryY.ratings[reviewPrev.rating-1] - 1;

      const averageY = summaryY.ratings.reduce((prev, cur, i) => prev + (cur * (i+1)), 0);

      summaryY.average = averageY / summaryY.total;

      return {
        ...state,
        product: {
          ...state.product,
          reviews: [ reviewCur ],
          review_summary: summaryY,
        }
      };
      
    case REVIEW.DELETED:

      const reviewX = state.product.reviews[0];

      const summaryX = { ...state.product.review_summary };

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
        product: {
          ...state.product,
          reviews: undefined,
          review_summary: summaryX
        }
      };

    default:
      return state;
  }
}

