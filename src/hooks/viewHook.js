import moment from 'moment';
import { useLocation } from 'react-router-dom';
import { FETCH_STATUSES } from "../repositories/Fetch";
import { useAppContext } from './contextHook';

export function useURLQuery() {
  return new URLSearchParams(useLocation().search);
}

export function useMoneyFormat(amount) {
  return <>&#8358; {amount.toFixed(2)}</>;
}

export function useDateFormat(date, type) {

  let format = 'hh:mma Do MMM YYYY';

  if (type?.time === true) {
    format = 'hh:mma';
  }

  if (type?.date === true) {
    format = 'Do MMM YYYY';
  }
  
  return moment(date).format(format);
}

export function useCategoryColor(index) {
  const catColors = ['text-blue-500', 'text-purple-500', 'text-red-500', 'text-green-500'];
  return catColors[index%catColors.length];
}

export function useCartCounter() {
  const { 
    cart: {
      cart: {
        cartItems
      }
    } 
  } = useAppContext();
  return cartItems.length < 100 ? cartItems.length : '99+';
}

export function useCopyText() {
  return (text)=> {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    } else {
      const input = document.createElement('input');
      input.value = text;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
    }
  }
}

export function useHasMoreToFetchViaScroll(page, numberOfPages, status, scrollCount=5) {
  return page % scrollCount !== 0 && page <= numberOfPages && status !== FETCH_STATUSES.ERROR;
}

export function useUpdateListFetchStatus() {
    
  return (page, numberOfPages, dataLength, fetchedDataLength)=> {
    
    if ((page+1) <= numberOfPages) 
      return FETCH_STATUSES.MORE;
    else if (dataLength === 0 && fetchedDataLength < 1) 
      return FETCH_STATUSES.EMPTY;
    else 
      return FETCH_STATUSES.DONE;
  }
}

export function useRenderOnDataFetched(
  status, 
  viewCallback, 
  loadingCallback, 
  errorCallback, 
  notFoundCallback, 
  forbiddenCallback
) {

  let theStatus = '';
  
  if (Array.isArray(status)) {
    for(let s of status) {
      if (s !== FETCH_STATUSES.DONE) {
        theStatus = s;
        break;
      }
    }
  } else {
    theStatus = status
  }

  switch (theStatus) {

    case FETCH_STATUSES.LOADING:
      return loadingCallback();

    case FETCH_STATUSES.ERROR:
      return errorCallback();
    
    case FETCH_STATUSES.NOT_FOUND:
      return notFoundCallback();

    case FETCH_STATUSES.FORBIDDEN:
      return forbiddenCallback();

    default: 
      return viewCallback();
  }
}

export function useRenderListFooter(
  status, 
  loadingCallback,
  errorCallback, 
  emptyCallback, 
  fetchMoreCallback, 
  notFoundCallback, 
  forbiddenCallback
) {
  
  switch(status) {
    
    case FETCH_STATUSES.LOADING:
      return loadingCallback();
  
    case FETCH_STATUSES.ERROR:
      return errorCallback();
    
    case FETCH_STATUSES.EMPTY:
      return emptyCallback();
    
    case FETCH_STATUSES.MORE:
      return fetchMoreCallback();

    case FETCH_STATUSES.NOT_FOUND:
        return notFoundCallback();
      
    case FETCH_STATUSES.FORBIDDEN:
        return forbiddenCallback();

    default:
      return null;
  }
}


