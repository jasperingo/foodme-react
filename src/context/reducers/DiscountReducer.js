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


    case DISCOUNT.PRODUCT_LIST_UNFETCHED:
      return {
        ...state,
        discountProductsPage: 1,
        discountProductsLoading: true,
        discountProductsNumberOfPages: 0,
        discountProducts: discountState.discountProducts,
        discountProductsFetchStatus: discountState.discountProductsFetchStatus
      };
  
    case DISCOUNT.PRODUCT_LIST_FETCH_STATUS_CHANGED:
      return {
        ...state,
        discountProductsLoading: payload.loading,
        discountProductsFetchStatus: payload.fetchStatus
      };
      
    case DISCOUNT.PRODUCT_LIST_FETCHED:
      return {
        ...state,
        discountProductsLoading: false,
        discountProductsPage: state.discountProductsPage+1,
        discountProductsFetchStatus: payload.fetchStatus,
        discountProductsNumberOfPages: payload.numberOfPages,
        discountProducts: [...state.discountProducts, ...payload.list],
      };


    case DISCOUNT.PRODUCT_CREATED:
      return {
        ...state,
        products: [...state.products.map(i=> {
          if (i.id === payload.discountProduct.product_id) {
            return {
              ...i,
              discount_products: [payload.discountProduct]
            }
          }
          return i;
        })]
      };
    
    case DISCOUNT.PRODUCT_DELETED:
      return {
        ...state,
        products: [...state.products.map(i=> {
          if (i.discount_products.length > 0 && i.discount_products[0].id === payload.discountProductID) {
            return {
              ...i,
              discount_products: []
            }
          }
          return i;
        })]
      };

    case PRODUCT.LIST_UNFETCHED:
      return {
        ...state,
        productsPage: 1,
        productsLoading: true,
        productsNumberOfPages: 0,
        products: discountState.products,
        productsFetchStatus: discountState.productsFetchStatus
      };
  
    case PRODUCT.LIST_FETCH_STATUS_CHANGED:
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

