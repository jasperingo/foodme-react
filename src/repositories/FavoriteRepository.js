
import Fetch from "./Fetch";

export default class FavoriteRepository extends Fetch {

  create(formData) {
    return this.apiFetch(
      'favorite/create',
      'POST',
      JSON.stringify(formData)
    );
  }

  delete(id) {
    return this.apiFetch(
      `favorite/${id}/delete`,
      'DELETE',
    );
  }

}
