
import Fetch from "./Fetch";

export default class SubCategoryRepository extends Fetch {

  create(formData) {
    return this.apiFetch(
      'sub-category/create',
      'POST',
      JSON.stringify(formData)
    );
  }

  update(id, formData) {
    return this.apiFetch(
      `sub-category/${id}/update`,
      'PUT',
      JSON.stringify(formData)
    );
  }

  updatePhoto(id, formData) {
    return this.apiFetch(
      `sub-category/${id}/photo/update`,
      'PUT',
      formData
    );
  }

  get(id) {
    return this.apiFetch(
      `sub-category/${id}`,
      'GET'
    );
  }
  
}
