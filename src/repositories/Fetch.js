
export default class Fetch {

  static API_DOMAIN = 'http://localhost:3001/'; //'https://shoppa-app-api.herokuapp.com/';

  static API_URL = `${Fetch.API_DOMAIN}api/`;

  static FILE_CONTENT_TYPE = 'multipart/form-data';

  static PAGE_LIMIT = 10;

  static PAGE_LIMIT_BIG = 20;
  
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
