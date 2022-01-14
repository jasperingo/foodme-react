
import { 
  DELIVERY_FIRM, 
  FETCH_STATUSES, 
  getDeliveryFirmFetchStatusAction, 
  getDeliveryFirmsListFetchStatusAction 
} from "../context/AppActions";
import API from "./API";

export default class DeliveryFirmApi extends API {

  async auth(formData) {

    const data = await this.apiFetch(
      'delivery-firm/get.json',
      'GET', //'POST',
      JSON.stringify(formData)
    );
    
    return data;
  }

  async update(id, formData) {
  
    const data = await this.apiFetch(
      `delivery-firm/get.json?id=${id}`,
      'GET', //'PUT',
      JSON.stringify(formData)
    );
  
    return data;
  }

  async updatePhoto(id, formData) {

    const data = await this.apiFetch(
      `delivery-firm/get.json?id=${id}`, 
      'GET', //'PUT',
      formData
    );
  
    return data;
  }

  async updatePassword(id, formData) {

    const data = await this.apiFetch(
      `delivery-firm/get.json?id=${id}`,
      'GET', //'PUT',
      JSON.stringify(formData)
    );
  
    return data;
  }

  async get(id, dispatch) {
    try {
      const data = await this.apiFetch(
        `delivery-firm/get.json?id=${id}`,
        'GET'
      );

      data.data.id = id;
      
      dispatch({
        type: DELIVERY_FIRM.FETCHED,
        payload: data.data
      });

    } catch (err) {
      dispatch(getDeliveryFirmFetchStatusAction(FETCH_STATUSES.ERROR));
    }
  }

  async getList(dispatch) {
    try {
      const data = await this.apiFetch(
        `delivery-firm/list.json`,
        'GET'
      );
      
      dispatch({
        type: DELIVERY_FIRM.LIST_FETCHED,
        payload: {
          deliveryFirms: data.data,
          deliveryFirmsNumberOfPages: data.total_pages
        }
      });

    } catch (err) {
      dispatch(getDeliveryFirmsListFetchStatusAction(FETCH_STATUSES.ERROR));
    }
  }

  async getListByRecent(dispatch) {
    try {
      const data = await this.apiFetch(
        `delivery-firm/list.json`,
        'GET'
      );
      
      dispatch({
        type: DELIVERY_FIRM.LIST_FETCHED,
        payload: {
          deliveryFirms: data.data,
          deliveryFirmsNumberOfPages: data.total_pages
        }
      });

    } catch (err) {
      dispatch(getDeliveryFirmsListFetchStatusAction(FETCH_STATUSES.ERROR));
    }
  }

}

