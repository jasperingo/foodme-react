
import Fetch from "./Fetch";

export default class CustomerRepository extends Fetch {

  create(formData) {
    return this.apiFetch(
      'customer/register',
      'POST',
      JSON.stringify(formData)
    );
  }

  auth(formData) {
    return this.apiFetch(
      'customer/login',
      'POST',
      JSON.stringify(formData)
    );
  }

  update(id, formData) {
    return this.apiFetch(
      `customer/${id}/update`,
      'PUT',
      JSON.stringify(formData)
    );
  }

  updatePhoto(id, formData) {
    return this.apiFetch(
      `customer/${id}/photo/update`, 
      'PUT',
      formData
    );
  }

  updatePassword(id, formData) {
    return this.apiFetch(
      `customer/${id}/password/update`,
      'PUT',
      JSON.stringify(formData)
    );
  }

  updateWithdrawalAccount(id, formData) {
    return this.apiFetch(
      `customer/${id}/withdrawal-account/update`,
      'PUT',
      JSON.stringify(formData)
    );
  }

  get(id) {
    return this.apiFetch(
      `customer/${id}`,
      'GET'
    );
  }

  getList(page) {
    return this.apiFetch(
      `customer/list?page=${page}&page_limit=${Fetch.PAGE_LIMIT}`,
      'GET'
    );
  }


  getAddressesList(id) {
    return this.apiFetch(
      `customer/${id}/address/list`,
      'GET'
    );
  }

  getOrdersList(id, page) {
    return this.apiFetch(
      `customer/${id}/order/list?page=${page}&page_limit=${Fetch.PAGE_LIMIT}`,
      'GET'
    );
  }

  getTransactionsList(id, page) {
    return this.apiFetch(
      `customer/${id}/transaction/list?page=${page}&page_limit=${Fetch.PAGE_LIMIT}`,
      'GET'
    );
  }

  getFavoritesList(id, page) {
    return this.apiFetch(
      `customer/${id}/favorite/list?page=${page}&page_limit=${Fetch.PAGE_LIMIT}`,
      'GET'
    );
  }

  getSavedCartsList(id, page) {
    return this.apiFetch(
      `customer/${id}/saved-cart/list?page=${page}&page_limit=${Fetch.PAGE_LIMIT}`,
      'GET'
    );
  }
  
  // async forgotPassword(formData) {

  //   const data = await this.apiFetch(
  //     'forgot-password.json',
  //     'GET', //'POST',
  //     JSON.stringify(formData)
  //   );
  
  //   return data;
  // }


  // async updatePhoto(id, formData) {

  //   const data = await this.apiFetch(
  //     `customer/get.json?id=${id}`, 
  //     'GET', //'PUT',
  //     formData
  //   );
  
  //   return data;
  // }

  // async updatePassword(id, formData) {

  //   const data = await this.apiFetch(
  //     `customer/get.json?id=${id}`,
  //     'GET', //'PUT',
  //     JSON.stringify(formData)
  //   );
  
  //   return data;
  // }

  // async get(id, dispatch) {
  //   try {
  //     const data = await this.apiFetch(
  //       `customer/get.json?id=${id}`,
  //       'GET'
  //     );

  //     data.data.id = id;
      
  //     dispatch({
  //       type: CUSTOMER.FETCHED,
  //       payload: data.data
  //     });

  //   } catch (err) {
  //     dispatch(getCustomerFetchStatusAction(FETCH_STATUSES.ERROR));
  //   }
  // }

  // async getList(dispatch) {
  //   try {
  //     const data = await this.apiFetch(
  //       `customer/list.json`,
  //       'GET'
  //     );
      
  //     dispatch({
  //       type: CUSTOMER.LIST_FETCHED,
  //       payload: {
  //         customers: data.data,
  //         customersNumberOfPages: data.total_pages
  //       }
  //     });

  //   } catch (err) {
  //     dispatch(getCustomersListFetchStatusAction(FETCH_STATUSES.ERROR));
  //   }
  // }

  // async getListByRecent(dispatch) {
  //   try {
  //     const data = await this.apiFetch(
  //       `customer/list.json`,
  //       'GET'
  //     );
      
  //     dispatch({
  //       type: CUSTOMER.LIST_FETCHED,
  //       payload: {
  //         customers: data.data,
  //         customersNumberOfPages: data.total_pages
  //       }
  //     });

  //   } catch (err) {
  //     dispatch(getCustomersListFetchStatusAction(FETCH_STATUSES.ERROR));
  //   }
  // }

}



