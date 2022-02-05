
export const DELIVERY_FIRM = {
  FETCHED: 'DELIVERY_FIRM_FETCHED',
  UNFETCHED: 'DELIVERY_FIRM_UNFETCHED',
  FETCH_STATUS_CHANGED: 'DELIVERY_FIRM_FETCH_STATUS_CHANGED',
  
  LIST_FETCHED: 'DELIVERY_FIRMS_FETCHED',
  LIST_UNFETCHED: 'DELIVERY_FIRMS_UNFETCHED',
  LIST_FETCH_STATUS_CHANGED: 'DELIVERY_FIRMS_FETCH_STATUS_CHANGED',
};

export const getDeliveryFirmFetchStatusAction = (fetchStatus, id, loading) => ({
  type: DELIVERY_FIRM.FETCH_STATUS_CHANGED,
  payload: {
    fetchStatus, id, loading
  }
});

export const getDeliveryFirmsListFetchStatusAction = (fetchStatus, loading) => ({
  type: DELIVERY_FIRM.LIST_FETCH_STATUS_CHANGED,
  payload: {
    fetchStatus, loading
  }
});
