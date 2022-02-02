
export const ADDRESS = {
  FETCHED: 'ADDRESS_FETCHED',
  UNFETCHED: 'ADDRESS_UNFETCHED',
  FETCH_STATUS_CHANGED: 'ADDRESS_FETCH_STATUS_CHANGED',
  
  LIST_FETCHED: 'ADDRESSES_LIST_FETCHED',
  LIST_UNFETCHED: 'ADDRESSES_LIST_UNFETCHED',
  LIST_FETCH_STATUS_CHANGED: 'ADDRESSES_LIST_FETCH_STATUS_CHANGED',

  LOCATIONS_LIST_FETCHED: 'LOCATIONS_LIST_FETCHED',
  LOCATIONS_LIST_FETCH_STATUS_CHANGED: 'LOCATIONS_LIST_FETCH_STATUS_CHANGED',
};

export const getAddressesListFetchStatusAction = (fetchStatus, loading) => ({
  type: ADDRESS.LIST_FETCH_STATUS_CHANGED,
  payload: {
    fetchStatus, loading
  }
});

export const getAddressFetchStatusAction = (fetchStatus, id, loading) => ({
  type: ADDRESS.FETCH_STATUS_CHANGED,
  payload: {
    fetchStatus, id, loading
  }
});

export const getLocationsListFetchStatusAction = (payload) => ({
  type: ADDRESS.LOCATIONS_LIST_FETCH_STATUS_CHANGED,
  payload
});

