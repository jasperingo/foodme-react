
import Fetch from "./Fetch";

export default class DeliveryFirmRepository extends Fetch {

  get(id) {
    return this.apiFetch(
      `delivery-firm/${id}`,
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

}
