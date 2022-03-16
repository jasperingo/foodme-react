
import Fetch from "./Fetch";

export default class TransactionRepository extends Fetch {

  createPayment(formData) {
    return this.apiFetch(
      'transaction/payment/create',
      'POST',
      JSON.stringify(formData)
    );
  }
 
  withdraw(formData) {
    return this.apiFetch(
      'transaction/withdrawal/create',
      'POST',
      JSON.stringify(formData)
    );
  }

  updateStatus(id, formData) {
    return this.apiFetch(
      `transaction/${id}/status/update`,
      'PUT',
      JSON.stringify(formData)
    );
  }

  get(id) {
    return this.apiFetch(
      `transaction/${id}`,
      'GET'
    );
  }
  
  getList(page, type) {

    const params = new URLSearchParams();

    params.append('page', page);

    params.append('page_limit', Fetch.PAGE_LIMIT);

    if (type) {
      params.append('type', type);
    }

    return this.apiFetch(
      `transaction/list?${params.toString()}`,
      'GET'
    );
  }

}
