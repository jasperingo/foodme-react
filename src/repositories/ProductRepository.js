
import Fetch from "./Fetch";

export default class ProductRepository extends Fetch {

  get(id) {
    return this.apiFetch(
      `product/${id}`,
      'GET'
    );
  }

  getRandomList() {
    return this.apiFetch(
      `product/random/list?page_limit=${Fetch.PAGE_LIMIT_BIG}`,
      'GET'
    );
  }

  getSearchList(q, subCategory, page) {

    const params = new URLSearchParams();

    params.append('page', page);

    params.append('page_limit', Fetch.PAGE_LIMIT);

    if (q) {
      params.append('q', q);
    }

    if (subCategory) {
      params.append('sub_category', subCategory);
    }

    return this.apiFetch(
      `product/search?${params.toString()}`,
      'GET'
    );
  }

  getRelatedList(id, page) {
    return this.apiFetch(
      `product/${id}/related/list?page=${page}&page_limit=${Fetch.PAGE_LIMIT}`,
      'GET'
    );
  }

  getReviewsList(id, page) {
    return this.apiFetch(
      `product/${id}/review/list?page=${page}&page_limit=${Fetch.PAGE_LIMIT}`,
      'GET'
    );
  }
  
}
