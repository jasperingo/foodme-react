
import { PRODUCT } from "../AppActions";
import { useListFetchStatus } from "../AppHooks";


export default function ProductsReducer (state, action) {

  const fetchUpdater = useListFetchStatus();
  
  switch (action.type) {  

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
      
      state.products.products.pop();

      return {
        ...state,
        products: {
          productsFetchStatus: status,
          productsPage: state.products.productsPage+1,
          productsNumberOfPages: action.payload.productsNumberOfPages,
          products: [...state.products.products, ...action.payload.products, null],
        }
      };
    
    
    default:
      return state;
  }
}

