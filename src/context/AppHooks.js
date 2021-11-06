
import { useLocation } from "react-router-dom";
import { FETCH_STATUSES } from './AppActions';

export function useURLQuery() {
  return new URLSearchParams(useLocation().search);
}

export function useMoneyFormat(amount) {
  return <>&#8358; {amount.toFixed(2)}</>;
}

export function useDateFormat(date) {
  return date;
}


export function useHeader2Title() {

  const path = useLocation().pathname;

  if (path === '/login')
    return 'Login';

  if (path === '/register')
    return 'Register';
  
  if (path === '/about-us')
    return 'About_us';

  if (path === '/contact-us')
    return 'Contact_us';

  if (path === '/terms-of-service')
    return 'Terms_of_service';

  if (path === '/messages')
    return '_message.Messages';

  if (path === '/cart')
    return '_cart.Cart';
  
  if (path === '/search/products')
    return '_search.Search';

  if (path === '/search/history' || path === '/search/products' || path === '/search/stores')
    return '_search.Search';

  if (path === '/account/address/add')
    return '_user.Add_address';

  if (path === '/account/addresses')
    return '_user.Addresses';

  if (/account\/address\/[0-9]+/.test(path))
    return '_user.Edit_address';
  
  if (path === '/account/transactions')
    return '_transaction.Transactions';
  
  if (path === '/account/favorites')
    return '_extra.Favorites';

  if (path === '/account/saved-carts')
    return '_cart.Saved_carts';

  if (path === '/account/profile')
    return '_user.Profile';
  
  if (path === '/account/orders')
    return '_order.Orders';

  if (/messages\/[0-9]+/.test(path))
    return '_message.Messages';

  if (/account\/order\/[0-9]+/.test(path))
    return '_order.Order_details';
    
  if (/store\/[0-9]+\/products/.test(path) || /store\/[0-9]+\/reviews/.test(path) || /store\/[0-9]+\/promotions/.test(path))
    return '_store.Store';

  if (/store\/[0-9]+\/promotion\/[0-9]+/.test(path) || /promotion\/[0-9]+/.test(path))
    return '_discount.Promotion';

  if (/store\/[0-9]+\/product\/[0-9]+/.test(path) || /product\/[0-9]+/.test(path))
    return '_product.Product';

  return 'app_name';
}

export function useListFetchStatus() {
    
  return (page, numberOfPages, dataLength, fetchedDataLength)=> {
    
    if ((page+1) < numberOfPages) 
      return FETCH_STATUSES.MORE;
    else if (dataLength === 1 && fetchedDataLength < 1) 
      return FETCH_STATUSES.EMPTY;
    else 
      return FETCH_STATUSES.DONE;
  }
}

export function useCategoryColor(index) {
  const catColors = ['text-blue-500', 'text-purple-500', 'text-red-500', 'text-green-500'];
  return catColors[index%catColors.length];
}

export function useOrderStatus(status) {
  let theStatus, statusColor;

  switch(status) {
    case 'declined':
      theStatus = '_order.Declined';
      statusColor = 'bg-red-500';
      break;
    case 'cancelled':
      theStatus = '_order.Cancelled';
      statusColor = 'bg-red-500';
      break;
    case 'processing':
      theStatus = '_order.Processing';
      statusColor = 'bg-purple-500';
      break;
    case 'in-transit':
      theStatus = '_order.In_transit';
      statusColor = 'bg-blue-500';
      break;
    case 'delivered':
      theStatus = '_order.Delivered';
      statusColor = 'bg-green-500';
      break;
    case 'returned':
      theStatus = '_order.Returned';
      statusColor = 'bg-gray-500';
      break;
    default: 
      theStatus = '_order.Pending';
      statusColor = 'bg-yellow-500';
  }

  return [theStatus, statusColor];
}

export function useHasMoreToFetchViaScroll(page, numberOfPages, status, scrollCount=5) {
  return page%scrollCount !== 0 && 
          page < numberOfPages && 
          status !== FETCH_STATUSES.ERROR;
}

export function useDataRender(item, status, viewCallback, loadingCallback, errorCallback, options={}) {
  
  if (item === null) {
    if (status === FETCH_STATUSES.LOADING) {
      return loadingCallback(FETCH_STATUSES.LOADING);
    }

    if (status === FETCH_STATUSES.ERROR) {
      return errorCallback(FETCH_STATUSES.ERROR);
    }

    if (status === FETCH_STATUSES.DONE) {
      return '';
    }
  }

  return viewCallback(item);
}

export function useListRender(items, status, viewCallback, loadingCallback, errorCallback, emptyCallback, fetchMoreCallback, options={}) {
  return items.map((item, i)=> {
    
    if (item === null) {
      if (status === FETCH_STATUSES.LOADING) {
        return loadingCallback(FETCH_STATUSES.LOADING);
      }

      if (status === FETCH_STATUSES.ERROR) {
        return errorCallback(FETCH_STATUSES.ERROR);
      }

      if (status === FETCH_STATUSES.EMPTY) {
        return emptyCallback(FETCH_STATUSES.EMPTY);
      }

      if (status === FETCH_STATUSES.MORE) {
        return fetchMoreCallback(FETCH_STATUSES.MORE);
      }

      if (status === FETCH_STATUSES.DONE) {
        return '';
      }
    }

    return viewCallback(item, i);
  });
}


