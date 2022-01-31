
export const TRANSACTION = {
  UNFETCHED: 'TRANSACTION_UNFETCHED',
  FETCHED: 'TRANSACTION_FETCHED',
  FETCH_STATUS_CHANGED: 'TRANSACTION_FETCH_STATUS_CHANGED',
  
  LIST_FETCHED: 'TRANSACTIONS_FETCHED',
  LIST_UNFETCHED: 'TRANSACTIONS_UNFETCHED',
  LIST_FETCH_STATUS_CHANGED: 'TRANSACTIONS_FETCH_STATUS_CHANGED',
};

export const getTransactionFetchStatusAction = (fetchStatus, id) => ({
  type: TRANSACTION.FETCH_STATUS_CHANGED,
  payload: {
    fetchStatus, id
  }
});

export const getTransactionsListFetchStatusAction = (payload) => ({
  type: TRANSACTION.LIST_FETCH_STATUS_CHANGED,
  payload
});


