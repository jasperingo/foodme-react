
import React, { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { productIcon } from '../../assets/icons';
import EmptyList from '../../components/EmptyList';
import FetchMoreButton from '../../components/FetchMoreButton';
import Loading from '../../components/Loading';
import ProductItem from '../../components/ProductItem';
import Reload from '../../components/Reload';
import { FETCH_STATUSES, PRODUCT } from '../../context/AppActions';
import { API_URL, useAppContext } from '../../context/AppContext';
import { useHasMoreToFetchViaScroll, useListRender } from '../../context/AppHooks';

const getProductsFetchStatusAction = (payload) => ({
  type: PRODUCT.LIST_FETCH_STATUS_CHANGED,
  payload
});

export default function Favourites() {

  const { products: {
    products: {
      products,
      productsFetchStatus,
      productsPage,
      productsNumberOfPages
    }
  }, productsDispatch } = useAppContext();

  useEffect(()=> {

    async function fetchProducts() {
      if (productsFetchStatus !== FETCH_STATUSES.LOADING) 
        return;
      
      try {
        let response = await fetch(`${API_URL}store-products.json`);

        if (!response.ok)
          throw new Error(response.status);
        
        let data = await response.json();
        
        productsDispatch({
          type: PRODUCT.LIST_FETCHED,
          payload: {
            products: data.data,
            productsNumberOfPages: data.total_pages
          }
        });

      } catch (err) {
        productsDispatch(getProductsFetchStatusAction(FETCH_STATUSES.ERROR));
      }
    }

    fetchProducts();

  }, [productsFetchStatus, productsDispatch]);

  function refetchProducts() {
    if (productsFetchStatus === FETCH_STATUSES.LOADING) 
      return;
    
    productsDispatch(getProductsFetchStatusAction(FETCH_STATUSES.LOADING));
  }

  return (
    <section className="flex-grow">
      <div className="container-x">
        
        <InfiniteScroll 
          dataLength={products.length}
          next={refetchProducts}
          hasMore={useHasMoreToFetchViaScroll(productsPage, productsNumberOfPages, productsFetchStatus)}
          >
          <ul className="list-2-x">
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

      </div>
    </section>
  );
}
