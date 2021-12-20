
import { FETCH_STATUSES, getSavedCartsListFetchStatusAction, SAVED_CART } from "../context/AppActions";
import API from "./API";

export default class SavedCartApi extends API {
  
  async delete(id) {
    
    const data = await this.apiFetch(
      `saved-cart/get.json?code=${id}`,
      'GET' //'DELETE'
    );

    return data;
  }

  async get(id) {
    
    const data = await this.apiFetch(
      `saved-cart/get.json?code=${id}`,
      'GET'
    );

    return data;
  }

  async getListByCustomer(id, page, dispatch) {
    try {
      const data = await this.apiFetch(
        `saved-cart/list.json?id=${id}&page=${page}`,
        'GET'
      );
      
      dispatch({
        type: SAVED_CART.LIST_FETCHED,
        payload: {
          savedCarts: data.data,
          savedCartsNumberOfPages: data.total_pages
        }
      });

    } catch (err) {
      dispatch(getSavedCartsListFetchStatusAction(FETCH_STATUSES.ERROR));
    }
  }

  async getListByStore(id, page, dispatch) {
    try {
      const data = await this.apiFetch(
        `saved-cart/list.json?id=${id}&page=${page}`,
        'GET'
      );
      
      dispatch({
        type: SAVED_CART.LIST_FETCHED,
        payload: {
          savedCarts: data.data,
          savedCartsNumberOfPages: data.total_pages
        }
      });

    } catch (err) {
      dispatch(getSavedCartsListFetchStatusAction(FETCH_STATUSES.ERROR));
    }
  }
}
