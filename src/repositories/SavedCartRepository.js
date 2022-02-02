
import Fetch from "./Fetch";

export default class SavedCartRepository extends Fetch {

  create(formData) {
    return this.apiFetch(
      'saved-cart/create',
      'POST',
      JSON.stringify(formData)
    );
  }

  delete(id) {
    return this.apiFetch(
      `saved-cart/${id}/delete`,
      'DELETE',
    );
  }

  get(id) {
    return this.apiFetch(
      `saved-cart/${id}`,
      'GET'
    );
  }
}

