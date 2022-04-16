
import Fetch from "./Fetch";

export default class DeliveryRouteLocationRepository extends Fetch {

  create(formData) {
    return this.apiFetch(
      'delivery-route-location/create',
      'POST',
      JSON.stringify(formData)
    );
  }

  update(id, formData) {
    return this.apiFetch(
      `delivery-route-location/${id}/update`,
      'PUT',
      JSON.stringify(formData)
    );
  }

  delete(id) {
    return this.apiFetch(
      `delivery-route-location/${id}/delete`,
      'DELETE'
    );
  }

  get(id) {
    return this.apiFetch(
      `delivery-route-location/${id}`,
      'GET'
    );
  }

}
