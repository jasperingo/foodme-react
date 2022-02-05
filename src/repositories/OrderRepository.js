
import Fetch from "./Fetch";

export default class OrderRepository extends Fetch {

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

}

