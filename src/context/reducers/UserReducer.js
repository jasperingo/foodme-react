
import { FETCH_STATUSES, USER } from "../AppActions";
import { initialUserState } from "../AppInitialStates";

//TODO: add update withdrawal address case;

export default function UserReducer (state, action) {
  
  switch (action.type) { 

    case USER.UNAUTHED:
      localStorage.removeItem('auth');
      return initialUserState;

    case USER.AUTHED:
    case USER.UPDATED:
      localStorage.setItem('auth', JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload,
        userResponse: { success: action.payload.msg },
        userFetchStatus: FETCH_STATUSES.DONE
      };
    
    case USER.AUTH_FAILED:
    case USER.UPDATE_FAILED:
    case USER.RESET_PASSWORD_FAILED: 
      return {
        ...state,
        userResponse: { errors: action.payload },
        userFetchStatus: FETCH_STATUSES.ERROR
      };

    case USER.RESET_PASSWORD: 
      return {
        ...state,
        userResponse: { success: action.payload.message },
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


