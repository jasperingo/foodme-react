
import Fetch from "./Fetch";

export default class StoreRepository extends Fetch {

  get(id) {
    return this.apiFetch(
      `store/${id}`,
      'GET'
    );
  }

  getRandomList() {
    return this.apiFetch(
      `store/random/list?page_limit=${Fetch.PAGE_LIMIT_BIG}`,
      'GET'
    );
  }

  getProductsList(id, page) {
    return this.apiFetch(
      `store/${id}/product/list?page=${page}&page_limit=${Fetch.PAGE_LIMIT}`,
      'GET'
    );
  }
  
}
