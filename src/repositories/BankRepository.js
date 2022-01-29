
import Fetch from "./Fetch";

export default class BankRepository extends Fetch {

  getList() {
    return this.apiFetch(
      `bank/list`,
      'GET'
    );
  }
  
}
