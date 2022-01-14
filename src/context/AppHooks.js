
import { useLocation } from "react-router-dom";
import { FETCH_STATUSES } from './AppActions';
import { useAppContext } from "./AppContext";

export function useURLQuery() {
  return new URLSearchParams(useLocation().search);
}

export function useMoneyFormat(amount) {
  return <>&#8358; {amount.toFixed(2)}</>;
}

export function useDateFormat(date) {
  return date;
}

export function useUserAuthed() {
  const { user: { user } } = useAppContext();
  return user !== null && user.api_token !== undefined;
}

export function useAuthHTTPHeader() {
  const { user: { user } } = useAppContext();
  return { 'Authorization': `Bearer ${user.api_token}` };
}

export function useCartCounter() {
  const { cart: {cartItems} } = useAppContext();
  return cartItems.length-1 < 100 ? cartItems.length-1 : '99+';
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

export function useHeader2Title() {

  const path = useLocation().pathname;

  if (path === '/login')
    return '_user.Log_in';

  if (path === '/register')
    return '_user.Register';

  if (path === '/forgot-password')
    return '_user.Forgot_password';

  if (path === '/reset-password')
    return '_user.Reset_password';
  
  if (path === '/about-us')
    return '_extra.About_us';

  if (path === '/contact-us')
    return '_extra.Contact_us';

  if (path === '/privacy-policy')
    return '_extra.Privacy_policy';

  if (path === '/terms-of-service')
    return '_extra.Terms_of_service';

  if (path === '/settings/password')
    return '_user.Password';

  if (path === '/settings/withdrawal-account')
    return '_transaction.Bank_account';

  if (path === '/settings/address')
    return '_user.Address';
  
  if (path === '/profile')
    return '_user.Profile';

  if (path === '/customer/add')
    return '_user.Add_customer';

  if (path === '/customers')
    return '_user.Customers';

  if (path === '/store/add')
    return '_store.Add_store';
  
  if (path === '/stores')
    return '_store.Stores';

  if (path === '/delivery-firms')
    return '_delivery.Delivery_firms';

  if (path === '/sub-category/add')
    return '_category.Add_sub_category';

  if (path === '/category/add')
    return '_category.Add_category';

  if (path === '/categories')
    return '_category.Categories';

  if (path === '/messages')
    return '_message.Messages';

  if (path === '/cart')
    return '_cart.Cart';

  if (['/search', '/search/history', '/search/customers', '/search/stores', '/search/products', '/search/orders', '/search/delivery-firms'].includes(path))
    return '_search.Search';

  if (path === '/promotions')
    return '_discount.Promotions';

  if (path === '/promotion/add')
    return '_discount.Add_promotion';

  if (path === '/product/add')
    return '_product.Add_product';

  if (path === '/address/add')
    return '_user.Add_address';

  if (path === '/addresses')
    return '_user.Addresses';

  if (/address\/[0-9]+/.test(path))
    return '_user.Edit_address';
  
  if (path === '/wallet')
    return '_transaction.Wallet';

  if (path === '/transactions')
    return '_transaction.Transactions';

  if (/transaction\/[0-9A-Z]+/.test(path))
    return '_transaction.Transaction';
  
  if (path === '/favorites')
    return '_extra.Favorites';

  if (path === '/reviews')
    return '_review.Reviews';

  if (path === '/saved-carts')
    return '_cart.Saved_carts';

  if (path === '/profile')
    return '_user.Profile';
  
  if (path === '/orders')
    return '_order.Orders';

  if (/route\/[0-9]+/.test(path))
    return '_delivery.Route';

  if (/customer\/[0-9]+\/update/.test(path))
    return '_user.Edit_customer';

  if (/product\/[0-9]+\/update/.test(path))
    return '_product.Edit_product';

  if (/messages\/[0-9]+/.test(path))
    return '_message.Messages';
  
  if (/customer\/[0-9]+/.test(path))
    return '_user.Customer';
  
  if (/delivery-firm\/[0-9]+/.test(path))
    return '_delivery.Delivery_firm';
  
  if (/sub-category\/[0-9]+\/update/.test(path))
    return '_category.Edit_sub_category';
  
  if (/category\/[0-9]+\/update/.test(path))
    return '_category.Edit_category';

  if (/category\/[0-9]+/.test(path))
    return '_category.Category';

  if (/account\/order\/[0-9]+/.test(path) || /order\/[0-9]+/.test(path))
    return '_order.Order_details';
    
  if (/store\/[0-9]+/.test(path) || /store\/[0-9]+\/products/.test(path) || /store\/[0-9]+\/reviews/.test(path) || /store\/[0-9]+\/promotions/.test(path))
    return '_store.Store';

  if (/store\/[0-9]+\/promotion\/[0-9]+/.test(path) || /account\/promotion\/[0-9]+/.test(path))
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

export function useTransactionStatus(status) {

  let theStatus, statusColor;

  switch(status) {
    case 'processing':
      theStatus = '_order.Processing';
      statusColor = 'bg-purple-500';
      break;
    case 'failed':
      theStatus = '_extra.Failed';
      statusColor = 'bg-red-500';
      break;
    case 'approved':
      theStatus = '_extra.Approved';
      statusColor = 'bg-green-500';
      break;
    default: 
      theStatus = '_order.Pending';
      statusColor = 'bg-gray-500';
  }
  
  return [theStatus, statusColor];
}

export function useTransactionType(type) {
 
  switch(type) {

    case 'refund':
      return '_transaction.Refund';

    default:
      return '_transaction.Payment';
  }
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


