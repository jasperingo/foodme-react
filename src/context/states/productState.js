import { FETCH_STATUSES } from "../../repositories/Fetch";

const productState = {
  
  products: [],
  productsPage: 1,
  productsNumberOfPages: 0,
  productsFetchStatus: FETCH_STATUSES.LOADING,

  product: null,
  productID: null,
  productFetchStatus: FETCH_STATUSES.LOADING,

  reviews: [],
  reviewsPage: 1,
  reviewsNumberOfPages: 0,
  reviewsFetchStatus: FETCH_STATUSES.LOADING,

  related: [],
  relatedPage: 1,
  relatedNumberOfPages: 0,
  relatedFetchStatus: FETCH_STATUSES.LOADING
};

export default productState;
