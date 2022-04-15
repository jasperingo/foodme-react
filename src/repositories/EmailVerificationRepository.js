
import Fetch from "./Fetch";

export default class EamilVerificationRepository extends Fetch {

  send(formData) {
    return this.apiFetch(
      'email-verification/send',
      'POST',
      JSON.stringify(formData)
    );
  }

  verify(token) {
    return this.apiFetch(
      `email-verification/verify?token=${token}`,
      'GET',
    );
  }

}

