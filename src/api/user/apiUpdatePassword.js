
import { API_URL } from "../../context/AppContext";
//import makeHeaders from "../makeHeaders";

export default async function apiUpdatePassword(url, authHeader, formData) {

  let response = await fetch(`${API_URL}${url}`, {
    method: 'GET', //'POST',
    //headers: makeHeaders(authHeader),
    //body: JSON.stringify(formData)
  });

  if (!response.status >= 500)
    throw new Error(response.status);
  
  let data = await response.json();

  if (!response.status >= 400)
    throw data;

  return data.data;
}
