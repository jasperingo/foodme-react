import { useContext, useReducer } from "react";
import AppContext from "../context/AppContext";
import CustomerReducer from "../context/reducers/CustomerReducer";
import customerState from "../context/states/customerState";


export function useAppContextValues() {

  const [customer, customerDispatch] = useReducer(CustomerReducer, customerState);

  return {

    customer: {
      customer,
      dispatch: customerDispatch
    },


  }
}

export function useAppContext() {
  return useContext(AppContext);
}


