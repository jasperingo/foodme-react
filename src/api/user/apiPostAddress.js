
import { getFormRequestFailedAction, USER_ADDRESS } from "../../context/AppActions";
import { API_URL } from "../../context/AppContext";

export default async function apiPostAddress(userDispatch, url, method, headers, formData) {

  try {
    let response = await fetch(`${API_URL}${url}`, {
      method: 'GET',
      //body: JSON.stringify(formData)
    });

    if (!response.ok)
      throw new Error(response.status);
    
    let data = await response.json();

    userDispatch({
      type: USER_ADDRESS.CREATED,
      payload: data.data
    });
    
  } catch (err) {
    userDispatch(getFormRequestFailedAction(USER_ADDRESS.CREATE_FAILED));
  }
}
