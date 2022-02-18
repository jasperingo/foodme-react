
import Fetch from "./Fetch";

export default class DeliveryRouteDurationRepository extends Fetch {

  create(formData) {
    return this.apiFetch(
      'delivery-route-duration/create',
      'POST',
      JSON.stringify(formData)
    );
  }

  update(id, formData) {
    return this.apiFetch(
      `delivery-route-duration/${id}/update`,
      'PUT',
      JSON.stringify(formData)
    );
  }

  get(id) {
    return this.apiFetch(
      `delivery-route-duration/${id}`,
      'GET'
    );
  }

}
