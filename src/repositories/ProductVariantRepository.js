
import Fetch from "./Fetch";

export default class ProductVariantRepository extends Fetch {

  create(formData) {
    return this.apiFetch(
      'product-variant/create',
      'POST',
      JSON.stringify(formData)
    );
  }

  update(id, formData) {
    return this.apiFetch(
      `product-variant/${id}/update`,
      'PUT',
      JSON.stringify(formData)
    );
  }

  get(id) {
    return this.apiFetch(
      `product-variant/${id}`,
      'GET'
    );
  }
  
}
