
import { useLocation } from "react-router-dom";
import { FETCH_STATUSES } from './AppActions';

export function useURLQuery() {
  return new URLSearchParams(useLocation().search);
}

export function useHeaderVisible() {
  return ['/', '/categories', '/cart', '/account'].indexOf(useLocation().pathname) > -1;
}

export function useCategoryColor(index) {
  const catColors = ['text-blue-500', 'text-purple-500', 'text-red-500', 'text-green-500'];
  return catColors[index%catColors.length];
}

export function useListRender(items, viewCallback, loadingCallback, emptyCallback, errorCallback, fetchMoreCallback, options={}) {
  return items.map((item, i)=> {
           
    if (item === FETCH_STATUSES.LOADING) {
      return (
        <li key={FETCH_STATUSES.LOADING}>
          { loadingCallback() }
        </li>
      );
    }

    if (item === FETCH_STATUSES.ERROR) {
      return (
        <li key={FETCH_STATUSES.ERROR}>
          { errorCallback() }
        </li>
      );
    }

    if (item === FETCH_STATUSES.EMPTY) {
      return (
        <li key={FETCH_STATUSES.EMPTY}>
          { emptyCallback() }
        </li>
      );
    }

    if (item === FETCH_STATUSES.MORE) {
      return (
        <li key={FETCH_STATUSES.MORE}>
          { fetchMoreCallback() }
        </li>
      );
    }

    return (
      <li key={ `${options.viewKeyPrefix}_${i}`}>
        { viewCallback(item) }
      </li>
    );
  });
}


