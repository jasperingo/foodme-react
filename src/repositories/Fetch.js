
export const FETCH_STATUSES = {
  PENDING: 'PENDING',
  LOADING: 'LOADING',
  EMPTY: 'EMPTY',
  ERROR: 'ERROR',
  MORE: 'MORE',
  NOT_FOUND: 'NOT_FOUND',
  FORBIDDEN: 'FORBIDDEN',
  DONE: 'DONE'
};

export default class Fetch {

  static API_URL = 'https://shoppa-app-api.herokuapp.com/api/';

  static FILE_CONTENT_TYPE = 'multipart/form-data';
  
  constructor( apiToken = null, contentType = 'application/json' ) {
    this.apiToken = apiToken;
    this.contentType = contentType;
  }
 
  async apiFetch(url, method, body = undefined) {

    const headers = {
      'X-Requested-With': 'XMLHttpRequest',
    };

    if (this.contentType !== null) {
      headers['Content-Type'] = this.contentType;
    }

    if (this.apiToken !== null) {
      headers['Authorization'] = `Bearer ${this.apiToken}`;
    }

    const response = await fetch(`${Fetch.API_URL}${url}`, {
      method,
      headers,
      body
    });

    const data = await response.json();
    
    return { status: response.status, body: data };
  }

}

