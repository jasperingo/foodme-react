
import { API_URL } from "../../context/AppContext";

export default async function apiUpdatePhoto(url, authHeader, formData) {

  let response = await fetch(`${API_URL}${url}`, {
    method: 'GET', //'PUT',
    // headers: makeHeaders(authHeader, 'multipart/form-data'),
    //body: formData
  });

  if (!response.status >= 500)
    throw new Error(response.status);
  
  let data = await response.json();

  if (!response.status >= 400)
    throw data;

  return data.data;
}
