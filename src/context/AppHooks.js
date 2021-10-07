
import { useLocation } from "react-router-dom";

export function useURLQuery() {
  return new URLSearchParams(useLocation().search);
}

export function useHeaderVisible() {
  return ['/', '/categories', '/cart', '/account'].indexOf(useLocation().pathname) > -1;
}

