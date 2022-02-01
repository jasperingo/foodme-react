
import React, { useEffect } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Loading from '../../components/Loading';
import Reload from '../../components/Reload';
import EmptyList from '../../components/EmptyList';
import Tab from '../../components/Tab';
import FetchMoreButton from '../../components/FetchMoreButton';
import { filterIcon, productIcon, searchIcon, storeIcon } from '../../assets/icons';
import { useHasMoreToFetchViaScroll, useRenderListFooter, useRenderOnDataFetched, useURLQuery } from '../../hooks/viewHook';
import { useAppContext } from '../../hooks/contextHook';
import { SEARCH } from '../../context/actions/searchActions';
import { useSearchStoreList } from '../../hooks/search/searchStoreListHook';
import ScrollList from '../../components/list/ScrollList';
import StoreItem from '../../components/list_item/StoreItem';
import ProductItem from '../../components/list_item/ProductItem';
import { useSearchProductList } from '../../hooks/search/searchProductListHook';
import Icon from '@mdi/react';
import { useStoreCategoryList } from '../../hooks/category/storeCategoryListHook';
import { useProductCategoryList } from '../../hooks/category/productCategoryListHook';
import { useHeader } from '../../hooks/headerHook';


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

function SubCategoryFilter({ categories }) {

  return (
    <div className="flex gap-2 items-center mb-2">
      <Icon path={filterIcon} className="w-6 h-6" />
      <select className="px-2 py-1 rounded bg-color-gray">
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
    </div>
  )
}

function ProductList() {

  const [
    products, 
    productsFetchStatus, 
    productsPage, 
    productsNumberOfPages, 
    refetch
  ] = useSearchProductList();
  
  return (
    <ScrollList
      data={products}
      nextPage={refetch}
      hasMore={useHasMoreToFetchViaScroll(productsPage, productsNumberOfPages, productsFetchStatus)}
      className="list-x"
      renderDataItem={(item)=> (
        <li key={`product-${item.id}`}> <ProductItem product={item} /> </li>
      )}
      footer={useRenderListFooter(
        productsFetchStatus,
        ()=> <li key="product-footer"> <Loading /> </li>, 
        ()=> <li key="product-footer"> <Reload action={refetch} /> </li>,
        ()=> <li key="product-footer"> <EmptyList text="_empty.No_product" icon={productIcon} /> </li>,
        ()=> <li key="product-footer"> <FetchMoreButton action={refetch} /> </li>,
      )}
      />
  );
}

function Products() {

  const [
    products, 
    productsFetchStatus, 
    refetchProducts
  ] = useProductCategoryList(true);

  return useRenderOnDataFetched(
    productsFetchStatus,
    ()=> (
      <div>
        <SubCategoryFilter categories={products} />
        <ProductList />
      </div>
    ),
    ()=> <Loading />,
    ()=> <Reload action={refetchProducts} />,
  );
}

function StoreList() {

  const [
    stores, 
    storesFetchStatus, 
    storesPage, 
    storesNumberOfPages, 
    refetch
  ] = useSearchStoreList();

  return (
    <ScrollList
      data={stores}
      nextPage={refetch}
      hasMore={useHasMoreToFetchViaScroll(storesPage, storesNumberOfPages, storesFetchStatus)}
      className="list-x"
      renderDataItem={(item)=> (
        <li key={`store-${item.id}`}> <StoreItem store={item} /> </li>
      )}
      footer={useRenderListFooter(
        storesFetchStatus,
        ()=> <li key="store-footer"> <Loading /> </li>, 
        ()=> <li key="store-footer"> <Reload action={refetch} /> </li>,
        ()=> <li key="store-footer"> <EmptyList text="_empty.No_store" icon={storeIcon} /> </li>,
        ()=> <li key="store-footer"> <FetchMoreButton action={refetch} /> </li>
      )}
      />
  )
}

function Stores() {

  const [
    stores, 
    storesFetchStatus, 
    refetchStores
  ] = useStoreCategoryList();

  return useRenderOnDataFetched(
    storesFetchStatus,
    ()=> (
      <div>
        <SubCategoryFilter categories={stores} />
        <StoreList />
      </div>
    ),
    ()=> <Loading />,
    ()=> <Reload action={refetchStores} />,
  );
}

export default function Search() {

  const match = useRouteMatch();
  
  const queryParam = useURLQuery().get('q');

  const { 
    search: {
      searchDispatch,
      search: {
        query,
      } 
    }
  } = useAppContext();

  useHeader({ 
    searchPage: true,
    title: `${query} - Search`,
    headerTitle: '_search.Search',
  });

  useEffect(
    ()=> {
      if (queryParam !== null && queryParam !== query) {
        searchDispatch({
          type: SEARCH.QUERY_CHANGED,
          payload: queryParam
        });
      }
    }, 
    [queryParam, query, searchDispatch]
  );
  
  if (queryParam === null) {
    return <SearchEmpty />
  }

  return (
    <section>

      <div className="container-x">
        <Tab 
          keyPrefix="search-tab" 
          items={ TAB_LINKS.map(i=> ({ ...i, href: `${i.href}?q=${query}` })) } 
          />
      </div>

      <div className="container-x">
        <Switch>
          <Route path={`${match.url}/products`} render={()=> <Products />} />
          <Route 
            path={`${match.url}/stores`} render={()=> <Stores />} />
        </Switch>
      </div>

    </section>
  );
}


