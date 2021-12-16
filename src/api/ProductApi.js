
import { FETCH_STATUSES, PRODUCT, getProductFetchStatusAction } from "../context/AppActions";
import API from "./API";

export default class ProductApi extends API {

  async add(formData) {
    const data = await this.apiFetch(
      'post/auth-customer.json', 
      'GET', //'POST',
      formData
    );
  
    return data.data;
  }

  async update(id, formData) {
    const data = await this.apiFetch(
      `post/auth-customer.json?id=${id}`, 
      'GET', //'PUT',
      formData
    );
  
    return data.data;
  }

  async updatePhoto(formData) {
    const data = await this.apiFetch(
      'post/auth-customer.json', 
      'GET', //'PUT',
      formData
    );
  
    return data.data;
  }

  async get(id, dispatch) {
    
    try {
      const data = await this.apiFetch(
        `product.json?id=${id}`,
        'GET'
      );

      data.data.id = id;

      dispatch({
        type: PRODUCT.FETCHED,
        payload: data.data
      });
      
    } catch (err) {
      dispatch(getProductFetchStatusAction(FETCH_STATUSES.ERROR));
    }
  }

}


