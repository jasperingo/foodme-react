
import Fetch from "./Fetch";

export default class SavedCartRepository extends Fetch {

  get(id) {
    return this.apiFetch(
      `saved-cart/${id}`,
      'GET'
    );
  }
  
}

