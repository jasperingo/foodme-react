
import { FETCH_STATUSES, getStoresListFetchStatusAction, STORE } from "../context/AppActions";
import API from "./API";

export default class StoreApi extends API {

  async auth(formData) {

    const data = await this.apiFetch(
      'store/store.json',
      'GET', //'POST',
      //JSON.stringify(formData)
    );
    
    return data.data;
  }

  async update(formData) {
  
    const data = await this.apiFetch(
      'store/store.json',
      'GET', //'PUT',
      //JSON.stringify(formData)
    );
  
    return data.data;
  }

  async getList(dispatch) {
    try {
      const data = await this.apiFetch(
        `store/stores.json`,
        'GET'
      );
      
      dispatch({
        type: STORE.LIST_FETCHED,
        payload: {
          stores: data.data,
          storesNumberOfPages: data.total_pages
        }
      });

    } catch (err) {
      dispatch(getStoresListFetchStatusAction(FETCH_STATUSES.ERROR));
    }
  }

}
