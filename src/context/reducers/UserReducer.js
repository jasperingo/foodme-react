
import User from "../../models/User";
import { FETCH_STATUSES, USER } from "../AppActions";
import { initialUserState } from "../AppInitialStates";

//TODO: add update withdrawal address case;

export default function UserReducer (state, action) {
  
  switch (action.type) { 

    case USER.UNAUTHED:
      switch(state.user.TYPE) {
        case User.TYPE_CUSTOMER:
          localStorage.removeItem('customer-auth');
          break;
        case User.TYPE_STORE:
          localStorage.removeItem('store-auth');
          break;
        case User.TYPE_DELIVERY_FIRM:
          localStorage.removeItem('delivery-auth');
          break;
        case User.TYPE_ADMINISTRATOR:
          localStorage.removeItem('admin-auth');
          break;
        default:
      }
      return initialUserState;

    case USER.AUTHED:
    case USER.UPDATED:
      
      const auth = JSON.stringify(action.payload);

      switch(action.payload.TYPE) {
        case User.TYPE_CUSTOMER:
          localStorage.setItem('customer-auth', auth);
          break;
        case User.TYPE_STORE:
          localStorage.setItem('store-auth', auth);
          break;
        case User.TYPE_DELIVERY_FIRM:
          localStorage.setItem('delivery-auth', auth);
          break;
        case User.TYPE_ADMINISTRATOR:
          localStorage.setItem('admin-auth', auth);
          break;
        default:
      }

      return {
        ...state,
        user: action.payload,
        userFetchStatus: FETCH_STATUSES.DONE
      };
    
    case USER.AUTH_FAILED:
    case USER.UPDATE_FAILED:
    case USER.RESET_PASSWORD_FAILED: 
      return {
        ...state,
        userFetchStatus: FETCH_STATUSES.ERROR
      };

    case USER.RESET_PASSWORD: 
      return {
        ...state,
        userFetchStatus: FETCH_STATUSES.DONE
      };
    
    case USER.FETCH_STATUS_CHANGED: 
      return {
        ...state,
        userFetchStatus: action.payload
      };
    
    default: 
      return state;
  }
}


