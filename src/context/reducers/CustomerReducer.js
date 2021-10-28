
import { USER } from "../AppActions";

export default function CustomerReducer (state, action) {
  
  switch (action.type) { 

    case USER.FETCHED:
      return {
        first_name: 'Betty',
        last_name: 'Butter',
        email: 'yam@gmail.com',
      };
    
    default: 
      return state;
  }
}


