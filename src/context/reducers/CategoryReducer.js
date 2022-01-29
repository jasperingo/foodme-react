import { CATEGORY } from "../actions/categoryActions";
import categoryState from "../states/categoryState";


export default function CategoryReducer (state, action) {
  
  switch (action.type) {  
    
    case CATEGORY.STORES_LIST_FETCH_STATUS_CHANGED:
      return {
        ...state,
        storesFetchStatus: action.payload
      };
    
    case CATEGORY.STORES_LIST_FETCHED:
      return {
        ...state,
        stores: action.payload.list, 
        storesFetchStatus: action.payload.fetchStatus
      };

    case CATEGORY.PRODUCTS_LIST_FETCH_STATUS_CHANGED:
      return {
        ...state,
        productsFetchStatus: action.payload
      };
    
    case CATEGORY.PRODUCTS_LIST_FETCHED:
      return {
        ...state,
        products: action.payload.list, 
        productsFetchStatus: action.payload.fetchStatus
      };
      
    case CATEGORY.UNFETCHED:
      return {
        ...state,
        category: categoryState.category,
        categoryFetchStatus: categoryState.categoryFetchStatus
      };
      
    case CATEGORY.FETCH_STATUS_CHANGED:
      return {
        ...state,
        categoryFetchStatus: action.payload
      };
    
    case CATEGORY.FETCHED:
      return {
        ...state,
        category: action.payload.category, 
        categoryFetchStatus: action.payload.fetchStatus
      };

    // case CATEGORIES.SUB_UNFETCH:
    //   return {
    //     ...state,
    //     category: {
    //       ...initialCategoriesState.category
    //     }
    //   };
      
    // case CATEGORIES.SUB_FETCH_STATUS_CHANGED:
    //   return {
    //     ...state,
    //     subCategory: {
    //       ...state.subCategory,
    //       subCategoryFetchStatus: action.payload
    //     }
    //   };
    
    // case CATEGORIES.SUB_FETCHED:
    //   return {
    //     ...state,
    //     subCategory: {
    //       subCategory: action.payload, 
    //       subCategoryFetchStatus: FETCH_STATUSES.DONE,
    //     }
    //   };

    default:
      return state;
  }
}

