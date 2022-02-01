import { useContext, useReducer } from "react";
import AppContext from "../context/AppContext";
import AddressReducer from "../context/reducers/AddressReducer";
import BankReducer from "../context/reducers/BankReducer";
import CategoryReducer from "../context/reducers/CategoryReducer";
import CustomerReducer from "../context/reducers/CustomerReducer";
import HeaderReducer from "../context/reducers/HeaderReducer";
import HomeReducer from "../context/reducers/HomeReducer";
import OrderReducer from "../context/reducers/OrderReducer";
import ProductReducer from "../context/reducers/ProductReducer";
import SavedCartReducer from "../context/reducers/SavedCartReducer";
import SearchReducer from "../context/reducers/SearchReducer";
import StoreReducer from "../context/reducers/StoreReducer";
import TransactionReducer from "../context/reducers/TransactionReducer";
import addressState from "../context/states/addressState";
import bankState from "../context/states/bankState";
import categoryState from "../context/states/categoryState";
import customerState from "../context/states/customerState";
import headerState from "../context/states/headerState";
import homeState from "../context/states/homeState";
import orderState from "../context/states/orderState";
import productState from "../context/states/productState";
import savedCartState from "../context/states/savedCartState";
import searchState from "../context/states/searchState";
import storeState from "../context/states/storeState";
import transactionState from "../context/states/transactionState";


export function useAppContextValues() {
  
  const [header, headerDispatch] = useReducer(HeaderReducer, headerState);

  const [customer, customerDispatch] = useReducer(CustomerReducer, customerState);

  const [home, homeDispatch] = useReducer(HomeReducer, homeState);

  const [search, searchDispatch] = useReducer(SearchReducer, searchState);

  const [category, categoryDispatch] = useReducer(CategoryReducer, categoryState);
  
  const [bank, bankDispatch] = useReducer(BankReducer, bankState);

  const [address, addressDispatch] = useReducer(AddressReducer, addressState);

  const [transaction, transactionDispatch] = useReducer(TransactionReducer, transactionState);

  const [order, orderDispatch] = useReducer(OrderReducer, orderState);

  const [store, storeDispatch] = useReducer(StoreReducer, storeState);

  const [product, productDispatch] = useReducer(ProductReducer, productState);

  const [savedCart, savedCartDispatch] = useReducer(SavedCartReducer, savedCartState);


  return {

    header: {
      header,
      headerDispatch
    },

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

    search: {
      search, 
      searchDispatch
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

    store: {
      store, 
      storeDispatch
    },

    product: {
      product, 
      productDispatch
    },

    savedCart: {
      savedCart, 
      savedCartDispatch
    },

  }
}

export function useAppContext() {
  return useContext(AppContext);
}
