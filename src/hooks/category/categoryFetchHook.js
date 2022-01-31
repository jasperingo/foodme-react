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
        stores,
        products,
        category,
        categoryID,
        categoryFetchStatus,
      } 
    },
  } = useAppContext();

  const refetch = useCallback(
    ()=> {
      if (categoryFetchStatus !== FETCH_STATUSES.LOADING && categoryFetchStatus !== FETCH_STATUSES.DONE)
        categoryDispatch(getCategoryFetchStatusAction(FETCH_STATUSES.LOADING, Number(ID)));
    },
    [ID, categoryFetchStatus, categoryDispatch]
  );
  
  useEffect(
    ()=> {

      if (categoryID !== null && categoryID !== Number(ID)) {

        categoryDispatch({ type: CATEGORY.UNFETCHED });

      } else if (categoryFetchStatus === FETCH_STATUSES.LOADING && !window.navigator.onLine) {

        categoryDispatch(getCategoryFetchStatusAction(FETCH_STATUSES.ERROR, Number(ID)));

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
              categoryDispatch(getCategoryFetchStatusAction(FETCH_STATUSES.NOT_FOUND, Number(ID)));
            } else {
              throw new Error();
            }
          })
          .catch(()=> {
            categoryDispatch(getCategoryFetchStatusAction(FETCH_STATUSES.ERROR, Number(ID)));
          });
        }
      }
    }
  );

  return [category, categoryFetchStatus, refetch];
}

