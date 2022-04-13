import { useCallback, useMemo } from "react";
import { CATEGORY } from "../../context/actions/categoryActions";
import NetworkError from "../../errors/NetworkError";
import NetworkErrorCodes from "../../errors/NetworkErrorCodes";
import CategoryRepository from "../../repositories/CategoryRepository";
import { useAppContext } from "../contextHook";

export function useCategoryFetch() {

  const { 
    category: { 
      categoryDispatch,
      category: {
        stores,
        products,
        category,
        categoryID,
        categoryLoading,
        categoryError,
      } 
    },
  } = useAppContext();

  const api = useMemo(function() { return new CategoryRepository(); }, []);

  const unfetchCategory = useCallback(
    function() { categoryDispatch({ type: CATEGORY.UNFETCHED }); },
    [categoryDispatch]
  );
  
  const fetchCategory = useCallback(
    async function(ID) {

      if (categoryLoading) return;

      const theCategory = products.concat(stores).find(c=> c.id === Number(ID));

      if (theCategory !== undefined) {

        categoryDispatch({
          type: CATEGORY.FETCHED, 
          payload: {
            category: theCategory, 
            id: String(theCategory.id)
          }
        });
        
        return;
      }

      if (!window.navigator.onLine) {
        categoryDispatch({
          type: CATEGORY.ERROR_CHANGED,
          payload: {
            id: ID,
            error: NetworkErrorCodes.NO_NETWORK_CONNECTION
          }
        });
        return;
      }

      categoryDispatch({ type: CATEGORY.FETCHING });

      try {
        const res = await api.get(ID);
            
        if (res.status === 200) {
          categoryDispatch({
            type: CATEGORY.FETCHED, 
            payload: {
              category: res.body.data, 
              id: String(res.body.data.id)
            }
          });
        } else if (res.status === 404) {
          throw new NetworkError(NetworkErrorCodes.NOT_FOUND);
        } else {
          throw new Error();
        }

      } catch(error) {
        categoryDispatch({
          type: CATEGORY.ERROR_CHANGED,
          payload: {
            id: ID,
            error: error instanceof NetworkError ? error.message : NetworkErrorCodes.UNKNOWN_ERROR
          }
        });
      }
    },
    [api, products, stores, categoryLoading, categoryDispatch]
  );

  return [
    fetchCategory,
    category,
    categoryLoading,
    categoryError,
    categoryID,
    unfetchCategory
  ];
}

