
import Fetch from "./Fetch";

export default class DeliveryRouteRepository extends Fetch {

  get(id) {
    return this.apiFetch(
      `delivery-route/${id}`,
      'GET'
    );
  }

}
