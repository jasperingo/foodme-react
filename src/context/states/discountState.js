import { FETCH_STATUSES } from "../../repositories/Fetch";

const discountState = {
  
  discounts: [],
  discountsPage: 1,
  discountsLoading: true,
  discountsNumberOfPages: 0,
  discountsFetchStatus: FETCH_STATUSES.LOADING,

  products: [],
  productsPage: 1,
  productsLoading: true,
  productsNumberOfPages: 0,
  productsFetchStatus: FETCH_STATUSES.LOADING,

  discount: null,
  discountID: null,
  discountLoading: true,
  discountFetchStatus: FETCH_STATUSES.LOADING,
  
};

export default discountState;
