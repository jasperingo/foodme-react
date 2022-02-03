
import Fetch from "./Fetch";

export default class PasswordResetRepository extends Fetch {

  createForCustomer(formData) {
    return this.apiFetch(
      'password-reset/customer/create',
      'POST',
      JSON.stringify(formData)
    );
  }

  createForAdministrator(formData) {
    return this.apiFetch(
      'password-reset/administrator/create',
      'POST',
      JSON.stringify(formData)
    );
  }

  createForStore(formData) {
    return this.apiFetch(
      'password-reset/store/create',
      'POST',
      JSON.stringify(formData)
    );
  }

  createForDeliveryFirm(formData) {
    return this.apiFetch(
      'password-reset/delivery-firm/create',
      'POST',
      JSON.stringify(formData)
    );
  }

  update(formData) {
    return this.apiFetch(
      'password-reset/reset',
      'PUT',
      JSON.stringify(formData)
    );
  }

}



