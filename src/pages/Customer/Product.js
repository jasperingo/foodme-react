
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { API_URL, useAppContext } from '../../context/AppContext';
import { FETCH_STATUSES, PRODUCT } from '../../context/AppActions';
import { useHasMoreToFetchViaScroll, useListRender } from '../../context/AppHooks';
import StoreItem from '../../components/StoreItem';
import Reload from '../../components/Reload';
import Loading from '../../components/Loading';
import EmptyList from '../../components/EmptyList';
import FetchMoreButton from '../../components/FetchMoreButton';
import ProductItem from '../../components/ProductItem';
import ProductIcon from '../../icons/ProductIcon';
import ProductProfile from '../../components/ProductProfile';
import CustomerApp from '../../apps/CustomerApp';
import H4Heading from '../../components/H4Heading';
import ProductReviewsList from '../../components/ProductReviewsList';

const getProductFetchStatusAction = (payload) => ({
  type: PRODUCT.FETCH_STATUS_CHANGED,
  payload
});

const getRelatedFetchStatusAction = (payload) => ({
  type: PRODUCT.LIST_FETCH_STATUS_CHANGED,
  payload
});

function RelatedProductsList() {

  const pID = parseInt(useParams().pID);

  const { product: {
    related: {
      related,
      relatedFetchStatus,
      relatedPage, 
      relatedNumberOfPages
    }
  }, productDispatch } = useAppContext();

  useEffect(()=> {
    async function fetchRelated() {
      if (relatedFetchStatus !== FETCH_STATUSES.LOADING) 
        return;
      
      try {
        let response = await fetch(`${API_URL}store-products.json?id=${pID}`);

        if (!response.ok)
          throw new Error(response.status);
        
        let data = await response.json();
        
        productDispatch({
          type: PRODUCT.LIST_FETCHED,
          payload: {
            related: data.data,
            relatedNumberOfPages: data.total_pages
          }
        });

      } catch (err) {
        productDispatch(getRelatedFetchStatusAction(FETCH_STATUSES.ERROR));
      }
    }

    fetchRelated();

  }, [pID, relatedFetchStatus, productDispatch]);

  function refetchRelated() {
    if (relatedFetchStatus === FETCH_STATUSES.LOADING) 
      return;
    
    productDispatch(getRelatedFetchStatusAction(FETCH_STATUSES.LOADING));
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
                (item, i)=> <li key={`prod-${i}`} > <ProductItem prod={item} layout={ProductItem.LAYOUT_GRID} /> </li>, 
                (k)=> <li key={k}> <Loading /> </li>, 
                (k)=> <li key={k}> <Reload action={refetchRelated} /> </li>,
                (k)=> <li key={k}> <EmptyList text="_empty.No_product" Icon={ProductIcon} /> </li>, 
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

  const { product: {
    product: {
      product,
      productFetchStatus
    }
  }, productDispatch } = useAppContext();
  
  useEffect(()=> {
    async function fetchProduct() {

      if (productFetchStatus !== FETCH_STATUSES.LOADING) 
        return;
      
      try {
        let response = await fetch(`${API_URL}product.json?id=${pID}`);

        if (!response.ok)
          throw new Error(response.status);
        
        let data = await response.json();

        data.data.id = pID;

        productDispatch({
          type: PRODUCT.FETCHED,
          payload: data.data
        });
        
      } catch (err) {
        productDispatch(getProductFetchStatusAction(FETCH_STATUSES.ERROR));
      }
    }

    if (product !== null && pID !== product.id) {
      productDispatch({ type: PRODUCT.UNFETCH });
    }

    fetchProduct(); 

  }, [pID, product, productFetchStatus, productDispatch]);

  function refetchProduct() {
    if (productFetchStatus === FETCH_STATUSES.LOADING) 
      return;

    productDispatch(getProductFetchStatusAction(FETCH_STATUSES.LOADING));
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

