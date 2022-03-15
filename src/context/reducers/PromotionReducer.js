import { PROMOTION } from "../actions/promotionActions";

export default function PromotionReducer (state, { payload, type }) {
  
  switch (type) {  

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
        promotions: payload.list
      };

    default:
      return state;
  }
}
