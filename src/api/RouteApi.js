
import { FETCH_STATUSES, getRoutesListFetchStatusAction, ROUTE } from "../context/AppActions";
import API from "./API";

export default class RouteApi extends API {

  async getList(id, page, dispatch) {
    
    try {
      const data = await this.apiFetch(
        `route/list.json?id=${id}&page=${page}`,
        'GET'
      );

      dispatch({
        type: ROUTE.LIST_FETCHED,
        payload: {
          routes: data.data,
          routesNumberOfPages: data.total_pages
        }
      });
      
    } catch (err) {
      dispatch(getRoutesListFetchStatusAction(FETCH_STATUSES.ERROR));
    }
  }

}

