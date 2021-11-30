import { FETCH_STATUSES, getUserAddressFetchStatusAction, USER_ADDRESS } from "../../context/AppActions";
import { API_URL } from "../../context/AppContext";

export default async function apiGetAddress(userDispatch, url, headers) {
  
  try {
    let response = await fetch(`${API_URL}${url}`, { headers });

    if (!response.ok)
      throw new Error(response.status);
    
    let data = await response.json();

    userDispatch({
      type: USER_ADDRESS.FETCHED,
      payload: data.data
    });
    
  } catch (err) {
    userDispatch(getUserAddressFetchStatusAction(FETCH_STATUSES.ERROR));
  }
}
