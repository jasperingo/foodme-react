import { useContext, useReducer } from "react";
import AppContext from "../context/AppContext";
import AddressReducer from "../context/reducers/AddressReducer";
import AdminReducer from "../context/reducers/AdminReducer";
import BankReducer from "../context/reducers/BankReducer";
import CartReducer from "../context/reducers/CartReducer";
import CategoryReducer from "../context/reducers/CategoryReducer";
import CustomerReducer from "../context/reducers/CustomerReducer";
import DashboardReducer from "../context/reducers/DashboardReducer";
import DeliveryFirmReducer from "../context/reducers/DeliveryFirmReducer";
import DeliveryRouteReducer from "../context/reducers/DeliveryRouteReducer";
import DiscountReducer from "../context/reducers/DiscountReducer";
import HeaderReducer from "../context/reducers/HeaderReducer";
import HomeReducer from "../context/reducers/HomeReducer";
import MessageReducer from "../context/reducers/MessageReducer";
import OrderReducer from "../context/reducers/OrderReducer";
import ProductReducer from "../context/reducers/ProductReducer";
import PromotionReducer from "../context/reducers/PromotionReducer";
import SavedCartReducer from "../context/reducers/SavedCartReducer";
import SearchReducer from "../context/reducers/SearchReducer";
import StoreReducer from "../context/reducers/StoreReducer";
import TransactionReducer from "../context/reducers/TransactionReducer";
import addressState from "../context/states/addressState";
import adminState from "../context/states/adminState";
import bankState from "../context/states/bankState";
import cartState from "../context/states/cartState";
import categoryState from "../context/states/categoryState";
import customerState from "../context/states/customerState";
import dashboardState from "../context/states/dashboardState";
import deliveryFirmState from "../context/states/deliveryFirmState";
import deliveryRouteState from "../context/states/deliveryRouteState";
import discountState from "../context/states/discountState";
import headerState from "../context/states/headerState";
import homeState from "../context/states/homeState";
import messageState from "../context/states/messageState";
import orderState from "../context/states/orderState";
import productState from "../context/states/productState";
import promotionState from "../context/states/promotionState";
import savedCartState from "../context/states/savedCartState";
import searchState from "../context/states/searchState";
import storeState from "../context/states/storeState";
import transactionState from "../context/states/transactionState";

export function useAppContextValues() {
  
  const [header, headerDispatch] = useReducer(HeaderReducer, headerState);

  const [admin, adminDispatch] = useReducer(AdminReducer, adminState);

  const [customer, customerDispatch] = useReducer(CustomerReducer, customerState);

  const [home, homeDispatch] = useReducer(HomeReducer, homeState);

  const [dashboard, dashboardDispatch] = useReducer(DashboardReducer, dashboardState);

  const [search, searchDispatch] = useReducer(SearchReducer, searchState);

  const [category, categoryDispatch] = useReducer(CategoryReducer, categoryState);
  
  const [bank, bankDispatch] = useReducer(BankReducer, bankState);

  const [address, addressDispatch] = useReducer(AddressReducer, addressState);

  const [transaction, transactionDispatch] = useReducer(TransactionReducer, transactionState);

  const [order, orderDispatch] = useReducer(OrderReducer, orderState);

  const [store, storeDispatch] = useReducer(StoreReducer, storeState);

  const [product, productDispatch] = useReducer(ProductReducer, productState);

  const [savedCart, savedCartDispatch] = useReducer(SavedCartReducer, savedCartState);

  const [discount, discountDispatch] = useReducer(DiscountReducer, discountState);

  const [cart, cartDispatch] = useReducer(CartReducer, cartState);
  
  const [deliveryFirm, deliveryFirmDispatch] = useReducer(DeliveryFirmReducer, deliveryFirmState);

  const [deliveryRoute, deliveryRouteDispatch] = useReducer(DeliveryRouteReducer, deliveryRouteState);

  const [promotion, promotionDispatch] = useReducer(PromotionReducer, promotionState);

  const [message, messageDispatch] = useReducer(MessageReducer, messageState);


  return {

    header: {
      header,
      headerDispatch
    },

    admin: {
      admin, 
      adminDispatch
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

    dashboard: {
      dashboard, 
      dashboardDispatch
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

    discount: {
      discount, 
      discountDispatch
    },

    cart: {
      cart, 
      cartDispatch
    },

    deliveryFirm: {
      deliveryFirm, 
      deliveryFirmDispatch
    },

    deliveryRoute: {
      deliveryRoute, 
      deliveryRouteDispatch
    },

    promotion: {
      promotion, 
      promotionDispatch
    },

    message: {
      message, 
      messageDispatch
    },

  }
}

export function useAppContext() {
  return useContext(AppContext);
}
