
import React, { useCallback, useEffect } from 'react';
import AddButton from '../components/AddButton';
import CategoryList from '../components/list/CategoryList';
import NetworkErrorCodes from '../errors/NetworkErrorCodes';
import { useProductCategoryList } from '../hooks/category/productCategoryListHook';
import { useStoreCategoryList } from '../hooks/category/storeCategoryListHook';
import { useHeader } from '../hooks/headerHook';

export default function Categories({ isAdmin }) {

  useHeader({ 
    title: `Categories - DailyNeeds`,
    topNavPaths: ['/cart', '/search'],
    headerTitle: isAdmin ? '_category.Categories' : null
  });

  const [
    fetchStoreCategories, 
    stores,
    storesLoading,
    storesLoaded,
    storesError,
    setStoreCategoriesError
  ] = useStoreCategoryList();

  const [
    fetchProductCategories, 
    products,
    productsLoading,
    productsLoaded,
    productsError,
    setProductCategoriesError
  ] = useProductCategoryList();

  const fetchStores = useCallback(
    function() {
      if (!window.navigator.onLine && storesError === null)
        setStoreCategoriesError(NetworkErrorCodes.NO_NETWORK_CONNECTION);
      else if (window.navigator.onLine && !storesLoading) 
        fetchStoreCategories();
    },
    [storesError, storesLoading, fetchStoreCategories, setStoreCategoriesError]
  );

  const fetchProducts = useCallback(
    function() {
      if (!window.navigator.onLine && productsError === null)
        setProductCategoriesError(NetworkErrorCodes.NO_NETWORK_CONNECTION);
      else if (window.navigator.onLine && !productsLoading) 
        fetchProductCategories();
    },
    [productsError, productsLoading, fetchProductCategories, setProductCategoriesError]
  );

  useEffect(
    function() { 
      if (!storesLoaded) fetchStores(); 
      if (!productsLoaded) fetchProducts();
    },
    [storesLoaded, productsLoaded, fetchStores, fetchProducts]
  );

  return (
    <section>
      
      <div className="container-x">

        { isAdmin && <AddButton text="_category.Add_category" href="/category/add" />}
        
        <CategoryList 
          headerText="_store.Store_categories" 
          categories={stores} 
          categoriesLoading={storesLoading} 
          categoriesLoaded={storesLoaded} 
          categoriesError={storesError} 
          retryFetch={()=> setStoreCategoriesError(null)}
          />

        {
          storesLoaded &&
          <CategoryList 
            headerText="_product.Product_categories" 
            categories={products} 
            categoriesLoading={productsLoading} 
            categoriesLoaded={productsLoaded} 
            categoriesError={productsError} 
            retryFetch={()=> setProductCategoriesError(null)}
            />
        }

      </div>

    </section>
  );
}
