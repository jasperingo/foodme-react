import { DISCOUNT } from "../actions/discountActions";
import { PRODUCT } from "../actions/productActions";
import discountState from "../states/discountState";

export default function DiscountReducer (state, { type, payload }) {
  
  switch (type) {  

    case DISCOUNT.UNFETCHED:
      return { ...discountState };
    
    case DISCOUNT.FETCHING:
      return {
        ...state,
        discountError: null,
        discountLoading: true,
      };
    
    case DISCOUNT.ERROR_CHANGED:
      return {
        ...state,
        discountLoading: false,
        discountID: payload.id,
        discountError: payload.error
      };

    case DISCOUNT.FETCHED:
      return {
        ...state,
        discountLoading: false,
        discountID: payload.id,
        discount: payload.discount
      };


    case DISCOUNT.PRODUCT_LIST_UNFETCHED:
      return {
        ...state,
        discountProducts: discountState.discountProducts,
        discountProductsPage: discountState.discountProductsPage,
        discountProductsError: discountState.discountProductsError,
        discountProductsLoaded: discountState.discountProductsLoaded,
        discountProductsLoading: discountState.discountProductsLoading,
        discountProductsNumberOfPages: discountState.discountProductsNumberOfPages
      };
  
    case DISCOUNT.PRODUCT_LIST_FETCHING:
      return {
        ...state,
        discountProductsError: null,
        discountProductsLoading: true
      };

    case DISCOUNT.PRODUCT_LIST_ERROR_CHANGED:
      return {
        ...state,
        discountProductsLoading: false,
        discountProductsError: payload.error
      };
      
    case DISCOUNT.PRODUCT_LIST_FETCHED:
      return {
        ...state,
        discountProductsLoaded: true,
        discountProductsLoading: false,
        discountProductsPage: state.discountProductsPage + 1,
        discountProductsNumberOfPages: payload.numberOfPages,
        discountProducts: [...state.discountProducts, ...payload.list],
      };


    case DISCOUNT.PRODUCT_CREATED:
      return {
        ...state,
        products: state.products.map(i=> {
          if (i.id === payload.discountProduct.product_id) {
            return {
              ...i,
              discount_products: [payload.discountProduct]
            }
          }
          return i;
        })
      };
    
    case DISCOUNT.PRODUCT_DELETED:
      return {
        ...state,
        products: state.products.map(i=> {
          if (i.discount_products.length > 0 && i.discount_products[0].id === payload.discountProductID) {
            return {
              ...i,
              discount_products: []
            }
          }
          return i;
        })
      };

    
    case PRODUCT.LIST_UNFETCHED:
      return {
        ...state,
        products: discountState.products,
        productsPage: discountState.productsPage,
        productsError: discountState.productsError,
        productsLoaded: discountState.productsLoaded,
        productsLoading: discountState.productsLoading,
        productsNumberOfPages: discountState.productsNumberOfPages
      };

    case PRODUCT.LIST_ERROR_CHANGED:
      return {
        ...state,
        productsLoading: false,
        productsError: payload.error
      };

    case PRODUCT.LIST_FETCHING:
      return {
        ...state,
        productsError: null,
        productsLoading: true
      };
    
    case PRODUCT.LIST_FETCHED:
      return {
        ...state,
        productsLoaded: true,
        productsLoading: false,
        productsPage: state.productsPage + 1,
        productsNumberOfPages: payload.numberOfPages,
        products: [...state.products, ...payload.list],
      };
  
    
    default:
      return state;
  }
}

