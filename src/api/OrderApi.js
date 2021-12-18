
import { FETCH_STATUSES, getOrdersListFetchStatusAction, ORDER } from "../context/AppActions";
import API from "./API";

export default class OrderApi extends API {

  async getListByAdminAndStatus(status, dispatch) {
    try {
      const data = await this.apiFetch(
        `orders.json?status=${status}`,
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

  async getListByCustomer(id, dispatch) {
    try {
      const data = await this.apiFetch(
        `order/list.json?id=${id}`,
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
