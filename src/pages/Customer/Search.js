
import React, { useEffect } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
//import { useTranslation } from 'react-i18next';
import { useHasMoreToFetchViaScroll, useListRender, useURLQuery } from '../../context/AppHooks';
import { useAppContext } from '../../context/AppContext';
import { FETCH_STATUSES, getStoresListFetchStatusAction, SEARCH } from '../../context/AppActions';
import Loading from '../../components/Loading';
import Reload from '../../components/Reload';
import EmptyList from '../../components/EmptyList';
import Tab from '../../components/Tab';
import InfiniteScroll from 'react-infinite-scroll-component';
import StoreItem from '../../components/StoreItem';
import FetchMoreButton from '../../components/FetchMoreButton';
import { storeIcon } from '../../assets/icons';
import StoreApi from '../../api/StoreApi';
import ProductApi from '../../api/ProductApi';
import SearchEmpty from '../../components/SearchEmpty';
import ProductsSearchList from '../../components/ProductsSearchList';


const TAB_LINKS = [
  { title : '_store.Stores', href: '/stores' },
  { title : '_product.Products', href: '/products' }
];

function Stores({ queryParam }) {

  const { 
    search: {
      stores: {
        stores,
        storesFetchStatus,
        storesPage,
        storesNumberOfPages
      }
    }, 
    searchDispatch 
  } = useAppContext();
  
  useEffect(()=> {
    if (storesFetchStatus === FETCH_STATUSES.LOADING) {
      const api = new StoreApi();
      api.getListBySearchQuery(queryParam, searchDispatch);
    }
  }, [queryParam, storesFetchStatus, searchDispatch]);

  function refetchStores() {
    if (storesFetchStatus !== FETCH_STATUSES.LOADING) 
      searchDispatch(getStoresListFetchStatusAction(FETCH_STATUSES.LOADING));
  }

  return (
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
  );
}


export default function Search() {

  //const { t } = useTranslation();

  const match = useRouteMatch();
  
  const queryParam = useURLQuery().get('q');

  const { search: { query }, searchDispatch } = useAppContext();

  useEffect(()=> {
    if (queryParam !== null && queryParam !== query)
      searchDispatch({
        type: SEARCH.QUERY_CHANGED,
        payload: queryParam
      });
  }, [queryParam, query, searchDispatch]);

  if (queryParam === null) {
    return <SearchEmpty />
  }

  return (
    <section>

      <div className="container-x">
        <Tab items={ TAB_LINKS.map(item=> ({...item, href:`${item.href}?q=${queryParam}` })) } keyPrefix="search-tab" />
      </div>

      <div className="container-x">
        <Switch>
          <Route path={`${match.url}/products`} render={()=> <ProductsSearchList api={new ProductApi()} queryParam={queryParam} />} />
          <Route path={`${match.url}/stores`} render={()=> <Stores queryParam={queryParam} />} />
        </Switch>
      </div>

    </section>
  );
}


