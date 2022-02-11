
import Fetch from "./Fetch";

export default class DiscountRepository extends Fetch {

  create(formData) {
    return this.apiFetch(
      'discount/create',
      'POST',
      JSON.stringify(formData)
    );
  }

  update(id, formData) {
    return this.apiFetch(
      `discount/${id}/update`,
      'PUT',
      JSON.stringify(formData)
    );
  }

  delete(id) {
    return this.apiFetch(
      `discount/${id}/delete`,
      'DELETE',
    );
  }

  get(id) {
    return this.apiFetch(
      `discount/${id}`,
      'GET'
    );
  }

  getProductsList(id, page) {
    return this.apiFetch(
      `discount/${id}/discount-product/list?page=${page}&page_limit=${Fetch.PAGE_LIMIT}`,
      'GET'
    );
  }
  
}
