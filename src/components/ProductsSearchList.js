
import React, { useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import { productIcon } from '../assets/icons';
import { FETCH_STATUSES, getProductsListFetchStatusAction } from '../context/AppActions';
import { useAppContext } from '../context/AppContext';
import { useHasMoreToFetchViaScroll, useListRender } from '../context/AppHooks';
import EmptyList from './EmptyList';
import FetchMoreButton from './FetchMoreButton';
import Loading from './Loading';
import ProductItem from './ProductItem';
import Reload from './Reload';

export default function ProductsSearchList({ api, queryParam, storeId=0 }) {

  const { 
    search: {
      products: {
        products,
        productsFetchStatus,
        productsPage,
        productsNumberOfPages
      }
    }, 
    searchDispatch 
  } = useAppContext();

  useEffect(()=> {
    if (productsFetchStatus === FETCH_STATUSES.LOADING) {
      if (storeId === 0)
        api.getListBySearchQuery(queryParam, searchDispatch);
      else 
        api.getListByStoreAndSearchQuery(queryParam, storeId, searchDispatch);
    }
  }, [api, queryParam, storeId, productsFetchStatus, searchDispatch]);

  function refetchProducts() {
    if (productsFetchStatus !== FETCH_STATUSES.LOADING) 
      searchDispatch(getProductsListFetchStatusAction(FETCH_STATUSES.LOADING));
  }

  return (
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
  );
}
