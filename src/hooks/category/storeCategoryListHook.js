
import { useCallback, useMemo } from "react";
import { CATEGORY } from "../../context/actions/categoryActions";
import NetworkError from "../../errors/NetworkError";
import NetworkErrorCodes from "../../errors/NetworkErrorCodes";
import CategoryRepository from "../../repositories/CategoryRepository";
import { useAppContext } from "../contextHook";

export function useStoreCategoryList() {

  const { 
    category: { 
      categoryDispatch,
      category: {
        stores,
        storesError,
        storesLoaded,
        storesLoading
      } 
    }
  } = useAppContext();

  const api = useMemo(function() { return new CategoryRepository(); }, []);

  function setStoreCategoriesError(error) {
    categoryDispatch({ 
      type: CATEGORY.STORES_LIST_ERROR_CHANGED, 
      payload: { error } 
    });
  }

  const fetchStoreCategories = useCallback(
    async function() {

      categoryDispatch({ type: CATEGORY.STORES_LIST_FETCHING });

      try {
        
        const res = await api.getListByStore();

        if (res.status === 200) {
          categoryDispatch({
            type: CATEGORY.STORES_LIST_FETCHED, 
            payload: { list: res.body.data }
          });
        } else {
          throw new Error();
        }
        
      } catch(error) {
        categoryDispatch({
          type: CATEGORY.STORES_LIST_ERROR_CHANGED,
          payload: { error: error instanceof NetworkError ? error.message : NetworkErrorCodes.UNKNOWN_ERROR }
        });
      }
    },
    [api, categoryDispatch]
  );
  
  return [
    fetchStoreCategories, 
    stores,
    storesLoading,
    storesLoaded,
    storesError,
    setStoreCategoriesError
  ];
}


