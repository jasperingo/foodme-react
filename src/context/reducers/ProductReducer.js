import { useReviewCreatedSummary, useReviewDeletedSummary, useReviewUpdatedSummary } from "../../hooks/review/reviewSummaryHook";
import { PRODUCT } from "../actions/productActions";
import { REVIEW } from "../actions/reviewActions";
import productState from "../states/productState";

export default function ProductReducer (state, action) {

  const onReviewCreated = useReviewCreatedSummary();
  const onReviewUpdated = useReviewUpdatedSummary();
  const onReviewDeleted = useReviewDeletedSummary();
  
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
        productVariantError: productState.productVariantError,
        productVariantLoading: productState.productVariantLoading
      };
    
    case PRODUCT.VARIANT_FETCHING:
      return {
        ...state,
        productVariantError: null,
        productVariantLoading: true
      };

    case PRODUCT.VARIANT_ERROR_CHANGED:
      return {
        ...state,
        productVariantLoading: false,
        productVariantID: action.payload.id,
        productVariantError: action.payload.error
      };
    
    case PRODUCT.VARIANT_FETCHED:
      return {
        ...state,
        productVariantLoading: false,
        productVariantID: action.payload.id,
        productVariant: action.payload.productVariant
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
            product_variants: [...state.product.product_variants, action.payload.productVariant] 
          } 
        };
      }

    case PRODUCT.VARIANT_UPDATED: 
      if (!state.product) {
        return state;
      } else {
        const variant = action.payload.productVariant;
        return {
          ...state,
          product: { 
            ...state.product, 
            product_variants: state.product.product_variants.map(i=> (i.id === variant.id) ? variant : i)
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
            product_variants: state.product.product_variants.filter(i=> i.id !== action.payload.id) 
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

      const review = action.payload.review;
      
      return {
        ...state,
        product: {
          ...state.product,
          reviews: [ review ],
          review_summary: onReviewCreated(review, { ...state.product.review_summary })
        }
      };
      
    case REVIEW.UPDATED:

      const reviewCur = action.payload.review;

      return {
        ...state,
        product: {
          ...state.product,
          reviews: [ reviewCur ],
          review_summary: onReviewUpdated(reviewCur, state.product.reviews[0], { ...state.product.review_summary }),
        }
      };
      
    case REVIEW.DELETED:
      return {
        ...state,
        product: {
          ...state.product,
          reviews: undefined,
          review_summary: onReviewDeleted(state.product.reviews[0], { ...state.product.review_summary })
        }
      };

    default:
      return state;
  }
}

