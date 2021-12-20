
import { FETCH_STATUSES, getTransactionFetchStatusAction, getTransactionsListFetchStatusAction, TRANSACTION } from '../context/AppActions';
import API from './API';

export default class TransactionApi extends API {

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

