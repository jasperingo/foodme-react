
import React, { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import ProductApi from '../../api/ProductApi';
import { productIcon } from '../../assets/icons';
import EmptyList from '../../components/EmptyList';
import FetchMoreButton from '../../components/FetchMoreButton';
import Loading from '../../components/Loading';
import ProductItem from '../../components/ProductItem';
import Reload from '../../components/Reload';
import { FETCH_STATUSES, getProductsListFetchStatusAction } from '../../context/AppActions';
import { useAppContext } from '../../context/AppContext';
import { useHasMoreToFetchViaScroll, useListRender } from '../../context/AppHooks';


export default function Favorites() {

  const { 
    user: { user },
    products: {
      products: {
        products,
        productsFetchStatus,
        productsPage,
        productsNumberOfPages
      }
    }, 
    productsDispatch 
  } = useAppContext();

  useEffect(()=> {
    if (productsFetchStatus === FETCH_STATUSES.LOADING) {
      const api = new ProductApi(user.api_token);
      api.getListByCustomer(0, productsPage, productsDispatch);
    }
  });

  function refetchProducts() {
    if (productsFetchStatus !== FETCH_STATUSES.LOADING) 
      productsDispatch(getProductsListFetchStatusAction(FETCH_STATUSES.LOADING));
  }

  return (
    <section className="flex-grow">
      <div className="container-x">
        
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

      </div>
    </section>
  );
}
