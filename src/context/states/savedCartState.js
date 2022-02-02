import { FETCH_STATUSES } from "../../repositories/Fetch";

const savedCartState = {
  
  savedCarts: [],
  savedCartsPage: 1,
  savedCartsLoading: true,
  savedCartsNumberOfPages: 0,
  savedCartsFetchStatus: FETCH_STATUSES.LOADING,
  
  savedCart: null,
  savedCartID: null,
  savedCartLoading: true,
  savedCartFetchStatus: FETCH_STATUSES.LOADING,

};

export default savedCartState;

