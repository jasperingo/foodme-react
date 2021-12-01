
import { getFormRequestFailedAction, USER } from "../../context/AppActions";
import { API_URL } from "../../context/AppContext";

export default async function apiUpdate(userDispatch, url, formData, headers) {

  try {
    let response = await fetch(`${API_URL}${url}`, {
      method: 'GET', //'POST',
      //body: JSON.stringify(formData)
    });

    if (!response.ok)
      throw new Error(response.status);
    
    let data = await response.json();

    userDispatch({
      type: USER.UPDATED,
      payload: data.data
    });
    
  } catch (err) {
    userDispatch(getFormRequestFailedAction(USER.UPDATE_FAILED));
  }
}
