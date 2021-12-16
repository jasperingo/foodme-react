
import { DELIVERY_FIRM, FETCH_STATUSES, getDeliveryFirmsListFetchStatusAction } from "../context/AppActions";
import API from "./API";

export default class DeliveryFirmApi extends API {

  async getList(dispatch) {
    try {
      const data = await this.apiFetch(
        `delivery-firm/list.json`,
        'GET'
      );
      
      dispatch({
        type: DELIVERY_FIRM.LIST_FETCHED,
        payload: {
          deliveryFirms: data.data,
          deliveryFirmsNumberOfPages: data.total_pages
        }
      });

    } catch (err) {
      dispatch(getDeliveryFirmsListFetchStatusAction(FETCH_STATUSES.ERROR));
    }
  }

}

