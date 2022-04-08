
import { useCallback, useMemo } from "react";
import { CATEGORY } from "../../context/actions/categoryActions";
import NetworkErrorCodes from "../../errors/NetworkErrorCodes";
import CategoryRepository from "../../repositories/CategoryRepository";
import { useAppContext } from "../contextHook";

export function useProductCategoryList() {

  const { 
    category: { 
      categoryDispatch,
      category: {
        products,
        productsError,
        productsLoaded,
        productsLoading
      } 
    }
  } = useAppContext();

  const api = useMemo(function() { return new CategoryRepository(); }, []);

  function setProductCategoriesError(error) {
    categoryDispatch({ 
      type: CATEGORY.PRODUCTS_LIST_ERROR_CHANGED, 
      payload: { error } 
    });
  }

  const fetchProductCategories = useCallback(
    async function() {

      categoryDispatch({ type: CATEGORY.PRODUCTS_LIST_FETCHING });

      try {
        
        const res = await api.getListByProduct();

        if (res.status === 200) {
          categoryDispatch({
            type: CATEGORY.PRODUCTS_LIST_FETCHED, 
            payload: { list: res.body.data }
          });
        } else {
          throw new Error();
        }
        
      } catch(error) {
        categoryDispatch({
          type: CATEGORY.PRODUCTS_LIST_ERROR_CHANGED,
          payload: { error: NetworkErrorCodes.UNKNOWN_ERROR }
        });
      }
    },
    [api, categoryDispatch]
  );
  
  return [
    fetchProductCategories, 
    products,
    productsLoading,
    productsLoaded,
    productsError,
    setProductCategoriesError
  ];
}
