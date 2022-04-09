import { FETCH_STATUSES } from "../../repositories/Fetch";

const productState = {
  
  products: [],
  productsPage: 1,
  productsLoading: true,
  productsNumberOfPages: 0,
  productsFetchStatus: FETCH_STATUSES.LOADING,

  product: null,
  productID: null,
  productError: null,
  productLoading: false,

  productVariant: null,
  productVariantID: null,
  productVariantLoading: true,
  productVariantFetchStatus: FETCH_STATUSES.LOADING,

  reviews: [],
  reviewsPage: 1,
  reviewsError: null,
  reviewsLoaded: false,
  reviewsLoading: false,
  reviewsNumberOfPages: 0,

  related: [],
  relatedPage: 1,
  relatedError: null,
  relatedLoaded: false,
  relatedLoading: false,
  relatedNumberOfPages: 0
};

export default productState;
