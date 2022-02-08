
import Fetch from "./Fetch";

export default class CustomerRepository extends Fetch {

  create(formData) {
    return this.apiFetch(
      'customer/register',
      'POST',
      JSON.stringify(formData)
    );
  }

  auth(formData) {
    return this.apiFetch(
      'customer/login',
      'POST',
      JSON.stringify(formData)
    );
  }

  update(id, formData) {
    return this.apiFetch(
      `customer/${id}/update`,
      'PUT',
      JSON.stringify(formData)
    );
  }

  updatePhoto(id, formData) {
    return this.apiFetch(
      `customer/${id}/photo/update`, 
      'PUT',
      formData
    );
  }

  updatePassword(id, formData) {
    return this.apiFetch(
      `customer/${id}/password/update`,
      'PUT',
      JSON.stringify(formData)
    );
  }

  updateWithdrawalAccount(id, formData) {
    return this.apiFetch(
      `customer/${id}/withdrawal-account/update`,
      'PUT',
      JSON.stringify(formData)
    );
  }
  
  updateStatus(id, formData) {
    return this.apiFetch(
      `customer/${id}/status/update`,
      'PUT',
      JSON.stringify(formData)
    );
  }

  get(id) {
    return this.apiFetch(
      `customer/${id}`,
      'GET'
    );
  }

  getList(page) {
    return this.apiFetch(
      `customer/list?page=${page}&page_limit=${Fetch.PAGE_LIMIT}`,
      'GET'
    );
  }


  getAddressesList(id) {
    return this.apiFetch(
      `customer/${id}/address/list`,
      'GET'
    );
  }

  getOrdersList(id, page) {
    return this.apiFetch(
      `customer/${id}/order/list?page=${page}&page_limit=${Fetch.PAGE_LIMIT}`,
      'GET'
    );
  }

  getTransactionsList(id, page) {
    return this.apiFetch(
      `customer/${id}/transaction/list?page=${page}&page_limit=${Fetch.PAGE_LIMIT}`,
      'GET'
    );
  }

  getFavoritesList(id, page) {
    return this.apiFetch(
      `customer/${id}/favorite/list?page=${page}&page_limit=${Fetch.PAGE_LIMIT}`,
      'GET'
    );
  }

  getSavedCartsList(id, page) {
    return this.apiFetch(
      `customer/${id}/saved-cart/list?page=${page}&page_limit=${Fetch.PAGE_LIMIT}`,
      'GET'
    );
  }

}



