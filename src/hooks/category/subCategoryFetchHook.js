
import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CATEGORY, getCategoryFetchStatusAction } from "../../context/actions/categoryActions";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import SubCategoryRepository from "../../repositories/SubCategoryRepository";
import { useAppContext } from "../contextHook";


export function useSubCategoryFetch() {

  const { ID } = useParams();

  const { 
    subCategory: { 
      subCategoryDispatch,
      subCategory: {
        subCategory,
        subCategoryID,
        subCategoryFetchStatus,
      } 
    },
  } = useAppContext();

  const refetch = useCallback(
    ()=> {
      if (subCategoryFetchStatus !== FETCH_STATUSES.LOADING && subCategoryFetchStatus !== FETCH_STATUSES.DONE)
        subCategoryDispatch(getCategoryFetchStatusAction(FETCH_STATUSES.LOADING, Number(ID)));
    },
    [ID, subCategoryFetchStatus, subCategoryDispatch]
  );
  
  useEffect(
    ()=> {

      if (subCategoryID !== null && subCategoryID !== Number(ID)) {

        subCategoryDispatch({ type: CATEGORY.UNFETCHED });

      } else if (subCategoryFetchStatus === FETCH_STATUSES.LOADING && !window.navigator.onLine) {

        subCategoryDispatch(getCategoryFetchStatusAction(FETCH_STATUSES.ERROR, Number(ID)));

      } else if (subCategoryFetchStatus === FETCH_STATUSES.LOADING) {

        const api = new SubCategoryRepository();
        api.get(ID)
        .then(res=> {
          
          if (res.status === 200) {
            subCategoryDispatch({
              type: CATEGORY.FETCHED, 
              payload: {
                subCategory: res.body.data, 
                fetchStatus: FETCH_STATUSES.DONE 
              }
            });
          } else if (res.status === 404) {
            subCategoryDispatch(getCategoryFetchStatusAction(FETCH_STATUSES.NOT_FOUND, Number(ID)));
          } else {
            throw new Error();
          }
        })
        .catch(()=> {
          subCategoryDispatch(getCategoryFetchStatusAction(FETCH_STATUSES.ERROR, Number(ID)));
        });
        
      }
    }
  );

  return [subCategory, subCategoryFetchStatus, refetch];
}

