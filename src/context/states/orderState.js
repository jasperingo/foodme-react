import { FETCH_STATUSES } from "../../repositories/Fetch";

const orderState = {
  
  orders: [],
  ordersPage: 1,
  ordersLoading: true,
  ordersNumberOfPages: 0,
  ordersStatus: 'pending',
  ordersFetchStatus: FETCH_STATUSES.LOADING,
  
  order: null,
  orderID: null,
  orderLoading: true,
  orderFetchStatus: FETCH_STATUSES.LOADING,
  
};

export default orderState;
