import { DISCOUNT } from "../actions/discountActions";
import { PRODUCT } from "../actions/productActions";
import discountState from "../states/discountState";


export default function DiscountReducer (state, { type, payload }) {
  
  switch (type) {  

    case DISCOUNT.UNFETCHED:
      return {
        ...discountState,
        discounts: state.discounts,
        discountsPage: state.discountsPage,
        discountsLoading: state.discountsLoading,
        discountsNumberOfPages: state.discountsNumberOfPages,
        discountsFetchStatus: state.discountsFetchStatus
      };
    
    case DISCOUNT.FETCH_STATUS_CHANGED :
      return {
        ...state,
        discountID: payload.id,
        discountLoading: payload.loading,
        discountFetchStatus: payload.fetchStatus
      };
    
    case DISCOUNT.FETCHED :
      return {
        ...state,
        discountLoading: false,
        discount: payload.discount, 
        discountID: payload.discount.id,
        discountFetchStatus: payload.fetchStatus,
      };

    // case PROMOTION.LIST_FETCH_STATUS_CHANGED :
    //   return {
    //     ...state,
    //     promotions: {
    //       ...state.promotions,
    //       promotionsFetchStatus: action.payload
    //     }
    //   };
    
    // case PROMOTION.LIST_FETCHED :
    //   let status = fetchUpdater(
    //     state.promotions.promotionsPage, 
    //     action.payload.promotionsNumberOfPages, 
    //     state.promotions.promotions.length, 
    //     action.payload.promotions.length
    //   );
      
    //   state.promotions.promotions.pop();

    //   return {
    //     ...state,
    //     promotions: {
    //       promotionsFetchStatus: status,
    //       promotionsPage: state.promotions.promotionsPage+1,
    //       promotionsNumberOfPages: action.payload.promotionsNumberOfPages,
    //       promotions: [...state.promotions.promotions, ...action.payload.promotions, null],
    //     }
    //   };
    
    case PRODUCT.LIST_UNFETCHED:
      return {
        ...state,
        productsPage: 1,
        productsLoading: true,
        productsNumberOfPages: 0,
        products: discountState.products,
        productsFetchStatus: discountState.productsFetchStatus
      }
  
    case PRODUCT.LIST_FETCH_STATUS_CHANGED :
      return {
        ...state,
        productsLoading: payload.loading,
        productsFetchStatus: payload.fetchStatus
      };
      
    case PRODUCT.LIST_FETCHED:
      return {
        ...state,
        productsLoading: false,
        productsPage: state.productsPage+1,
        productsFetchStatus: payload.fetchStatus,
        productsNumberOfPages: payload.numberOfPages,
        products: [...state.products, ...payload.list],
      };
    
    
    default:
      return state;
  }
}

