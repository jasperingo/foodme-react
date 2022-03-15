
import Fetch from "./Fetch";

export default class PromotionRepository extends Fetch {

  create(formData) {
    return this.apiFetch(
      'promotion/create',
      'POST',
      JSON.stringify(formData)
    );
  }

  updatePhoto(id, formData) {
    return this.apiFetch(
      `promotion/${id}/photo/update`,
      'PUT',
      formData
    );
  }

  delete(id) {
    return this.apiFetch(
      `promotion/${id}/delete`,
      'DELETE',
    );
  }

  get(id) {
    return this.apiFetch(
      `promotion/${id}`,
      'GET'
    );
  }

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
