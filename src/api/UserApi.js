
import API from "./API";

export default class UserApi extends API {

  async auth(formData) {

    let response = await this.apiFetch(
      'post/auth-customer.json',
      'GET', //'POST',
      //JSON.stringify(formData)
    );
  
    if (!response.status >= 500)
      throw new Error(response.status);
  
    let data = await response.json();
  
    if (!response.status >= 400)
      throw data;
    
    return data.data;
  }  

  async authStore(formData) {

    let response = await this.apiFetch(
      'store/store.json',
      'GET', //'POST',
      //JSON.stringify(formData)
    );
  
    if (!response.status >= 500)
      throw new Error(response.status);
  
    let data = await response.json();
  
    if (!response.status >= 400)
      throw data;
    
    return data.data;
  }

  async forgotPassword(formData) {

    let response = await this.apiFetch(
      'forgot-password.json',
      'GET', //'POST',
      //JSON.stringify(formData)
    );
  
    if (!response.status >= 500)
      throw new Error(response.status);
    
    let data = await response.json();
  
    if (!response.status >= 400)
      throw data;
  
    return data.data;
  }

  async update(formData) {
  
    let response = await this.apiFetch(
      'post/auth-customer.json',
      'GET', //'PUT',
      //JSON.stringify(formData)
    );
  
    if (!response.status >= 500)
      throw new Error(response.status);
    
    let data = await response.json();
  
    if (!response.status >= 400)
      throw data;
  
    return data.data;
  }

  async updateStore(formData) {
  
    let response = await this.apiFetch(
      'store/store.json',
      'GET', //'PUT',
      //JSON.stringify(formData)
    );
  
    if (!response.status >= 500)
      throw new Error(response.status);
    
    let data = await response.json();
  
    if (!response.status >= 400)
      throw data;
  
    return data.data;
  }

  async updatePhoto(formData) {

    let response = await this.apiFetch(
      'post/auth-customer.json', 
      'GET', //'PUT',
      formData
    );
  
    if (!response.status >= 500)
      throw new Error(response.status);
    
    let data = await response.json();
  
    if (!response.status >= 400)
      throw data;
  
    return data.data;
  }

  async updatePassword(formData) {

    let response = await this.apiFetch(
      'success.json',
      'GET', //'POST',
      //JSON.stringify(formData)
    );
  
    if (!response.status >= 500)
      throw new Error(response.status);
    
    let data = await response.json();
  
    if (!response.status >= 400)
      throw data;
  
    return data.data;
  }

}

