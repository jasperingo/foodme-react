
import { FETCH_STATUSES } from "./AppActions";

export function getListFetchStatus(page, numberOfPages, dataLength, fetchedDataLength) {
    
  if ((page+1) < numberOfPages) 
    return FETCH_STATUSES.MORE;
  else if (dataLength === 1 && fetchedDataLength < 1) 
    return FETCH_STATUSES.EMPTY;
  else 
    return FETCH_STATUSES.DONE;
}

