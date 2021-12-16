
import { FETCH_STATUSES, getTransactionsListFetchStatusAction, TRANSACTION } from '../context/AppActions';
import API from './API';

export default class TransactionApi extends API {

  async getListByAdmin(dispatch) {
    try {
      const data = await this.apiFetch(
        `transactions.json`,
        'GET'
      );

      // data.data = []
      // data.total_pages=0;
      
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

