
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Forbidden from '../../components/Forbidden';
import RecommendForm from '../../components/form/RecommendForm';
import Loading from '../../components/Loading';
import NotFound from '../../components/NotFound';
import Reload from '../../components/Reload';
import NetworkErrorCodes from '../../errors/NetworkErrorCodes';
import { useAppContext } from '../../hooks/contextHook';
import { useHeader } from '../../hooks/headerHook';
import { useProductFetch } from '../../hooks/product/productFetchHook';
import { useProductRecommendedUpdate } from '../../hooks/product/productRecommendedUpdateHook';

export default function ProductUpdate() {

  const { ID } = useParams();

  const {
    admin: { 
      admin: {
        adminToken
      }
    } 
  } = useAppContext();

  const [
    fetchProduct,
    product,
    productLoading,
    productError,
    productID,
    unfetchProduct
  ] = useProductFetch(adminToken);

  useHeader({ 
    title: `${product?.title ?? 'Loading...'} - Product`,
    headerTitle: '_product.Edit_product',
  });

  const [
    recommendedOnSubmit,
    recommendedLoading, 
    recommendedFormSuccess, 
    recommendedFormError
  ] = useProductRecommendedUpdate(adminToken);
  
  useEffect(
    function() {
      if ((product !== null || productError !== null) && productID !== ID) 
        unfetchProduct();
      else if (product === null && productError === null)
        fetchProduct(ID);
    },
    [ID, product, productError, productID, fetchProduct, unfetchProduct]
  );

  return (
    <section>
      <div className="container-x">

        {
          product !== null &&
          <RecommendForm 
            recommended={product.recommended}
            onSubmit={recommendedOnSubmit}
            dialog={recommendedLoading}
            formError={recommendedFormError}
            formSuccess={recommendedFormSuccess}
            />
        }
        
        { productLoading && <Loading /> }

        { productError === NetworkErrorCodes.NOT_FOUND && <NotFound /> }

        { productError === NetworkErrorCodes.FORBIDDEN && <Forbidden /> }

        { 
          productError === NetworkErrorCodes.UNKNOWN_ERROR && 
          <Reload action={()=> fetchProduct(ID)} /> 
        }

        { 
          productError === NetworkErrorCodes.NO_NETWORK_CONNECTION && 
          <Reload message="_errors.No_netowrk_connection" action={()=> fetchProduct(ID)} /> 
        }
        
      </div>
    </section>
  );
}
