
import Fetch from "./Fetch";

export default class LocationRepository extends Fetch {

  getList() {
    return this.apiFetch(
      `location/list`,
      'GET'
    );
  }
  
}
