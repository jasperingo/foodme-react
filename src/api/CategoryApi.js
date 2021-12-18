
import { 
  CATEGORIES, 
  FETCH_STATUSES,
  getCategoriesListFetchStatusAction, 
  getCategoriesProductFetchStatusAction, 
  getCategoriesStoreFetchStatusAction, 
  getCategoryFetchStatusAction 
} from "../context/AppActions";
import API from "./API";

export default class CategoryApi extends API {

  async add(formData) {
    const data = await this.apiFetch(
      'category/post.json', 
      'GET', //'POST',
      formData
    );
  
    return data.data;
  }

  async update(id, formData) {
    const data = await this.apiFetch(
      `category/post.json?id=${id}`, 
      'GET', //'PUT',
      formData
    );
  
    return data.data;
  }

  async updatePhoto(formData) {
    const data = await this.apiFetch(
      'category/post.json', 
      'GET', //'PUT',
      formData
    );
  
    return data.data;
  }

  async get(id, dispatch) {
    try {
      const data = await this.apiFetch(
        `category/get.json?id=${id}`,
        'GET'
      );

      data.data.id = id;
      
      dispatch({
        type: CATEGORIES.FETCHED,
        payload: data.data
      });

    } catch (err) {
      dispatch(getCategoryFetchStatusAction(FETCH_STATUSES.ERROR));
    }
  }

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

  async getListByRecommended(dispatch) {
    try {
      const data = await this.apiFetch(
        `category/recommended.json`,
        'GET'
      );
      
      dispatch({
        type: CATEGORIES.LIST_FETCHED,
        payload: data.data,
      });

    } catch (err) {
      dispatch(getCategoriesListFetchStatusAction(FETCH_STATUSES.ERROR));
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
