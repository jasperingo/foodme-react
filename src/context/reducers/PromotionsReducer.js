
import { FETCH_STATUSES, PRODUCT, PROMOTION } from "../AppActions";
import { useListFetchStatus } from "../AppHooks";
import { initialPromotionsState } from "../AppInitialStates";


export default function PromotionsReducer (state, action) {

  const fetchUpdater = useListFetchStatus();
  
  switch (action.type) {  

    case PROMOTION.UNFETCH:
      return initialPromotionsState;

    case PROMOTION.LIST_FETCH_STATUS_CHANGED :
      return {
        ...state,
        promotions: {
          ...state.promotions,
          promotionsFetchStatus: action.payload
        }
      };
    
    case PROMOTION.LIST_FETCHED :
      let status = fetchUpdater(
        state.promotions.promotionsPage, 
        action.payload.promotionsNumberOfPages, 
        state.promotions.promotions.length, 
        action.payload.promotions.length
      );
      
      state.promotions.promotions.pop();

      return {
        ...state,
        promotions: {
          promotionsFetchStatus: status,
          promotionsPage: state.promotions.promotionsPage+1,
          promotionsNumberOfPages: action.payload.promotionsNumberOfPages,
          promotions: [...state.promotions.promotions, ...action.payload.promotions, null],
        }
      };

    case PROMOTION.FETCH_STATUS_CHANGED :
      return {
        ...state,
        promotion: {
          promotion: state.promotion.promotion,
          promotionFetchStatus: action.payload
        }
      };
    
    case PROMOTION.FETCHED :
      return {
        ...state,
        promotion: {
          promotion: action.payload, 
          promotionFetchStatus: FETCH_STATUSES.DONE,
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
      let status2 = fetchUpdater(
        state.products.productsPage,
        action.payload.productsNumberOfPages,
        state.products.products.length,
        action.payload.products.length
      );
      
      state.products.products.pop();

      return {
        ...state,
        products: {
          productsFetchStatus: status2,
          productsPage: state.products.productsPage+1,
          productsCategory: state.products.productsCategory,
          productsNumberOfPages: action.payload.productsNumberOfPages,
          products: [...state.products.products, ...action.payload.products, null],
        }
      };
    
    
    default:
      return state;
  }
}

