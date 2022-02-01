import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { HEADER } from "../context/actions/headerActions";
import { useAppContext } from "./contextHook";


export function useHeader(data) {

  const {
    header: {
      headerDispatch,
      header: {
        path,
        title,
      }
    }
  } = useAppContext();

  const titleTag = useMemo(() => document.getElementsByTagName('title')[0], []);

  const { pathname } = useLocation();

  useEffect(
    ()=> {
      if (path !== pathname || (data.title !== undefined && data.title !== title)) {

        titleTag.innerHTML = data.title ?? 'DailyNeeds - All you need to buy';

        headerDispatch({
          type: HEADER.CHANGED,
          payload: {
            ...data,
            path: pathname
          }
        });

      }
    },
    [data, pathname, titleTag, title, path, headerDispatch]
  );
}
