import { FETCH_STATUSES, getStatisticsFetchStatusAction, STATISTICS } from "../context/AppActions";
import API from "./API";

export default class AdminApi extends API {

  async auth(formData) {

    const data = await this.apiFetch(
      'customer/get.json',
      'GET', //'POST',
      JSON.stringify(formData)
    );
    
    return data.data;
  }

  async update(formData) {
  
    const data = await this.apiFetch(
      'customer/get.json',
      'GET', //'PUT',
      JSON.stringify(formData)
    );
  
    return data.data;
  }

  async updatePhoto(formData) {

    const data = await this.apiFetch(
      'customer/get.json', 
      'GET', //'PUT',
      formData
    );
  
    return data.data;
  }

  async updatePassword(formData) {

    const data = await this.apiFetch(
      'customer/get.json',
      'GET', //'POST',
      JSON.stringify(formData)
    );
  
    return data.data;
  }

  async getStatistics(dispatch) {
    try {
      const data = await this.apiFetch(
        `admin/stats.json`,
        'GET'
      );
      
      dispatch({
        type: STATISTICS.FETCHED,
        payload: data.data
      });

    } catch (err) {
      dispatch(getStatisticsFetchStatusAction(FETCH_STATUSES.ERROR));
    }
  }
  
}
