
import Fetch from "./Fetch";

export default class StoreRepository extends Fetch {

  getRandomList() {
    return this.apiFetch(
      `store/random/list?page_limit=${Fetch.PAGE_LIMIT_BIG}`,
      'GET'
    );
  }
  
}
