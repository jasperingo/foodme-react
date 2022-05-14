
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Reload from '../../components/Reload';
import Loading from '../../components/Loading';
import CarouselX from '../../components/CarouselX';
import { useHeader } from '../../hooks/headerHook';
import { useStoreCategoryList } from '../../hooks/category/storeCategoryListHook';
import { useHomeRecommendedStoreList } from '../../hooks/home/homeRecommendedStoreListHook';
import { useAppContext } from '../../hooks/contextHook';
import { useHomeRecommendedProductList } from '../../hooks/home/homeRecommendedProductListHook';
import { useHomePromotionList } from '../../hooks/home/homePromotionListHook';
import StoreList from '../../components/list/StoreList';
import ProductList from '../../components/list/ProductList';
import CategoryList from '../../components/list/CategoryList';

function Categories() {

  const [
    fetchCategories, 
    categories,
    categoriesLoading,
    categoriesLoaded,
    categoriesError
  ] = useStoreCategoryList();

  useEffect(
    function() { 
      if (!categoriesLoaded && categoriesError === null) 
        fetchCategories();
    },
    [categoriesLoaded, categoriesError, fetchCategories]
  );

  return (
    <div className="bg-color-gray lg:my-2">
      <CategoryList 
        grid={true}
        headerText="_category.Categories" 
        categories={categories} 
        categoriesLoading={categoriesLoading} 
        categoriesLoaded={categoriesLoaded} 
        categoriesError={categoriesError} 
        fetchCategories={fetchCategories}
        />
    </div>
  );
}

function Stores() {

  const { t } = useTranslation();

  const [
    fetchRecommendedStores, 
    stores, 
    storesLoading, 
    storesError, 
    storesLoaded
  ] = useHomeRecommendedStoreList();

  useEffect(
    function() { 
      if (!storesLoaded && storesError === null) 
        fetchRecommendedStores() 
    },
    [storesLoaded, storesError, fetchRecommendedStores]
  );
  
  return (
    <div className="py-2">
      <h3 className="container-x font-bold my-2">{ t('_store.Recommended_stores') }</h3>
      <StoreList
        single={true}
        stores={stores}
        storesError={storesError}
        storesLoaded={storesLoaded}
        storesLoading={storesLoading}
        fetchStores={fetchRecommendedStores}
        />
    </div>
  );
}

function Products() {
  
  const { t } = useTranslation();

  const [
    fetchRecommendedProducts, 
    products, 
    productsLoading, 
    productsError, 
    productsLoaded, 
  ] = useHomeRecommendedProductList();

  useEffect(
    function() { 
      if (!productsLoaded && productsError === null) 
        fetchRecommendedProducts() 
    },
    [productsLoaded, productsError, fetchRecommendedProducts]
  );
  
  return (
    <div className="container-x py-2">
      <h3 className="font-bold my-2">{ t('_product.Recommended_products') }</h3>
      <ProductList
        products={products}
        productsLoading={productsLoading}
        productsError={productsError}
        productsLoaded={productsLoaded}
        fetchProducts={fetchRecommendedProducts}
        />
    </div>
  );
}

function Promotions() {

  const [
    fetchPromotions, 
    promotions, 
    promotionsLoading, 
    promotionsError, 
    promotionsLoaded,
  ] = useHomePromotionList();

  useEffect(
    function() { 
      if (!promotionsLoaded && promotionsError === null) 
        fetchPromotions() 
    },
    [promotionsLoaded, promotionsError, fetchPromotions]
  );
  
  return (
    <div className="container-x">
      {
        promotionsLoaded && 
        <CarouselX items={promotions} />
      }

      {
        promotionsLoading && <Loading />
      }

      {
        promotionsError !== null &&
        <Reload action={fetchPromotions} />
      }
    </div>
  );
}

export default function Home() {

  useHeader({ topNavPaths: ['/cart', '/search'] });

  const { 
    home: {
      home: {
        storesLoaded,
        promotionsLoaded,
      } 
    },
    category: { 
      category: {
        storesLoaded: categoriesLoaded
      } 
    }
  } = useAppContext();

  return (
    <section>

      <Promotions />

      {
        promotionsLoaded && 
        <Categories />
      }

      {
        categoriesLoaded &&
        <Stores />
      }

      {
        storesLoaded &&
        <Products />
      }

    </section>
  );
}
