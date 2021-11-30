import { FETCH_STATUSES, getUserAddressListFetchStatusAction, USER_ADDRESS } from "../../context/AppActions";
import { API_URL } from "../../context/AppContext";


export default async function apiGetAddresses(userDispatch, url, headers) {
  
  try {
    let response = await fetch(`${API_URL}${url}`, { headers });

    if (!response.ok)
      throw new Error(response.status);
    
    let data = await response.json();

    //data.data = [];

    userDispatch({
      type: USER_ADDRESS.LIST_FETCHED,
      payload: data.data
    });
    
  } catch (err) {
    userDispatch(getUserAddressListFetchStatusAction(FETCH_STATUSES.ERROR));
  }
}

