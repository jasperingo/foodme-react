import { CATEGORY } from "../actions/categoryActions";
import subCategoryState from "../states/subCategoryState";

export default function SubCategoryReducer (state, { type, payload }) {
  
  switch (type) {  
      
    case CATEGORY.UNFETCHED:
      return {
        ...state,
        subCategory: subCategoryState.subCategory,
        subCategoryID: subCategoryState.subCategoryID,
        subCategoryFetchStatus: subCategoryState.subCategoryFetchStatus
      };
      
    case CATEGORY.FETCH_STATUS_CHANGED:
      return {
        ...state,
        subCategoryID: payload.id,
        subCategoryFetchStatus: payload.fetchStatus
      };
    
    case CATEGORY.FETCHED:
      return {
        ...state,
        subCategory: payload.subCategory, 
        subCategoryID: payload.subCategory.id, 
        subCategoryFetchStatus: payload.fetchStatus
      };

    default: 
      return state;
  }

}

