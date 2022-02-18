
import Fetch from "./Fetch";

export default class DeliveryRouteWeightRepository extends Fetch {

  create(formData) {
    return this.apiFetch(
      'delivery-route-weight/create',
      'POST',
      JSON.stringify(formData)
    );
  }

  update(id, formData) {
    return this.apiFetch(
      `delivery-route-weight/${id}/update`,
      'PUT',
      JSON.stringify(formData)
    );
  }

  delete(id) {
    return this.apiFetch(
      `delivery-route-weight/${id}/delete`,
      'DELETE'
    );
  }

  get(id) {
    return this.apiFetch(
      `delivery-route-weight/${id}`,
      'GET'
    );
  }

}
