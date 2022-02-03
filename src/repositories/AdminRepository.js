
import Fetch from "./Fetch";

export default class AdminRepository extends Fetch {

  auth(formData) {
    return this.apiFetch(
      'administrator/login',
      'POST',
      JSON.stringify(formData)
    );
  }

  update(id, formData) {
    return this.apiFetch(
      `administrator/${id}/update`,
      'PUT',
      JSON.stringify(formData)
    );
  }

  updatePhoto(id, formData) {
    return this.apiFetch(
      `administrator/${id}/photo/update`, 
      'PUT',
      formData
    );
  }

  updatePassword(id, formData) {
    return this.apiFetch(
      `administrator/${id}/password/update`,
      'PUT',
      JSON.stringify(formData)
    );
  }

  get(id) {
    return this.apiFetch(
      `administrator/${id}`,
      'GET'
    );
  }

}
