
import Fetch from "./Fetch";

export default class OrderRepository extends Fetch {

  get(id) {
    return this.apiFetch(
      `order/${id}`,
      'GET'
    );
  }
  
}
