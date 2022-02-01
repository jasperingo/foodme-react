import { FETCH_STATUSES } from "../../repositories/Fetch";

const savedCartState = {
  
  savedCarts: [],
  savedCartsPage: 1,
  savedCartsLoading: 1,
  savedCartsNumberOfPages: 0,
  savedCartsFetchStatus: FETCH_STATUSES.LOADING,
  
  savedCartItems: [],
  savedCartItemsFetchStatus: FETCH_STATUSES.LOADING,

};

export default savedCartState;

