
import { CATEGORIES, FETCH_STATUSES, getCategoriesProductFetchStatusAction, getCategoriesStoreFetchStatusAction } from "../context/AppActions";
import API from "./API";

export default class CategoryApi extends API {

  async getListByStore(dispatch) {
    try {
      const data = await this.apiFetch(
        `category/store.json`,
        'GET'
      );
      
      dispatch({
        type: CATEGORIES.STORES_FETCHED,
        payload: data.data,
      });

    } catch (err) {
      dispatch(getCategoriesStoreFetchStatusAction(FETCH_STATUSES.ERROR));
    }
  }

  async getListByProduct(dispatch) {
    try {
      const data = await this.apiFetch(
        `category/product.json`,
        'GET'
      );
      
      dispatch({
        type: CATEGORIES.PRODUCTS_FETCHED,
        payload: data.data,
      });

    } catch (err) {
      dispatch(getCategoriesProductFetchStatusAction(FETCH_STATUSES.ERROR));
    }
  }

}
