
import { USER } from "../../context/AppActions";
import { API_URL } from "../../context/AppContext";

export default async function apiAuthUser(userDispatch, url, formData) {

  try {
    let response = await fetch(`${API_URL}${url}`, {
      method: 'GET', //'POST',
      //body: JSON.stringify(formData)
    });

    if (!response.ok)
      throw new Error(response.status);
    
    let data = await response.json();

    userDispatch({
      type: USER.AUTHED,
      payload: data.data
    });
    
  } catch (err) {
    userDispatch({
      type: USER.AUTH_FAILED,
      payload: { form: '_errors.Something_went_wrong' }
    });
  }
}
