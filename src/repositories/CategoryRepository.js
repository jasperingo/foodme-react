
import Fetch from "./Fetch";

export default class CategoryRepository extends Fetch {

  get(id) {
    return this.apiFetch(
      `category/${id}`,
      'GET'
    );
  }

  getListByStore() {
    return this.apiFetch(
      'category/store/list',
      'GET'
    );
  }

  getListByProduct() {
    return this.apiFetch(
      'category/product/list',
      'GET'
    );
  }

  getRandomList() {
    return this.apiFetch(
      `category/random/list?page_limit=${Fetch.PAGE_LIMIT_BIG}`,
      'GET'
    );
  }
  
}
