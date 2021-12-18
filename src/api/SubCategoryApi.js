
import { CATEGORIES, FETCH_STATUSES, getSubCategoryFetchStatusAction } from "../context/AppActions";
import API from "./API";

export default class SubCategoryApi extends API {

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

  async updatePhoto(id, formData) {
    const data = await this.apiFetch(
      `category/post.json?id=${id}`, 
      'GET', //'PUT',
      formData
    );
  
    return data.data;
  }

  async get(id, dispatch) {
    try {
      const data = await this.apiFetch(
        `category/sub.json?id=${id}`,
        'GET'
      );

      data.data.id = id;
      
      dispatch({
        type: CATEGORIES.SUB_FETCHED,
        payload: data.data
      });

    } catch (err) {
      dispatch(getSubCategoryFetchStatusAction(FETCH_STATUSES.ERROR));
    }
  }

}

