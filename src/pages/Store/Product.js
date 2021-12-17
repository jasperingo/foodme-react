
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import ProductApi from '../../api/ProductApi';
import StoreApp from '../../apps/StoreApp';
import ProductProfile from '../../components/ProductProfile';
import ProductReviewsList from '../../components/ProductReviewsList';
import { FETCH_STATUSES, getProductFetchStatusAction, PRODUCT } from '../../context/AppActions';
import { useAppContext } from '../../context/AppContext';

export default function Product() {

  const pID = parseInt(useParams().ID);

  const { 
    user: { user }, 
    products: {
      product: {
        product,
        productFetchStatus
      }
    }, 
    productsDispatch 
  } = useAppContext();
  
  useEffect(()=> {
    if (product !== null && pID !== product.id) {
      productsDispatch({ type: PRODUCT.UNFETCH });
    } else if (productFetchStatus === FETCH_STATUSES.LOADING) {
      const api = new ProductApi(user.api_token);
      api.get(pID, productsDispatch);
    }
  }, [pID, user, product, productFetchStatus, productsDispatch]);

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
          appType={StoreApp.TYPE} 
          refetchProduct={refetchProduct} 
          />

        <div className="md:flex md:items-start md:gap-4 md:py-4">
          { product && <ProductReviewsList pID={pID} /> }
        </div>

      </div>
    </section>
  );
}
