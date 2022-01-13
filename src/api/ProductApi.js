
import { FETCH_STATUSES, PRODUCT, getProductFetchStatusAction, getProductsListFetchStatusAction, getRelatedProductsListFetchStatusAction } from "../context/AppActions";
import API from "./API";

export default class ProductApi extends API {

  async add(formData) {
    const data = await this.apiFetch(
      'post/auth-customer.json', 
      'GET', //'POST',
      formData
    );
  
    return data.data;
  }

  async update(id, formData) {
    const data = await this.apiFetch(
      `post/auth-customer.json?id=${id}`, 
      'GET', //'PUT',
      formData
    );
  
    return data.data;
  }

  async updatePhoto(formData) {
    const data = await this.apiFetch(
      'post/auth-customer.json', 
      'GET', //'PUT',
      formData
    );
  
    return data.data;
  }

  async get(id, dispatch) {
    
    try {
      const data = await this.apiFetch(
        `product/get.json?id=${id}`,
        'GET'
      );

      data.data.id = id;

      dispatch({
        type: PRODUCT.FETCHED,
        payload: data.data
      });
      
    } catch (err) {
      dispatch(getProductFetchStatusAction(FETCH_STATUSES.ERROR));
    }
  }

  async getListByRecommended(dispatch) {
    try {
      const data = await this.apiFetch(
        `product/list.json`,
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

  async getListByStore(id, page, category, dispatch) {
    try {
      const data = await this.apiFetch(
        `product/list.json?id=${id}&page=${page}&category=${category}`,
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

  async getListByRelated(id, page, dispatch) {
    try {
      const data = await this.apiFetch(
        `product/list.json?id=${id}&page=${page}`,
        'GET'
      );
      
      dispatch({
        type: PRODUCT.RELATED_LIST_FETCHED,
        payload: {
          related: data.data,
          relatedNumberOfPages: data.total_pages
        }
      });

    } catch (err) {
      dispatch(getRelatedProductsListFetchStatusAction(FETCH_STATUSES.ERROR));
    }
  }

  async getListByCustomer(id, page, dispatch) {
    try {
      const data = await this.apiFetch(
        `product/list.json?id=${id}&page=${page}`,
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

  async getListBySearchQuery(query, dispatch) {
    try {
      const data = await this.apiFetch(
        `product/list.json?q=${query}`,
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


