
import { FETCH_STATUSES } from "../../repositories/Fetch";

const transactionState = {

  wallet: null,
  walletFetchStatus: FETCH_STATUSES.LOADING,

  transaction: null,
  transactionID: null,
  transactionError: null,
  transactionLoading: false,

  transactions: [],
  transactionsPage: 1,
  transactionsType: null,
  transactionsError: null,
  transactionsLoading: true,
  transactionsNumberOfPages: 0

};

export default transactionState;
