
import Fetch from "./Fetch";

export default class DeliveryRouteRepository extends Fetch {

  create(formData) {
    return this.apiFetch(
      'delivery-route/create',
      'POST',
      JSON.stringify(formData)
    );
  }

  createLink(formData) {
    return this.apiFetch(
      'delivery-route/link/create',
      'POST',
      JSON.stringify(formData)
    );
  }

  update(id, formData) {
    return this.apiFetch(
      `delivery-route/${id}/update`,
      'PUT',
      JSON.stringify(formData)
    );
  }

  updateLink(id, formData) {
    return this.apiFetch(
      `delivery-route/${id}/link/update`,
      'PUT',
      JSON.stringify(formData)
    );
  }

  get(id) {
    return this.apiFetch(
      `delivery-route/${id}`,
      'GET'
    );
  }

}
