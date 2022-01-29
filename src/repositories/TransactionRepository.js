
import Fetch from "./Fetch";

export default class TransactionRepository extends Fetch {

  get(id) {
    return this.apiFetch(
      `transaction/${id}`,
      'GET'
    );
  }
  
}
