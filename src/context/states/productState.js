import { FETCH_STATUSES } from "../../repositories/Fetch";

const productState = {
  
  products: [],
  productsPage: 1,
  productsLoading: true,
  productsNumberOfPages: 0,
  productsFetchStatus: FETCH_STATUSES.LOADING,

  product: null,
  productID: null,
  productLoading: true,
  productFetchStatus: FETCH_STATUSES.LOADING,

  productVariant: null,
  productVariantID: null,
  productVariantLoading: true,
  productVariantFetchStatus: FETCH_STATUSES.LOADING,

  reviews: [],
  reviewsPage: 1,
  reviewsLoading: true,
  reviewsNumberOfPages: 0,
  reviewsFetchStatus: FETCH_STATUSES.LOADING,

  related: [],
  relatedPage: 1,
  relatedLoading: true,
  relatedNumberOfPages: 0,
  relatedFetchStatus: FETCH_STATUSES.LOADING
};

export default productState;
