import { FETCH_STATUSES } from "../../repositories/Fetch";

const dashboardState = {

  statistics: null,
  statisticsLoading: true,
  statisticsFetchStatus: FETCH_STATUSES.LOADING,

  stores: [],
  storesLoading: true,
  storesFetchStatus: FETCH_STATUSES.LOADING,

  customers: [],
  customersLoading: true,
  customersFetchStatus: FETCH_STATUSES.LOADING,

  orders: [],
  ordersLoading: true,
  ordersFetchStatus: FETCH_STATUSES.LOADING,

  deliveryFirms: [],
  deliveryFirmsLoading: true,
  deliveryFirmsFetchStatus: FETCH_STATUSES.LOADING

};

export default dashboardState;

