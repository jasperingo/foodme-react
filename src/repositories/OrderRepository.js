
import Fetch from "./Fetch";

export default class OrderRepository extends Fetch {

  create(formData) {
    return this.apiFetch(
      'order/create',
      'POST',
      JSON.stringify(formData)
    );
  }

  updateStatus(id, formData) {
    return this.apiFetch(
      `order/${id}/status/update`,
      'PUT',
      JSON.stringify(formData)
    );
  }

  updateStoreStatus(id, formData) {
    return this.apiFetch(
      `order/${id}/store-status/update`,
      'PUT',
      JSON.stringify(formData)
    );
  }

  updateDeliveryFirmStatus(id, formData) {
    return this.apiFetch(
      `order/${id}/delivery-firm-status/update`,
      'PUT',
      JSON.stringify(formData)
    );
  }

  get(id) {
    return this.apiFetch(
      `order/${id}`,
      'GET'
    );
  }
  
  getList(page, status) {

    const params = new URLSearchParams();

    params.append('page', page);

    params.append('page_limit', Fetch.PAGE_LIMIT);

    if (status) {
      params.append('status', status);
    }

    return this.apiFetch(
      `order/list?${params.toString()}`,
      'GET'
    );
  }

  getRouteSuggestion(formData) {
    return this.apiFetch(
      `order/route/suggest`,
      'POST',
      JSON.stringify(formData)
    );
  }

  getDiscountSuggestion(formData) {
    return this.apiFetch(
      `order/discount/suggest`,
      'POST',
      JSON.stringify(formData)
    );
  }

}

