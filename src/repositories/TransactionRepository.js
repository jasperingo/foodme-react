
import Fetch from "./Fetch";

export default class TransactionRepository extends Fetch {
 
  withdraw(formData) {
    return this.apiFetch(
      'transaction/withdrawal/create',
      'POST',
      JSON.stringify(formData)
    );
  }

  get(id) {
    return this.apiFetch(
      `transaction/${id}`,
      'GET'
    );
  }
  
  getList(page) {
    return this.apiFetch(
      `transaction/list?page=${page}&page_limit=${Fetch.PAGE_LIMIT}`,
      'GET'
    );
  }

}
