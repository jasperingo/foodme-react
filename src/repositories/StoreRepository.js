
import Fetch from "./Fetch";

export default class StoreRepository extends Fetch {

  create(formData) {
    return this.apiFetch(
      'store/register',
      'POST',
      JSON.stringify(formData)
    );
  }

  auth(formData) {
    return this.apiFetch(
      'store/login',
      'POST',
      JSON.stringify(formData)
    );
  }

  update(id, formData) {
    return this.apiFetch(
      `store/${id}/update`,
      'PUT',
      JSON.stringify(formData)
    );
  }

  updatePhoto(id, formData) {
    return this.apiFetch(
      `store/${id}/photo/update`, 
      'PUT',
      formData
    );
  }

  updateWithdrawalAccount(id, formData) {
    return this.apiFetch(
      `store/${id}/withdrawal-account/update`,
      'PUT',
      JSON.stringify(formData)
    );
  }
  
  updateAddress(id, formData) {
    return this.apiFetch(
      `store/${id}/address/update`,
      'PUT',
      JSON.stringify(formData)
    );
  }

  updateWorkingHours(id, formData) {
    return this.apiFetch(
      `store/${id}/working-hours/update`,
      'PUT',
      JSON.stringify(formData)
    );
  }

  updateStatus(id, formData) {
    return this.apiFetch(
      `store/${id}/status/update`,
      'PUT',
      JSON.stringify(formData)
    );
  }

  updateRecommended(id, formData) {
    return this.apiFetch(
      `store/${id}/recommended/update`,
      'PUT',
      JSON.stringify(formData)
    );
  }

  get(id) {
    return this.apiFetch(
      `store/${id}`,
      'GET'
    );
  }

  getList(page) {
    return this.apiFetch(
      `store/list?page=${page}&page_limit=${Fetch.PAGE_LIMIT}`,
      'GET'
    );
  }

  getRecommendedList() {
    return this.apiFetch(
      `store/recommended/list?page_limit=${Fetch.PAGE_LIMIT_BIG}`,
      'GET'
    );
  }
  
  getRandomList() {
    return this.apiFetch(
      `store/random/list?page_limit=${Fetch.PAGE_LIMIT_BIG}`,
      'GET'
    );
  }

  getSearchList(q, subCategory, page) {

    const params = new URLSearchParams();

    params.append('page', page);

    params.append('page_limit', Fetch.PAGE_LIMIT);

    if (q) {
      params.append('q', q);
    }

    if (subCategory) {
      params.append('sub_category', subCategory);
    }

    return this.apiFetch(
      `store/search?${params.toString()}`,
      'GET'
    );
  }
  
  getProductCategoryList(id) {
    return this.apiFetch(
      `store/${id}/category/product/list`,
      'GET'
    );
  }

  getProductsList(id, page, subCategory) {

    const params = new URLSearchParams();

    params.append('page', page);

    params.append('page_limit', Fetch.PAGE_LIMIT);

    if (subCategory) {
      params.append('sub_category_id', subCategory);
    }
    
    return this.apiFetch(
      `store/${id}/product/list?${params.toString()}`,
      'GET'
    );
  }

  getReviewsList(id, page) {
    return this.apiFetch(
      `store/${id}/review/list?page=${page}&page_limit=${Fetch.PAGE_LIMIT}`,
      'GET'
    );
  }
  
  getDiscountsList(id, page) {
    return this.apiFetch(
      `store/${id}/discount/list?page=${page}&page_limit=${Fetch.PAGE_LIMIT}`,
      'GET'
    );
  }

  getProductsWithDiscountList(id, discountId, page) {
    return this.apiFetch(
      `store/${id}/product/discount/${discountId}/list?page=${page}&page_limit=${Fetch.PAGE_LIMIT}`,
      'GET'
    );
  }

  getOrdersList(id, page, status) {

    const params = new URLSearchParams();

    params.append('page', page);

    params.append('page_limit', Fetch.PAGE_LIMIT);

    if (status) {
      params.append('status', status);
    }
    
    return this.apiFetch(
      `store/${id}/order/list?${params.toString()}`,
      'GET'
    );
  }

  getTransactionBalance(id) {
    return this.apiFetch(
      `store/${id}/transaction/balance`,
      'GET'
    );
  }

  getTransactionList(id, page) {
    return this.apiFetch(
      `store/${id}/transaction/list?page=${page}&page_limit=${Fetch.PAGE_LIMIT}`,
      'GET'
    );
  }

  getSavedCartsList(id, page) {
    return this.apiFetch(
      `store/${id}/saved-cart/list?page=${page}&page_limit=${Fetch.PAGE_LIMIT}`,
      'GET'
    );
  }

}
