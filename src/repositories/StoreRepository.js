
import Fetch from "./Fetch";

export default class StoreRepository extends Fetch {

  updateStatus(id, formData) {
    return this.apiFetch(
      `store/${id}/status/update`,
      'PUT',
      JSON.stringify(formData)
    );
  }

  get(id) {
    return this.apiFetch(
      `store/${id}`,
      'GET'
    );
  }

  getList(page) {
    return this.apiFetch(
      `store/list?page=${page}&page_limit=${Fetch.PAGE_LIMIT}`,
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

  getOrdersList(id, page) {
    return this.apiFetch(
      `store/${id}/order/list?page=${page}&page_limit=${Fetch.PAGE_LIMIT}`,
      'GET'
    );
  }

  getTransactionList(id, page) {
    return this.apiFetch(
      `store/${id}/transaction/list?page=${page}&page_limit=${Fetch.PAGE_LIMIT}`,
      'GET'
    );
  }

}
