import { useContext, useReducer } from "react";
import AppContext from "../context/AppContext";
import AddressReducer from "../context/reducers/AddressReducer";
import BankReducer from "../context/reducers/BankReducer";
import CustomerReducer from "../context/reducers/CustomerReducer";
import TransactionReducer from "../context/reducers/TransactionReducer";
import addressState from "../context/states/addressState";
import bankState from "../context/states/bankState";
import customerState from "../context/states/customerState";
import transactionState from "../context/states/transactionState";


export function useAppContextValues() {
  
  const [customer, customerDispatch] = useReducer(CustomerReducer, customerState);
  
  const [bank, bankDispatch] = useReducer(BankReducer, bankState);

  const [address, addressDispatch] = useReducer(AddressReducer, addressState);

  const [transaction, transactionDispatch] = useReducer(TransactionReducer, transactionState);

  return {

    customer: {
      customer,
      dispatch: customerDispatch
    },

    bank: {
      bank,
      bankDispatch
    },

    address: {
      address, 
      addressDispatch
    },

    transaction: {
      transaction, 
      transactionDispatch
    },
    
  }
}

export function useAppContext() {
  return useContext(AppContext);
}
