
import Fetch from "./Fetch";

export default class DeliveryFirmRepository extends Fetch {

  create(formData) {
    return this.apiFetch(
      'delivery-firm/register',
      'POST',
      JSON.stringify(formData)
    );
  }

  auth(formData) {
    return this.apiFetch(
      'delivery-firm/login',
      'POST',
      JSON.stringify(formData)
    );
  }

  update(id, formData) {
    return this.apiFetch(
      `delivery-firm/${id}/update`,
      'PUT',
      JSON.stringify(formData)
    );
  }

  updatePhoto(id, formData) {
    return this.apiFetch(
      `delivery-firm/${id}/photo/update`, 
      'PUT',
      formData
    );
  }

  updateWithdrawalAccount(id, formData) {
    return this.apiFetch(
      `delivery-firm/${id}/withdrawal-account/update`,
      'PUT',
      JSON.stringify(formData)
    );
  }
  
  updateAddress(id, formData) {
    return this.apiFetch(
      `delivery-firm/${id}/address/update`,
      'PUT',
      JSON.stringify(formData)
    );
  }

  updateWorkingHours(id, formData) {
    return this.apiFetch(
      `delivery-firm/${id}/working-hours/update`,
      'PUT',
      JSON.stringify(formData)
    );
  }
  
  updateStatus(id, formData) {
    return this.apiFetch(
      `delivery-firm/${id}/status/update`,
      'PUT',
      JSON.stringify(formData)
    );
  }

  get(id) {
    return this.apiFetch(
      `delivery-firm/${id}`,
      'GET'
    );
  }

  getList(page) {
    return this.apiFetch(
      `delivery-firm/list?page=${page}&page_limit=${Fetch.PAGE_LIMIT}`,
      'GET'
    );
  }

  getRoutesList(id, page) {
    return this.apiFetch(
      `delivery-firm/${id}/delivery-route/list?page=${page}&page_limit=${Fetch.PAGE_LIMIT}`,
      'GET'
    );
  }

  getReviewsList(id, page) {
    return this.apiFetch(
      `delivery-firm/${id}/review/list?page=${page}&page_limit=${Fetch.PAGE_LIMIT}`,
      'GET'
    );
  }

  getOrdersList(id, page, status) {

    const params = new URLSearchParams();

    params.append('page', page);

    params.append('page_limit', Fetch.PAGE_LIMIT);

    if (status) {
      params.append('status', status);
    }

    return this.apiFetch(
      `delivery-firm/${id}/order/list?${params.toString()}`,
      'GET'
    );
  }

  getTransactionBalance(id) {
    return this.apiFetch(
      `delivery-firm/${id}/transaction/balance`,
      'GET'
    );
  }

  getTransactionsList(id, page) {
    return this.apiFetch(
      `delivery-firm/${id}/transaction/list?page=${page}&page_limit=${Fetch.PAGE_LIMIT}`,
      'GET'
    );
  }

}
