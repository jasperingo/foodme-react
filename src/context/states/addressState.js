import { FETCH_STATUSES } from "../../repositories/Fetch";

const addressState = {
  
  addresses: [],
  addressesFetchStatus: FETCH_STATUSES.LOADING,
  
  address: null,
  addressID: null,
  addressFetchStatus: FETCH_STATUSES.LOADING,

  locations: [],
  locationsFetchStatus: FETCH_STATUSES.LOADING,
  
};

export default addressState;
