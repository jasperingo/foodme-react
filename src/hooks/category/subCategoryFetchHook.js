
import { useCallback, useMemo } from "react";
import { CATEGORY } from "../../context/actions/categoryActions";
import NetworkError from "../../errors/NetworkError";
import NetworkErrorCodes from "../../errors/NetworkErrorCodes";
import SubCategoryRepository from "../../repositories/SubCategoryRepository";
import { useAppContext } from "../contextHook";

export function useSubCategoryFetch() {

  const { 
    category: { 
      categoryDispatch,
      category: {
        subCategory,
        subCategoryID,
        subCategoryError,
        subCategoryLoading,
      } 
    },
  } = useAppContext();

  const api = useMemo(function() { return new SubCategoryRepository(); }, []);

  const unfetchSubCategory = useCallback(
    function() { categoryDispatch({ type: CATEGORY.SUB_UNFETCHED }); },
    [categoryDispatch]
  );

  const fetchSubCategory = useCallback(
    async function(ID) {

      if (subCategoryLoading) return;

      if (!window.navigator.onLine) {
        categoryDispatch({
          type: CATEGORY.SUB_ERROR_CHANGED,
          payload: {
            id: ID,
            error: NetworkErrorCodes.NO_NETWORK_CONNECTION
          }
        });
        return;
      }

      categoryDispatch({ type: CATEGORY.SUB_FETCHING });

      try {
        const res = await api.get(ID);
            
        if (res.status === 200) {
          categoryDispatch({
            type: CATEGORY.SUB_FETCHED, 
            payload: {
              id: ID,
              subCategory: res.body.data, 
            }
          });
        } else if (res.status === 404) {
          throw new NetworkError(NetworkErrorCodes.NOT_FOUND);
        } else {
          throw new Error();
        }

      } catch(error) {
        categoryDispatch({
          type: CATEGORY.SUB_ERROR_CHANGED,
          payload: {
            id: ID,
            error: error instanceof NetworkError ? error.message : NetworkErrorCodes.UNKNOWN_ERROR
          }
        });
      }
    },
    [api, subCategoryLoading, categoryDispatch]
  );

  return [
    fetchSubCategory,
    subCategory,
    subCategoryLoading,
    subCategoryError,
    subCategoryID,
    unfetchSubCategory
  ];
}
