
import API from "./API";

export default class StoreApi extends API {

  async auth(formData) {

    const data = await this.apiFetch(
      'store/store.json',
      'GET', //'POST',
      //JSON.stringify(formData)
    );
    
    return data.data;
  }

  async update(formData) {
  
    const data = await this.apiFetch(
      'store/store.json',
      'GET', //'PUT',
      //JSON.stringify(formData)
    );
  
    return data.data;
  }

}
