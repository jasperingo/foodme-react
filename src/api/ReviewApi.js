
import { FETCH_STATUSES, REVIEW, getReviewsListFetchStatusAction } from "../context/AppActions";
import API from "./API";

export default class ReviewApi extends API {

  async getListByStore(id, page, dispatch) {
    
    try {
      const data = await this.apiFetch(
        `review/list.json?id=${id}&page=${page}`,
        'GET'
      );

      dispatch({
        type: REVIEW.LIST_FETCHED,
        payload: {
          reviews: data.data,
          reviewsNumberOfPages: data.total_pages
        }
      });
      
    } catch (err) {
      dispatch(getReviewsListFetchStatusAction(FETCH_STATUSES.ERROR));
    }
  }

  async getListByProduct(id, page, dispatch) {
    
    try {
      const data = await this.apiFetch(
        `review/list.json?id=${id}&page=${page}`,
        'GET'
      );

      dispatch({
        type: REVIEW.LIST_FETCHED,
        payload: {
          reviews: data.data,
          reviewsNumberOfPages: data.total_pages
        }
      });
      
    } catch (err) {
      dispatch(getReviewsListFetchStatusAction(FETCH_STATUSES.ERROR));
    }
  }

}



