import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CATEGORY, getCategoryFetchStatusAction } from "../../context/actions/categoryActions";
import CategoryRepository from "../../repositories/CategoryRepository";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import { useAppContext } from "../contextHook";


export function useCategoryFetch() {

  const { ID } = useParams();

  const { 
    category: { 
      categoryDispatch,
      category: {
        category,
        categoryFetchStatus,
        products,
        stores
      } 
    },
  } = useAppContext();

  const refetch = useCallback(
    ()=> {
      if (categoryFetchStatus !== FETCH_STATUSES.LOADING && categoryFetchStatus !== FETCH_STATUSES.DONE)
        categoryDispatch(getCategoryFetchStatusAction(FETCH_STATUSES.LOADING));
    },
    [categoryFetchStatus, categoryDispatch]
  );
  
  useEffect(
    ()=> {
      
      if (categoryFetchStatus === FETCH_STATUSES.LOADING && !window.navigator.onLine) {
        categoryDispatch(getCategoryFetchStatusAction(FETCH_STATUSES.ERROR));
      } else if (categoryFetchStatus === FETCH_STATUSES.LOADING) {
        const theCategory = products.concat(stores).find(c=> c.id === Number(ID));
        if (theCategory !== undefined) {
          categoryDispatch({
            type: CATEGORY.FETCHED, 
            payload: {
              category: theCategory, 
              fetchStatus: FETCH_STATUSES.DONE 
            }
          });
        } else {
          const api = new CategoryRepository();
          api.get(ID)
          .then(res=> {
            
            if (res.status === 200) {
              categoryDispatch({
                type: CATEGORY.FETCHED, 
                payload: {
                  category: res.body.data, 
                  fetchStatus: FETCH_STATUSES.DONE 
                }
              });
            } else if (res.status === 404) {
              categoryDispatch(getCategoryFetchStatusAction(FETCH_STATUSES.NOT_FOUND));
            } else {
              throw new Error();
            }
          })
          .catch(()=> {
            categoryDispatch(getCategoryFetchStatusAction(FETCH_STATUSES.ERROR));
          });
        }
      }
    }
  );

  useEffect(
    ()=> {
      if (category !== null && category.id === Number(ID)) return;
      categoryDispatch({ type: CATEGORY.UNFETCHED });
    },
    [ID, category, categoryDispatch]
  );

  return [category, categoryFetchStatus, refetch];
}

