
import Fetch from "./Fetch";

export default class DiscountProductRepository extends Fetch {

  create(formData) {
    return this.apiFetch(
      'discount-product/create',
      'POST',
      JSON.stringify(formData)
    );
  }

  delete(id) {
    return this.apiFetch(
      `discount-product/${id}/delete`,
      'DELETE',
    );
  }
  
}
