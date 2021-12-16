
import { 
  USER_ADDRESS,
  FETCH_STATUSES, 
  getUserAddressFetchStatusAction, 
  getUserAddressListFetchStatusAction
} from "../context/AppActions";
import API from "./API";

export default class AddressApi extends API {

  async add(formData) {

    const data = await this.apiFetch(
      'customer/address.json',
      'GET', //PUT,
      //JSON.stringify(formData)
    );
  
    return data.data;
  }

  async update(id, formData) {

    const data = await this.apiFetch(
      `customer/address.json?id=${id}`,
      'GET', //PUT,
      //JSON.stringify(formData)
    );
  
    return data.data;
  }

  async get(id, userDispatch) {
  
    try {

      const data = await this.apiFetch(
        `customer/address.json?=${id}`,
        'GET'
      );
  
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
      
      const data = await this.apiFetch(
        'customer/addresses.json',
        'GET'
      );
  
      userDispatch({
        type: USER_ADDRESS.LIST_FETCHED,
        payload: data.data
      });
      
    } catch (err) {
      userDispatch(getUserAddressListFetchStatusAction(FETCH_STATUSES.ERROR));
    }
  }

}

