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
        adminToken: action.payload.token
      };
    
    case ADMIN.FETCHED:
      return {
        ...state,
        admin: action.payload.admin
      };

    default:
      return state;
  }
}
