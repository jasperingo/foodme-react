
export default class API {

  static API_URL = '/faker/';

  static FILE_CONTENT_TYPE = 'multipart/form-data';

  constructor( apiToken = null, contentType = 'application/json' ) {
    this.apiToken = apiToken;
    this.contentType = contentType;
  }
 
  async apiFetch(url, method, body = undefined) {

    const headers = { 
      'Content-Type': this.contentType,
      'X-Requested-With': 'XMLHttpRequest',
    };

    if (this.apiToken !== null) {
      headers['Authorization'] = `Bearer ${this.apiToken}`;
    }

    const response = await fetch(`${API.API_URL}${url}`, {
      method,
      //headers,
      //body
    });

    if (response.status === 401 || response.status >= 500)
      throw new Error(response.status);

    let data = await response.json();

    if (response.status >= 400)
      throw data;
    
    return data;
  }

}

