import { ADMIN } from "../actions/adminActions";
import adminState from "../states/adminState";

export default function AdminReducer (state, action) {

  
  switch (action.type) {

    case ADMIN.UNAUTHED:
      return { ...adminState };

    case ADMIN.AUTHED:
      return {
        ...state,
        admin: action.payload.admin,
        adminToken: action.payload.token,
        adminFetchStatus: action.payload.fetchStatus
      };

    case ADMIN.FETCH_STATUS_CHANGED:
      return {
        ...state,
        adminFetchStatus: action.payload.fetchStatus
      };
    
    case ADMIN.FETCHED:
      return {
        ...state,
        admin: action.payload.admin, 
        adminFetchStatus: action.payload.fetchStatus,
      };

    default:
      return state;
  }
}
