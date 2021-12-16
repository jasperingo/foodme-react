import API from "./API";

export default class AdminApi extends API {

  async auth(formData) {

    const data = await this.apiFetch(
      'post/auth-customer.json',
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
  
}
