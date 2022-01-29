
import Fetch from "./Fetch";

export default class ProductRepository extends Fetch {

  getRandomList() {
    return this.apiFetch(
      `product/random/list?page_limit=${Fetch.PAGE_LIMIT_BIG}`,
      'GET'
    );
  }
  
}
