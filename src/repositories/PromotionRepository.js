
import Fetch from "./Fetch";

export default class PromotionRepository extends Fetch {

  getRandomList() {
    return this.apiFetch(
      `promotion/random/list?page_limit=${Fetch.PAGE_LIMIT_BIG}`,
      'GET'
    );
  }

}
