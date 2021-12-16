
import { 
  FETCH_STATUSES, 
  getProductsListFetchStatusAction, 
  getPromotionFetchStatusAction, 
  getPromotionsListFetchStatusAction, 
  PRODUCT, 
  PROMOTION 
} from "../context/AppActions";
import API from "./API";

export default class PromotionApi extends API {

  async get(id, dispatch) {
    try {
      const data = await this.apiFetch(
        `promotion.json?id=${id}`,
        'GET'
      );

      data.data.id = id;
      
      dispatch({
        type: PROMOTION.FETCHED,
        payload: data.data
      });

    } catch (err) {
      dispatch(getPromotionFetchStatusAction(FETCH_STATUSES.ERROR));
    }
  }

  async getListByStore(dispatch) {
    try {
      const data = await this.apiFetch(
        `promotions.json`,
        'GET'
      );
      
      dispatch({
        type: PROMOTION.LIST_FETCHED,
        payload: {
          promotions: data.data,
          promotionsNumberOfPages: data.total_pages
        }
      });

    } catch (err) {
      dispatch(getPromotionsListFetchStatusAction(FETCH_STATUSES.ERROR));
    }
  }

  async getProducts(id, dispatch) {
    try {
      const data = await this.apiFetch(
        `store-products.json?id=${id}`,
        'GET'
      );
      
      dispatch({
        type: PRODUCT.LIST_FETCHED,
        payload: {
          products: data.data,
          productsNumberOfPages: data.total_pages
        }
      });
    } catch (err) {
      dispatch(getProductsListFetchStatusAction(FETCH_STATUSES.ERROR));
    }
  }

}

