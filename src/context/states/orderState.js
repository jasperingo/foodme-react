import { FETCH_STATUSES } from "../../repositories/Fetch";

const orderState = {
  
  orders: [],
  ordersPage: 1,
  ordersStatus: null,
  ordersLoading: true,
  ordersNumberOfPages: 0,
  ordersFetchStatus: FETCH_STATUSES.LOADING,
  
  order: null,
  orderID: null,
  orderLoading: true,
  orderFetchStatus: FETCH_STATUSES.LOADING,
  
};

export default orderState;
