import { useMemo } from 'react';
import moment from 'moment';
import User from '../models/User';
import WorkingHour from '../models/WorkingHour';
import { useAppContext } from './contextHook';

export function useUserStatus(status) {
  switch(status) {

    case User.STATUS_PENDING:
      return '_extra.Pending';

    case User.STATUS_EMAIL_PENDING:
      return '_extra.Email_pending';

    case User.STATUS_ACTIVE:
      return '_extra.Active';

    case User.STATUS_ACTIVATING:
      return '_extra.Activating';

    case User.STATUS_DEACTIVATED:
      return '_extra.Deactivating';

    default:
      return status;
  }
}

export function useUserStatusText() {
  return function(status) {
    switch(status) {
  
      case User.STATUS_PENDING:
        return '_extra.Pending';
  
      case User.STATUS_EMAIL_PENDING:
        return '_extra.Email_pending';
  
      case User.STATUS_ACTIVE:
        return '_extra.Active';
  
      case User.STATUS_ACTIVATING:
        return '_extra.Activating';
  
      case User.STATUS_DEACTIVATED:
        return '_extra.Deactivating';
  
      default:
        return status;
    }
  }
}

export function useWorkingHoursDay() {
  return function (day) {
    switch(day) {

      case WorkingHour.DAY_SUNDAY:
        return '_extra.Sunday'
        case WorkingHour.DAY_MONDAY:
        return '_extra.Monday'
        case WorkingHour.DAY_TUESDAY:
        return '_extra.Tuesday'
        case WorkingHour.DAY_WEDNESDAY:
        return '_extra.Wednesday'
        case WorkingHour.DAY_THURSDAY:
        return '_extra.Thursday'
        case WorkingHour.DAY_FRIDAY:
        return '_extra.Friday'
      case WorkingHour.DAY_SATURDAY:
        return '_extra.Saturday';
  
      default:
        return day;
    }
  }
}

export function useWorkingHourActive() {
  return function(workingHours) {
    const now = new Date();
    const dayNow = WorkingHour.getDays()[now.getDay()];
    const workingHour = workingHours?.find(hour => hour.day === dayNow);
    const opening = new Date(`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()} ${workingHour?.opening}`);
    const closing = new Date(`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()} ${workingHour?.closing}`);

    if (workingHour && now.getTime() >= opening.getTime() && now.getTime() < closing.getTime()) {
      return '_extra.Open';
    } else {
      return '_extra.Closed';
    }
  }
}

export function useShare() {
  const url = 'https://dailyneeds.com.ng/';
  function urlShare(path) {
    navigator.share({ url: `${url}${path}` });
  }

  return [
    urlShare,
    navigator.share !== undefined,
    url,
  ];
}

export function useURLQuery(params) {
  const search = useMemo(function() { return new URLSearchParams(window.location.search); }, []);
  return params.map(i=> search.get(i));
}

export function useMoneyFormatter() {
  return function(amount) {
    return <>&#8358; {amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</>;
  }
}

export function useISODateString() {
  return function(date) {
    if (!date) return '';
    const d = new Date(date);
    const s = d.toISOString();
    return s.substring(0, s.length-8);
  }
}

export function useDateFormatter() {

  return function (date, type) {
    let format = 'hh:mma Do MMM YYYY';

    if (type?.time === true) {
      format = 'hh:mma';
    }

    if (type?.date === true) {
      format = 'Do MMM YYYY';
    }

    if (type?.addDate === true) {
      date = new Date(`October 13, 2014 ${date}`);
    }
    
    return moment(date).format(format);
  }
}

export function useDifferentTextColor(index) {
  const colors = ['text-blue-500', 'text-purple-500', 'text-red-500', 'text-green-500'];
  return colors[index%colors.length];
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
  return function(text) {
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

export function useLoadOnListScroll() {
  return function(page, numberOfPages, error, scrollCount=5) {
    return page % scrollCount !== 0 && page <= numberOfPages && error === null;
  }
}

export function useListFooter() {

  return function (values) {
    for(const v of values) {
      if (v.canRender) {
        return v.render();
      }
    }
  }
}

