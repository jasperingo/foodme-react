import { useContext, useReducer } from "react";
import AppContext from "../context/AppContext";
import AddressReducer from "../context/reducers/AddressReducer";
import BankReducer from "../context/reducers/BankReducer";
import CategoryReducer from "../context/reducers/CategoryReducer";
import CustomerReducer from "../context/reducers/CustomerReducer";
import HomeReducer from "../context/reducers/HomeReducer";
import OrderReducer from "../context/reducers/OrderReducer";
import TransactionReducer from "../context/reducers/TransactionReducer";
import addressState from "../context/states/addressState";
import bankState from "../context/states/bankState";
import categoryState from "../context/states/categoryState";
import customerState from "../context/states/customerState";
import homeState from "../context/states/homeState";
import orderState from "../context/states/orderState";
import transactionState from "../context/states/transactionState";


export function useAppContextValues() {
  
  const [customer, customerDispatch] = useReducer(CustomerReducer, customerState);

  const [home, homeDispatch] = useReducer(HomeReducer, homeState);

  const [category, categoryDispatch] = useReducer(CategoryReducer, categoryState);
  
  const [bank, bankDispatch] = useReducer(BankReducer, bankState);

  const [address, addressDispatch] = useReducer(AddressReducer, addressState);

  const [transaction, transactionDispatch] = useReducer(TransactionReducer, transactionState);

  const [order, orderDispatch] = useReducer(OrderReducer, orderState);


  return {

    customer: {
      customer,
      dispatch: customerDispatch
    },

    category: {
      category, 
      categoryDispatch
    },

    home: {
      home, 
      homeDispatch
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

    order: {
      order, 
      orderDispatch
    },

  }
}

export function useAppContext() {
  return useContext(AppContext);
}
