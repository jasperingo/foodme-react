import { PROMOTION } from "../actions/promotionActions";
import promotionState from "../states/promotionState";

export default function PromotionReducer (state, { payload, type }) {
  
  switch (type) {  

    case PROMOTION.LIST_UNFETCHED:
      return {
        ...state,
        promotions: promotionState.promotions,
        promotionsPage: promotionState.promotionsPage,
        promotionsError: promotionState.promotionsError,
        promotionsLoaded: promotionState.promotionsLoaded,
        promotionsLoading: promotionState.promotionsLoading,
        promotionsNumberOfPages: promotionState.promotionsNumberOfPages,
      };

    case PROMOTION.LIST_ERROR_CHANGED:
      return {
        ...state,
        promotionsLoading: false,
        promotionsError: payload.error
      }
    
    case PROMOTION.LIST_FETCHING:
      return {
        ...state,
        promotionsLoading: true
      };

    case PROMOTION.LIST_FETCHED:
      return {
        ...state,
        promotionsLoaded: true,
        promotionsLoading: false,
        promotionsPage: state.promotionsPage + 1,
        promotionsNumberOfPages: payload.numberOfPages,
        promotions: [...state.promotions, ...payload.list]
      };


    case PROMOTION.UNFETCHED:
      return {
        ...state,
        promotion: promotionState.promotion,
        promotionID: promotionState.promotionID,
        promotionError: promotionState.promotionError,
        promotionLoading: promotionState.promotionLoading,
      };

    case PROMOTION.DELETED:
      return {
        ...state,
        promotion: promotionState.promotion,
        promotionID: promotionState.promotionID,
        promotionError: promotionState.promotionError,
        promotionLoading: promotionState.promotionLoading,
        promotions: state.promotions.filter(i=> i.id !== Number(payload.id))
      };

    case PROMOTION.ERROR_CHANGED:
      return {
        ...state,
        promotionLoading: false,
        promotionID: payload.id, 
        promotionError: payload.error
      }
    
    case PROMOTION.FETCHING:
      return {
        ...state,
        promotionError: null,
        promotionLoading: true
      };

    case PROMOTION.FETCHED:
      return {
        ...state,
        promotionLoading: false,
        promotionID: payload.id,
        promotion: payload.promotion,
      };

    default:
      return state;
  }
}
