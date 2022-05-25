
import React, { useEffect } from 'react';
import Icon from '@mdi/react';
import { Route, Switch, useRouteMatch, useHistory } from 'react-router-dom';
import Loading from '../components/Loading';
import Reload from '../components/Reload';
import EmptyList from '../components/EmptyList';
import Tab from '../components/Tab';
import { filterIcon, searchIcon } from '../assets/icons';
import { useURLQuery } from '../hooks/viewHook';
import { useSearchStoreList } from '../hooks/search/searchStoreListHook';
import { useSearchProductList } from '../hooks/search/searchProductListHook';
import { useStoreCategoryList } from '../hooks/category/storeCategoryListHook';
import { useProductCategoryList } from '../hooks/category/productCategoryListHook';
import { useHeader } from '../hooks/headerHook';
import { useTranslation } from 'react-i18next';
import StoreList from '../components/list/StoreList';
import NetworkErrorCodes from '../errors/NetworkErrorCodes';
import ProductList from '../components/list/ProductList';

const TAB_LINKS = [
  { title : '_store.Stores', href: '/stores' },
  { title : '_product.Products', href: '/products' }
];

function SearchEmpty() {
  return (
    <div className="container-x">
      <EmptyList text="_search.Search__app" icon={searchIcon} />
    </div>
  );
}

function SubCategoryFilter({ categories, subCategory, onFilterChange }) {

  const { t } = useTranslation();

  return (
    <form className="flex gap-2 items-center mb-2">
      <Icon path={filterIcon} className="w-6 h-6" />
      <label htmlFor="search-filter" className="sr-only">{ t('_search.Filter_search_by_sub_category') }</label>
      <select 
        id="search-filter" 
        className="px-2 py-1 rounded bg-color-gray" 
        defaultValue={subCategory}
        onChange={(e)=> onFilterChange(e.target.value)}
        >
        <option value="">{ t('_category.Sub_category') }</option>
        {
          categories.map(cat=> 
            <optgroup key={`category-${cat.id}`} label={cat.name}>
              {
                cat.sub_categories.map(sub=> 
                  <option key={`sub-category-${sub.id}`} value={sub.id}>{ sub.name }</option>
                )
              }
            </optgroup>
          )
        }
      </select>
    </form>
  );
}

function Products() {

  const history = useHistory()

  const param = new URLSearchParams(window.location.search);

  const [q, subCategory] = useURLQuery(['q', 'products_sub_category']);

  const [
    fetchProductCategories, 
    productsCategories,
    productsCategoriesLoading,
    productsCategoriesLoaded,
    productsCategoriesError,
  ] = useProductCategoryList();

  const [
    fetchProducts,
    products, 
    productsLoading,
    productsLoaded,
    productsError,
    productsPage, 
    productsNumberOfPages,
    refreshProducts
  ] = useSearchProductList();

  useEffect(
    function() {
      if (!productsCategoriesLoaded && productsCategoriesError === null) 
        fetchProductCategories();
    },
    [productsCategoriesLoaded, productsCategoriesError, fetchProductCategories]
  );

  useEffect(
    function() {
      if (productsCategoriesLoaded && !productsLoaded && productsError === null) 
        fetchProducts(q, subCategory); 
    },
    [q, productsCategoriesLoaded, productsError, productsLoaded, subCategory, fetchProducts]
  );

  function filterChanged(value) {
    if (value)
      param.set('products_sub_category', value);
    else 
      param.delete('products_sub_category');
   
    history.replace(`/search/products?${param.toString()}`);

    refreshProducts();
  }

  if (productsCategoriesLoading) return <Loading />;
  
  if (productsCategoriesError === NetworkErrorCodes.UNKNOWN_ERROR) return <Reload action={fetchProductCategories} />;

  if (productsCategoriesError === NetworkErrorCodes.NO_NETWORK_CONNECTION) return <Reload message="_errors.No_netowrk_connection" action={fetchProductCategories} />;
  
  return (
    <>
      <SubCategoryFilter 
        subCategory={subCategory} 
        categories={productsCategories} 
        onFilterChange={filterChanged} 
        />
      
      <ProductList 
        products={products}
        productsPage={productsPage}
        productsError={productsError}
        productsLoaded={productsLoaded}
        productsLoading={productsLoading}
        productsNumberOfPages={productsNumberOfPages}
        fetchProducts={()=> fetchProducts(q, subCategory)}
        />
    </>
  );
}


function Stores() {
  
  const history = useHistory()

  const param = new URLSearchParams(window.location.search);

  const [q, subCategory] = useURLQuery(['q', 'stores_sub_category']);

  const [
    fetchStoreCategories, 
    storesCategories,
    storesCategoriesLoading,
    storesCategoriesLoaded,
    storesCategoriesError
  ] = useStoreCategoryList();

  const [
    fetchStores,
    stores, 
    storesLoading,
    storesLoaded,
    storesError,
    storesPage, 
    storesNumberOfPages,
    refreshStore
  ] = useSearchStoreList();

  useEffect(
    function() {
      if (!storesCategoriesLoaded && storesCategoriesError === null) 
        fetchStoreCategories();
    },
    [storesCategoriesLoaded, storesCategoriesError, fetchStoreCategories]
  );

  useEffect(
    function() {
      if (storesCategoriesLoaded && !storesLoaded && storesError === null) 
        fetchStores(q, subCategory); 
    },
    [q, storesCategoriesLoaded, storesError, storesLoaded, subCategory, fetchStores]
  );

  function filterChanged(value) {
    if (value)
      param.set('stores_sub_category', value);
    else 
      param.delete('stores_sub_category');

    history.replace(`/search/stores?${param.toString()}`);

    refreshStore();
  }

  if (storesCategoriesLoading) return <Loading />;

  if (storesCategoriesError === NetworkErrorCodes.UNKNOWN_ERROR) return <Reload action={fetchStoreCategories} />;

  if (storesCategoriesError === NetworkErrorCodes.NO_NETWORK_CONNECTION) return <Reload message="_errors.No_netowrk_connection" action={fetchStoreCategories} />;
  
  return (
    <>
      <SubCategoryFilter 
        subCategory={subCategory}
        categories={storesCategories} 
        onFilterChange={filterChanged} 
        />

      <StoreList 
        stores={stores}
        storesError={storesError}
        storesPage={storesPage}
        storesLoaded={storesLoaded}
        storesLoading={storesLoading}
        storesNumberOfPages={storesNumberOfPages}
        fetchStores={()=> fetchStores(q, subCategory)}
        />
    </>
  );
}

export default function Search() {

  const match = useRouteMatch();
  
  const [q, storeSubCategory, productSubCategory] = useURLQuery(['q', 'stores_sub_category', 'products_sub_category']);

  useHeader({ 
    searchPage: true,
    title: `${q ?? 'No search parameter'} - Search`,
    headerTitle: '_search.Search',
  });
  
  if (!q && !storeSubCategory && !productSubCategory) return <SearchEmpty />;
  
  return (
    <section>

      <div className="container-x">
        <Tab 
          keyPrefix="search-tab" 
          items={ TAB_LINKS.map(i=> ({ ...i, href: `${i.href}${q ? `?q=${q}`: ''}` })) } 
          />
      </div>

      <div className="container-x">
        <Switch>
          <Route path={`${match.url}/products`} render={()=> <Products />} />
          <Route path={`${match.url}/stores`} render={()=> <Stores />} />
        </Switch>
      </div>

    </section>
  );
}


