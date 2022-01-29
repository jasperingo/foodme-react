
export const BANK = {
  LIST_FETCHED: 'BANKS_FETCHED',
  LIST_FETCH_STATUS_CHANGED: 'BANKS_FETCH_STATUS_CHANGED',
};

export const getBanksListFetchStatusAction = (payload) => ({
  type: BANK.LIST_FETCH_STATUS_CHANGED,
  payload
});

