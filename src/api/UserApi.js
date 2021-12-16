
import { CUSTOMER, FETCH_STATUSES, getCustomerFetchStatusAction, getCustomersListFetchStatusAction } from "../context/AppActions";
import API from "./API";

export default class UserApi extends API {

  async auth(formData) {

    const data = await this.apiFetch(
      'post/auth-customer.json',
      'GET', //'POST',
      //JSON.stringify(formData)
    );
    
    return data.data;
  }

  async forgotPassword(formData) {

    const data = await this.apiFetch(
      'forgot-password.json',
      'GET', //'POST',
      //JSON.stringify(formData)
    );
  
    return data.data;
  }

  async update(formData) {
  
    const data = await this.apiFetch(
      'post/auth-customer.json',
      'GET', //'PUT',
      //JSON.stringify(formData)
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

  async updatePassword(formData) {

    const data = await this.apiFetch(
      'success.json',
      'GET', //'POST',
      //JSON.stringify(formData)
    );
  
    return data.data;
  }

  async get(id, dispatch) {
    try {
      const data = await this.apiFetch(
        `customer/get.json?id=${id}`,
        'GET'
      );

      data.data.id = id;
      
      dispatch({
        type: CUSTOMER.FETCHED,
        payload: data.data
      });

    } catch (err) {
      dispatch(getCustomerFetchStatusAction(FETCH_STATUSES.ERROR));
    }
  }

  async getList(dispatch) {
    try {
      const data = await this.apiFetch(
        `customer/list.json`,
        'GET'
      );
      
      dispatch({
        type: CUSTOMER.LIST_FETCHED,
        payload: {
          customers: data.data,
          customersNumberOfPages: data.total_pages
        }
      });

    } catch (err) {
      dispatch(getCustomersListFetchStatusAction(FETCH_STATUSES.ERROR));
    }
  }

}

