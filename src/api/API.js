
export default class API {

  static API_URL = '/faker/';

  constructor( apiToken = null, contentType = 'application/json' ) {
    this.apiToken = apiToken;
    this.contentType = contentType;
  }
 
  apiFetch(url, method, body = undefined) {

    const headers = { 
      'Content-Type': this.contentType,
      'X-Requested-With': 'XMLHttpRequest',
    };

    if (this.apiToken !== null) {
      headers['Authorization'] = `Bearer ${this.apiToken}`;
    }

    return fetch(`${API.API_URL}${url}`, {
      method,
      //headers,
      //body
    });
  }

}

