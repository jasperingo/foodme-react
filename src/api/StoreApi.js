
import { FETCH_STATUSES, getStoreFetchStatusAction, getStoresListFetchStatusAction, STORE } from "../context/AppActions";
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

  async get(id, dispatch) {
    try {
      const data = await this.apiFetch(
        `store/store.json?id=${id}`,
        'GET'
      );

      data.data.id = id;
      
      dispatch({
        type: STORE.FETCHED,
        payload: data.data
      });

    } catch (err) {
      dispatch(getStoreFetchStatusAction(FETCH_STATUSES.ERROR));
    }
  }

  async getListByRecommended(dispatch) {
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

  async getListByRecent(dispatch) {
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
