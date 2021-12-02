
import { API_URL } from "../../context/AppContext";

export default async function apiPostAddress(url, method, authHeader, formData) {

  let response = await fetch(`${API_URL}${url}`, {
    method: 'GET',
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
