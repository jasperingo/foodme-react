
import Fetch from "./Fetch";

export default class AddressRepository extends Fetch {

  create(formData) {
    return this.apiFetch(
      'address/create',
      'POST',
      JSON.stringify(formData)
    );
  }

  update(id, formData) {
    return this.apiFetch(
      `address/${id}/update`,
      'PUT',
      JSON.stringify(formData)
    );
  }

  delete(id) {
    return this.apiFetch(
      `address/${id}/delete`,
      'DELETE',
    );
  }

  get(id) {
    return this.apiFetch(
      `address/${id}`,
      'GET'
    );
  }
  
}
