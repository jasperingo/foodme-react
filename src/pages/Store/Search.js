
import React, { useEffect } from 'react';
import { useHasMoreToFetchViaScroll, useListRender, useURLQuery } from '../../context/AppHooks';
import { API_URL, useAppContext } from '../../context/AppContext';
import { FETCH_STATUSES, PRODUCT, SEARCH } from '../../context/AppActions';
import Loading from '../../components/Loading';
import ProductIcon from '../../icons/ProductIcon';
import ProductItem from '../../components/ProductItem';
import Reload from '../../components/Reload';
import EmptyList from '../../components/EmptyList';
import InfiniteScroll from 'react-infinite-scroll-component';
import FetchMoreButton from '../../components/FetchMoreButton';

const getProductFetchStatusAction = (payload) => ({
  type: PRODUCT.FETCH_STATUS_CHANGED,
  payload
});

export default function Search() {
  
  const queryParam = useURLQuery().get('q');

  const { search: {
    query,
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
        {
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
                  (k)=> <li key={k}> <EmptyList text="_empty.No_product" Icon={ProductIcon} /> </li>, 
                  (k)=> <li key={k}> <FetchMoreButton action={refetchProducts} /> </li>,
                )
              }
            </ul>
          </InfiniteScroll>
        }
      </div>

    </section>
  );
}


