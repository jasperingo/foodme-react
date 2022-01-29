
import { FETCH_STATUSES } from "../../repositories/Fetch";

const transactionState = {

  wallet: null,
  walletFetchStatus: FETCH_STATUSES.LOADING,

  transaction: null,
  transactionFetchStatus: FETCH_STATUSES.LOADING,

  transactions: [],
  transactionsPage: 1,
  transactionsNumberOfPages: 0,
  transactionsFetchStatus: FETCH_STATUSES.LOADING,

};

export default transactionState;
