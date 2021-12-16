
import { FETCH_STATUSES, REVIEW, getReviewsListFetchStatusAction } from "../context/AppActions";
import API from "./API";

export default class ReviewApi extends API {

  async getListByStore(dispatch, id) {
    
    try {
      const data = await this.apiFetch(
        `reviews.json?id=${id}`,
        'GET'
      );

      data.data.id = id;

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



