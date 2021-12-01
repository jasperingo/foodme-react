
import { getFormRequestFailedAction, USER } from "../../context/AppActions";
import { API_URL } from "../../context/AppContext";

export default async function apiForgotPassword(userDispatch, url, formData) {

  try {
    let response = await fetch(`${API_URL}${url}`, {
      method: 'GET', //'POST',
      //body: JSON.stringify(formData)
    });

    if (!response.ok)
      throw new Error(response.status);
    
    let data = await response.json();

    userDispatch({
      type: USER.RESET_PASSWORD,
      payload: data.data
    });
    
  } catch (err) {
    userDispatch(getFormRequestFailedAction(USER.RESET_PASSWORD_FAILED));
  }
}
