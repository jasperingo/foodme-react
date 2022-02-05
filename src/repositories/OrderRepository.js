
import Fetch from "./Fetch";

export default class OrderRepository extends Fetch {

  get(id) {
    return this.apiFetch(
      `order/${id}`,
      'GET'
    );
  }
  
  getList(page) {
    return this.apiFetch(
      `order/list/?page=${page}&page_limit=${Fetch.PAGE_LIMIT}`,
      'GET'
    );
  }

}
