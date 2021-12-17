
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useAppContext } from '../../context/AppContext';
import { 
  FETCH_STATUSES, 
  getProductFetchStatusAction, 
  getRelatedProductsListFetchStatusAction, 
  PRODUCT 
} from '../../context/AppActions';
import { useHasMoreToFetchViaScroll, useListRender } from '../../context/AppHooks';
import StoreItem from '../../components/StoreItem';
import Reload from '../../components/Reload';
import Loading from '../../components/Loading';
import EmptyList from '../../components/EmptyList';
import FetchMoreButton from '../../components/FetchMoreButton';
import ProductItem from '../../components/ProductItem';
import ProductProfile from '../../components/ProductProfile';
import CustomerApp from '../../apps/CustomerApp';
import H4Heading from '../../components/H4Heading';
import ProductReviewsList from '../../components/ProductReviewsList';
import { productIcon } from '../../assets/icons';
import ProductApi from '../../api/ProductApi';

function RelatedProductsList() {

  const pID = parseInt(useParams().pID);

  const { products: {
    related: {
      related,
      relatedFetchStatus,
      relatedPage, 
      relatedNumberOfPages
    }
  }, productsDispatch } = useAppContext();

  useEffect(()=> {
    if (relatedFetchStatus === FETCH_STATUSES.LOADING) {
      const api = new ProductApi();
      api.getListByRelated(pID, relatedPage, productsDispatch);
    }
  }, [pID, relatedFetchStatus, relatedPage, productsDispatch]);

  function refetchRelated() {
    if (relatedFetchStatus !== FETCH_STATUSES.LOADING) 
      productsDispatch(getRelatedProductsListFetchStatusAction(FETCH_STATUSES.LOADING));
  }

  return (
    <div className="container-x py-4">
      <H4Heading text="_product.Related_products" />
      <div>
        <InfiniteScroll
          dataLength={related.length}
          next={refetchRelated}
          hasMore={useHasMoreToFetchViaScroll(relatedPage, relatedNumberOfPages, relatedFetchStatus)}
          >
          <ul className="py-2 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            { 
              useListRender(
                related, 
                relatedFetchStatus,
                (item, i)=> <li key={`related-prod-${i}`} > <ProductItem prod={item} layout={ProductItem.LAYOUT_GRID} /> </li>, 
                (k)=> <li key={k}> <Loading /> </li>, 
                (k)=> <li key={k}> <Reload action={refetchRelated} /> </li>,
                (k)=> <li key={k}> <EmptyList text="_empty.No_product" icon={productIcon} /> </li>, 
                (k)=> <li key={k}> <FetchMoreButton action={refetchRelated} /> </li>,
              )
            }
          </ul>
        </InfiniteScroll>
      </div> 
    </div>
  );
}


export default function Product() {

  const pID = parseInt(useParams().pID);

  const { products: {
    product: {
      product,
      productFetchStatus
    }
  }, productsDispatch } = useAppContext();
  
  useEffect(()=> {
    if (product !== null && pID !== product.id) {
      productsDispatch({ type: PRODUCT.UNFETCH });
    } else if (productFetchStatus === FETCH_STATUSES.LOADING) {
      const api = new ProductApi();
      api.get(pID, productsDispatch);
    }
  }, [pID, product, productFetchStatus, productsDispatch]);

  function refetchProduct() {
    if (productFetchStatus !== FETCH_STATUSES.LOADING) 
      productsDispatch(getProductFetchStatusAction(FETCH_STATUSES.LOADING));
  }

  return (
    <section>

      <div className="md:container mx-auto">

        <ProductProfile 
          product={product} 
          productFetchStatus={productFetchStatus} 
          appType={CustomerApp.TYPE} 
          refetchProduct={refetchProduct} 
          />

        <div className="md:flex md:items-start md:gap-4 md:py-4">
          { 
            product && 
            <div className="container-x md:w-1/6">
              <H4Heading text="_store.Store" />
              <StoreItem store={ product.store } />   
            </div>
          }

          { product && <ProductReviewsList pID={pID} appType={CustomerApp.TYPE} /> }
        </div>

        { product && <RelatedProductsList /> }

      </div>

    </section>
  );
}

