
import Fetch from "./Fetch";

export default class DiscountRepository extends Fetch {

  get(id) {
    return this.apiFetch(
      `discount/${id}`,
      'GET'
    );
  }

  getProductsList(id, page) {
    return this.apiFetch(
      `discount/${id}/discount-product/list?page=${page}&page_limit=${Fetch.PAGE_LIMIT}`,
      'GET'
    );
  }
  
}
