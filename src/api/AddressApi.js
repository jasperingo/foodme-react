
import { 
  FETCH_STATUSES, 
  getAddressesListFetchStatusAction,
  ADDRESS,
  getAddressFetchStatusAction
} from "../context/AppActions";
import API from "./API";

export default class AddressApi extends API {

  async add(formData) {

    const data = await this.apiFetch(
      'address/get.json',
      'GET', //POST,
      JSON.stringify(formData)
    );
  
    return data;
  }

  async update(id, formData) {

    const data = await this.apiFetch(
      `/address/get.json?id=${id}`,
      'GET', //PUT,
      JSON.stringify(formData)
    );
  
    return data;
  }

  async delete(id) {

    const data = await this.apiFetch(
      `address/get.json?id=${id}`,
      'GET', //DELETE,
    );
  
    return data.data;
  }

  async getByCustomer(id, dispatch) {
  
    try {

      const data = await this.apiFetch(
        `address/get.json?=${id}`,
        'GET'
      );

      data.data.id = id;
  
      dispatch({
        type: ADDRESS.FETCHED,
        payload: data.data
      });
      
    } catch (err) {
      dispatch(getAddressFetchStatusAction(FETCH_STATUSES.ERROR));
    }
  }

  async getListByCustomer(id, dispatch) {
  
    try {
      
      const data = await this.apiFetch(
        `address/list.json?id=${id}`,
        'GET'
      );
  
      dispatch({
        type: ADDRESS.LIST_FETCHED,
        payload: data.data
      });
      
    } catch (err) {
      dispatch(getAddressesListFetchStatusAction(FETCH_STATUSES.ERROR));
    }
  }

}

