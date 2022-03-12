
import Fetch from "./Fetch";

export default class OrderItemRepository extends Fetch {

  updateProcessedAt(id) {
    return this.apiFetch(
      `order-item/${id}/processing-date/update`,
      'PUT'
    );
  }

  updateTransportedAt(id) {
    return this.apiFetch(
      `order-item/${id}/transporting-date/update`,
      'PUT'
    );
  }

  updateDeliveredAt(id) {
    return this.apiFetch(
      `order-item/${id}/delivery-date/update`,
      'PUT'
    );
  }

}

