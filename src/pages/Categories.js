
import React, { useEffect } from 'react';
import AddButton from '../components/AddButton';
import CategoryList from '../components/list/CategoryList';
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
    storesError
  ] = useStoreCategoryList();

  const [
    fetchProductCategories, 
    products,
    productsLoading,
    productsLoaded,
    productsError
  ] = useProductCategoryList();

  useEffect(
    function() { 
      if (!storesLoaded && storesError === null) fetchStoreCategories(); 
      if (!productsLoaded && productsError === null) fetchProductCategories();
    },
    [storesLoaded, storesError, productsLoaded, productsError, fetchStoreCategories, fetchProductCategories]
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
          retryFetch={fetchStoreCategories}
          />

        {
          storesLoaded &&
          <CategoryList 
            headerText="_product.Product_categories" 
            categories={products} 
            categoriesLoading={productsLoading} 
            categoriesLoaded={productsLoaded} 
            categoriesError={productsError} 
            retryFetch={fetchProductCategories}
            />
        }

      </div>

    </section>
  );
}
