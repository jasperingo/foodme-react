
import Fetch from "./Fetch";

export default class DeliveryFirmRepository extends Fetch {
  
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

  getOrdersList(id, page) {
    return this.apiFetch(
      `delivery-firm/${id}/order/list?page=${page}&page_limit=${Fetch.PAGE_LIMIT}`,
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
