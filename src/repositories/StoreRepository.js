
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
      `store/search?${params.toString()}`,
      'GET'
    );
  }

  getProductsList(id, page) {
    return this.apiFetch(
      `store/${id}/product/list?page=${page}&page_limit=${Fetch.PAGE_LIMIT}`,
      'GET'
    );
  }

  getReviewsList(id, page) {
    return this.apiFetch(
      `store/${id}/review/list?page=${page}&page_limit=${Fetch.PAGE_LIMIT}`,
      'GET'
    );
  }
  
  getDiscountsList(id, page) {
    return this.apiFetch(
      `store/${id}/discount/list?page=${page}&page_limit=${Fetch.PAGE_LIMIT}`,
      'GET'
    );
  }

}
