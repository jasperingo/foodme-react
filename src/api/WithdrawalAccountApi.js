
import API from './API';

export default class WithdrawalAccountApi extends API {

  async updateStoreWithdrawalAccount(id, formData) {

    const data = await this.apiFetch(
      `store/store.json?id=${id}`,
      'GET', //'PUT',
      JSON.stringify(formData)
    );
  
    return data;
  }

  async updateDeliveryFirmWithdrawalAccount(id, formData) {

    const data = await this.apiFetch(
      `delivery-firm/get.json?id=${id}`,
      'GET', //'PUT',
      JSON.stringify(formData)
    );
  
    return data;
  }

}


