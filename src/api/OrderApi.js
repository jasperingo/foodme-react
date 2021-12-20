
import { FETCH_STATUSES, getOrderFetchStatusAction, getOrdersListFetchStatusAction, ORDER } from "../context/AppActions";
import API from "./API";

export default class OrderApi extends API {

  async get(id, dispatch) {
    try {
      const data = await this.apiFetch(
        `order/get.json?id=${id}`,
        'GET'
      );

      data.data.id = id;
      
      dispatch({
        type: ORDER.FETCHED,
        payload: data.data
      });

    } catch (err) {
      dispatch(getOrderFetchStatusAction(FETCH_STATUSES.ERROR));
    }
  }

  async getListByRecent(dispatch) {
    try {
      const data = await this.apiFetch(
        `order/list.json`,
        'GET'
      );
      
      dispatch({
        type: ORDER.LIST_FETCHED,
        payload: {
          orders: data.data,
          ordersNumberOfPages: data.total_pages
        }
      });

    } catch (err) {
      dispatch(getOrdersListFetchStatusAction(FETCH_STATUSES.ERROR));
    }
  }

  async getListByAdminAndStatus(status, dispatch) {
    try {
      const data = await this.apiFetch(
        `order/list.json?status=${status}`,
        'GET'
      );
      
      dispatch({
        type: ORDER.LIST_FETCHED,
        payload: {
          orders: data.data,
          ordersNumberOfPages: data.total_pages
        }
      });

    } catch (err) {
      dispatch(getOrdersListFetchStatusAction(FETCH_STATUSES.ERROR));
    }
  }

  async getListByCustomer(id, page, dispatch) {
    try {
      const data = await this.apiFetch(
        `order/list.json?id=${id}&page=${page}`,
        'GET'
      );
      
      dispatch({
        type: ORDER.LIST_FETCHED,
        payload: {
          orders: data.data,
          ordersNumberOfPages: data.total_pages
        }
      });

    } catch (err) {
      dispatch(getOrdersListFetchStatusAction(FETCH_STATUSES.ERROR));
    }
  }

  async getListByStore(id, page, dispatch) {
    try {
      const data = await this.apiFetch(
        `order/list.json?id=${id}&page=${page}`,
        'GET'
      );
      
      dispatch({
        type: ORDER.LIST_FETCHED,
        payload: {
          orders: data.data,
          ordersNumberOfPages: data.total_pages
        }
      });

    } catch (err) {
      dispatch(getOrdersListFetchStatusAction(FETCH_STATUSES.ERROR));
    }
  }

}
