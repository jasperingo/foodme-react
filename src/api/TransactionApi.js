
import { 
  FETCH_STATUSES, 
  getTransactionFetchStatusAction, 
  getTransactionsListFetchStatusAction, 
  getWalletFetchStatusAction, 
  TRANSACTION, 
  WALLET 
} from '../context/AppActions';
import API from './API';

export default class TransactionApi extends API {
  
  async withdraw(form) {
    
    const data = await this.apiFetch(
      `transaction/withdraw.json`,
      'GET', //POST,
      JSON.stringify(form)
    );
    
    return data;
  }

  async get(id, dispatch) {
    try {
      const data = await this.apiFetch(
        `transaction/get.json?id=${id}`,
        'GET'
      );

      data.data.reference_code = id;
      
      dispatch({
        type: TRANSACTION.FETCHED,
        payload: data.data
      });

    } catch (err) {
      dispatch(getTransactionFetchStatusAction(FETCH_STATUSES.ERROR));
    }
  }

  async getWallet(id, dispatch) {
    try {
      const data = await this.apiFetch(
        `transaction/wallet.json?id=${id}`,
        'GET'
      );
      
      dispatch({
        type: WALLET.FETCHED,
        payload: data.data
      });

    } catch (err) {
      dispatch(getWalletFetchStatusAction(FETCH_STATUSES.ERROR));
    }
  }

  async getListByAdmin(dispatch) {
    try {
      const data = await this.apiFetch(
        `transaction/list.json`,
        'GET'
      );
      
      dispatch({
        type: TRANSACTION.LIST_FETCHED,
        payload: {
          transactions: data.data,
          transactionsNumberOfPages: data.total_pages
        }
      });

    } catch (err) {
      dispatch(getTransactionsListFetchStatusAction(FETCH_STATUSES.ERROR));
    }
  }

  async getListByCustomer(id, page, dispatch) {
    try {
      const data = await this.apiFetch(
        `transaction/list.json?id=${id}&page=${page}`,
        'GET'
      );
      
      dispatch({
        type: TRANSACTION.LIST_FETCHED,
        payload: {
          transactions: data.data,
          transactionsNumberOfPages: data.total_pages
        }
      });

    } catch (err) {
      dispatch(getTransactionsListFetchStatusAction(FETCH_STATUSES.ERROR));
    }
  }

  async getListByStore(id, page, dispatch) {
    try {
      const data = await this.apiFetch(
        `transaction/list.json?id=${id}&page=${page}`,
        'GET'
      );
      
      dispatch({
        type: TRANSACTION.LIST_FETCHED,
        payload: {
          transactions: data.data,
          transactionsNumberOfPages: data.total_pages
        }
      });

    } catch (err) {
      dispatch(getTransactionsListFetchStatusAction(FETCH_STATUSES.ERROR));
    }
  }

}

