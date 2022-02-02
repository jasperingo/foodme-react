import { FETCH_STATUSES } from "../../repositories/Fetch";

const addressState = {
  
  addresses: [],
  addressesLoading: true,
  addressesFetchStatus: FETCH_STATUSES.LOADING,
  
  address: null,
  addressID: null,
  addressLoading: true,
  addressFetchStatus: FETCH_STATUSES.LOADING,

  locations: [],
  locationsFetchStatus: FETCH_STATUSES.LOADING,
  
};

export default addressState;
