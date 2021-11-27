
import React, { useEffect } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
//import { useTranslation } from 'react-i18next';
import { useHasMoreToFetchViaScroll, useListRender, useURLQuery } from '../../context/AppHooks';
import { API_URL, useAppContext } from '../../context/AppContext';
import { FETCH_STATUSES, PRODUCT, SEARCH, STORE } from '../../context/AppActions';
import Loading from '../../components/Loading';
import ProductItem from '../../components/ProductItem';
import Reload from '../../components/Reload';
import EmptyList from '../../components/EmptyList';
import Tab from '../../components/Tab';
import InfiniteScroll from 'react-infinite-scroll-component';
import StoreItem from '../../components/StoreItem';
import FetchMoreButton from '../../components/FetchMoreButton';
import { productIcon, storeIcon } from '../../assets/icons';


const TAB_LINKS = [
  { title : '_store.Stores', href: '/stores' },
  { title : '_product.Products', href: '/products' }
];

const getStoresFetchStatusAction = (payload) => ({
  type: STORE.FETCH_STATUS_CHANGED,
  payload
});

const getProductFetchStatusAction = (payload) => ({
  type: PRODUCT.FETCH_STATUS_CHANGED,
  payload
});

export default function Search() {

  //const { t } = useTranslation();

  const match = useRouteMatch();
  
  const queryParam = useURLQuery().get('q');

  const { search: {
    query,
    stores: {
      stores,
      storesFetchStatus,
      storesPage,
      storesNumberOfPages
    },
    products: {
      products,
      productsFetchStatus,
      productsPage,
      productsNumberOfPages
    }
  }, searchDispatch } = useAppContext();

  useEffect(()=> {
    if (queryParam !== query)
      searchDispatch({
        type: SEARCH.QUERY_CHANGED,
        payload: queryParam
      });
  }, [queryParam, query, searchDispatch]);

  useEffect(()=> {
    async function fetchStores() {
      
      if (storesFetchStatus !== FETCH_STATUSES.LOADING) 
        return;
      
      try {
        let response = await fetch(`${API_URL}stores.json?q=${queryParam}`);
        
        if (!response.ok)
          throw new Error(response.status);
        
        let data = await response.json();

        //data.data = [];
        //data.total_pages = 0;
        
        searchDispatch({
          type: STORE.FETCHED,
          payload: {
            stores: data.data,
            storesNumberOfPages: data.total_pages
          }
        });
        
      } catch (err) {
        searchDispatch(getStoresFetchStatusAction(FETCH_STATUSES.ERROR));
      }
    }

    fetchStores(); 

  }, [queryParam, storesFetchStatus, searchDispatch]);

  function refetchStores() {
    
    if (storesFetchStatus === FETCH_STATUSES.LOADING) 
      return;

    searchDispatch(getStoresFetchStatusAction(FETCH_STATUSES.LOADING));
  }

  useEffect(()=> {
    async function fetchProducts() {
      if (productsFetchStatus !== FETCH_STATUSES.LOADING) 
        return;
      
      try {
        let response = await fetch(`${API_URL}store-products.json?q=${queryParam}`);

        if (!response.ok)
          throw new Error(response.status);
        
        let data = await response.json();
        
        searchDispatch({
          type: PRODUCT.FETCHED,
          payload: {
            products: data.data,
            productsNumberOfPages: data.total_pages
          }
        });

      } catch (err) {
        searchDispatch(getProductFetchStatusAction(FETCH_STATUSES.ERROR));
      }
    }

    fetchProducts();

  }, [queryParam, productsFetchStatus, searchDispatch]);

  function refetchProducts() {
    if (productsFetchStatus === FETCH_STATUSES.LOADING) 
      return;
    
    searchDispatch(getProductFetchStatusAction(FETCH_STATUSES.LOADING));
  }

  return (
    <section>

      <div className="container-x">
        <Tab items={ TAB_LINKS.map(item=> ({...item, href:`${item.href}?q=${queryParam}` })) } keyPrefix="search-tab" />
      </div>

      <div className="container-x">
        {
          <Switch>
            <Route path={`${match.url}/stores`}>
              <InfiniteScroll
                dataLength={stores.length}
                next={refetchStores}
                hasMore={useHasMoreToFetchViaScroll(storesPage, storesNumberOfPages, storesFetchStatus)}
                >
                <ul className="list-x">
                  { 
                    useListRender(
                      stores, 
                      storesFetchStatus,
                      (item, i)=> <li key={`store-${i}`}> <StoreItem store={item} /> </li>, 
                      (k)=> <li key={k}> <Loading /> </li>, 
                      (k)=> <li key={k}> <Reload action={refetchStores} /> </li>,
                      (k)=> <li key={k}> <EmptyList text="_empty.No_store" icon={storeIcon} /> </li>, 
                      (k)=> <li key={k}> <FetchMoreButton action={refetchStores} /> </li>,
                    )
                  }
                </ul>
              </InfiniteScroll>
            </Route>
            <Route path={`${match.url}/products`}>
              <InfiniteScroll 
                dataLength={products.length}
                next={refetchProducts}
                hasMore={useHasMoreToFetchViaScroll(productsPage, productsNumberOfPages, productsFetchStatus)}
                >
                <ul className="list-x">
                  { 
                    useListRender(
                      products, 
                      productsFetchStatus,
                      (item, i)=> <li key={`prod-${i}`}> <ProductItem prod={item} /> </li>, 
                      (k)=> <li key={k}> <Loading /> </li>, 
                      (k)=> <li key={k}> <Reload action={refetchProducts} /> </li>,
                      (k)=> <li key={k}> <EmptyList text="_empty.No_product" icon={productIcon} /> </li>, 
                      (k)=> <li key={k}> <FetchMoreButton action={refetchProducts} /> </li>,
                    )
                  }
                </ul>
              </InfiniteScroll>
            </Route>
          </Switch>
        }
      </div>

    </section>
  );
}


