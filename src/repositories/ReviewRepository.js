
import Fetch from "./Fetch";

export default class ReviewRepository extends Fetch {

  createForProduct(formData) {
    return this.apiFetch(
      'review/product/create',
      'POST',
      JSON.stringify(formData)
    );
  }

  createForStore(formData) {
    return this.apiFetch(
      'review/store/create',
      'POST',
      JSON.stringify(formData)
    );
  }

  createForDeliveryFirm(formData) {
    return this.apiFetch(
      'review/delivery-firm/create',
      'POST',
      JSON.stringify(formData)
    );
  }

  delete(id) {
    return this.apiFetch(
      `review/${id}/delete`,
      'DELETE',
    );
  }

  update(id, formData) {
    return this.apiFetch(
      `review/${id}/update`,
      'PUT',
      JSON.stringify(formData)
    );
  }

}



