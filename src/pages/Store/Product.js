
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import StoreApp from '../../apps/StoreApp';
import ProductProfile from '../../components/ProductProfile';
import ProductReviewsList from '../../components/ProductReviewsList';
import { FETCH_STATUSES, PRODUCT } from '../../context/AppActions';
import { API_URL, useAppContext } from '../../context/AppContext';

const getProductFetchStatusAction = (payload) => ({
  type: PRODUCT.FETCH_STATUS_CHANGED,
  payload
});

export default function Product() {

  const pID = parseInt(useParams().ID);

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
