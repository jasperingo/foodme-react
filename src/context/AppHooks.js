
import { useLocation } from "react-router-dom";

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


