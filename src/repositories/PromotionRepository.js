
import Fetch from "./Fetch";

export default class PromotionRepository extends Fetch {

  getList(page) {
    return this.apiFetch(
      `promotion/list?page=${page}&page_limit=${Fetch.PAGE_LIMIT}`,
      'GET'
    );
  }

  getRandomList() {
    return this.apiFetch(
      `promotion/random/list?page_limit=${Fetch.PAGE_LIMIT_BIG}`,
      'GET'
    );
  }

}
