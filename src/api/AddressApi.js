
import { 
  USER_ADDRESS,
  FETCH_STATUSES, 
  getUserAddressFetchStatusAction, 
  getUserAddressListFetchStatusAction
} from "../context/AppActions";
import API from "./API";

export default class AddressApi extends API {

  async add(formData) {

    let response = await this.apiFetch(
      'customer/address.json',
      'GET', //PUT,
      //JSON.stringify(formData)
    );
  
    if (!response.status >= 500)
      throw new Error(response.status);
    
    let data = await response.json();
  
    if (!response.status >= 400)
      throw data;
  
    return data.data;
  }

  async update(id, formData) {

    let response = await this.apiFetch(
      `customer/address.json?id=${id}`,
      'GET', //PUT,
      //JSON.stringify(formData)
    );
  
    if (!response.status >= 500)
      throw new Error(response.status);
    
    let data = await response.json();
  
    if (!response.status >= 400)
      throw data;
  
    return data.data;
  }

  async get(id, userDispatch) {
  
    try {
      let response = await this.apiFetch(
        `customer/address.json?=${id}`,
        'GET'
      );
  
      if (!response.ok)
        throw new Error(response.status);
      
      let data = await response.json();
  
      userDispatch({
        type: USER_ADDRESS.FETCHED,
        payload: data.data
      });
      
    } catch (err) {
      userDispatch(getUserAddressFetchStatusAction(FETCH_STATUSES.ERROR));
    }
  }

  async getList(userDispatch) {
  
    try {
      let response = await this.apiFetch(
        'customer/addresses.json',
        'GET'
      );
  
      if (!response.ok)
        throw new Error(response.status);
      
      let data = await response.json();
  
      //data.data = [];
  
      userDispatch({
        type: USER_ADDRESS.LIST_FETCHED,
        payload: data.data
      });
      
    } catch (err) {
      userDispatch(getUserAddressListFetchStatusAction(FETCH_STATUSES.ERROR));
    }
  }

}

