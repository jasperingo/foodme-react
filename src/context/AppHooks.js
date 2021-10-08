
import { useLocation } from "react-router-dom";
import { FETCH_LIST } from '../api/Get';
import EmptyList from "../components/EmptyList";
import Loading from "../components/Loading";
import Reload from "../components/Reload";

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

export function useListRender(items, EmptyIcon, refetchAction, viewCallback) {
  return items.map((item, i)=> {
           
    if (item === FETCH_LIST.LOADING) {
      return (
        <li key={FETCH_LIST.LOADING}>
          <Loading />
        </li>
      );
    }

    if (item === FETCH_LIST.ERROR) {
      return (
        <li key={FETCH_LIST.ERROR}>
          <Reload action={refetchAction} />
        </li>
      );
    }

    if (item === FETCH_LIST.EMPTY) {
      return (
        <li key={FETCH_LIST.EMPTY}>
          <EmptyList text="_empty.No_store" Icon={EmptyIcon} />
        </li>
      );
    }

    return (
      <li key={ `store_${i}`}>
        { viewCallback(item) }
      </li>
    );
  });
}


