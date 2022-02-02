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
        productsLoading: state.productsLoading,
        productsNumberOfPages: state.productsNumberOfPages,
        productsFetchStatus: state.productsFetchStatus
      };
    
    case PRODUCT.FETCH_STATUS_CHANGED:
      return {
        ...state,
        productID: action.payload.id,
        productLoading: action.payload.loading,
        productFetchStatus: action.payload.fetchStatus
      };
    
    case PRODUCT.FETCHED:
      return {
        ...state,
        productLoading: false,
        product: action.payload.product,
        productID: action.payload.product.id,
        productFetchStatus: action.payload.fetchStatus
      };

    case REVIEW.LIST_FETCH_STATUS_CHANGED:
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
      
    case PRODUCT.RELATED_LIST_FETCH_STATUS_CHANGED:
      return {
        ...state,
        relatedLoading: action.payload.loading,
        relatedFetchStatus: action.payload.fetchStatus
      };
    
    case PRODUCT.RELATED_LIST_FETCHED:
      return {
        ...state,
        relatedLoading: false,
        relatedPage: state.relatedPage+1,
        relatedFetchStatus: action.payload.fetchStatus,
        relatedNumberOfPages: action.payload.numberOfPages,
        related: [...state.related, ...action.payload.list],
      };

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

