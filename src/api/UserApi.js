
import { CUSTOMER, FETCH_STATUSES, getCustomerFetchStatusAction, getCustomersListFetchStatusAction } from "../context/AppActions";
import API from "./API";

export default class UserApi extends API {

  async auth(formData) {

    const data = await this.apiFetch(
      'customer/get.json',
      'GET', //'POST',
      JSON.stringify(formData)
    );
    
    return data;
  }

  async forgotPassword(formData) {

    const data = await this.apiFetch(
      'forgot-password.json',
      'GET', //'POST',
      JSON.stringify(formData)
    );
  
    return data;
  }

  async update(id, formData) {
  
    const data = await this.apiFetch(
      `customer/get.json?id=${id}`,
      'GET', //'PUT',
      JSON.stringify(formData)
    );
  
    return data;
  }

  async updatePhoto(id, formData) {

    const data = await this.apiFetch(
      `customer/get.json?id=${id}`, 
      'GET', //'PUT',
      formData
    );
  
    return data;
  }

  async updatePassword(id, formData) {

    const data = await this.apiFetch(
      `customer/get.json?id=${id}`,
      'GET', //'PUT',
      JSON.stringify(formData)
    );
  
    return data;
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

  async getListByRecent(dispatch) {
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

