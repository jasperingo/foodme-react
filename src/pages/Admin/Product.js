
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Forbidden from '../../components/Forbidden';
import Loading from '../../components/Loading';
import NotFound from '../../components/NotFound';
import ProductProfile from '../../components/profile/ProductProfile';
import Reload from '../../components/Reload';
import { useAppContext } from '../../hooks/contextHook';
import { useProductFetch } from '../../hooks/product/productFetchHook';
import H4Heading from '../../components/H4Heading';
import { useProductReviewList } from '../../hooks/product/productReviewListHook';
import { useHeader } from '../../hooks/headerHook';
import ReviewSummary from '../../components/review/ReviewSummary';
import NetworkErrorCodes from '../../errors/NetworkErrorCodes';
import ReviewList from '../../components/list/ReviewList';

function ProductReviewList() {

  const {
    admin: { 
      admin: {
        adminToken
      }
    },
    product: {
      product: {
        product
      } 
    }
  } = useAppContext();

  const [
    fetchProductReviews,
    reviews, 
    reviewsLoading,
    reviewsLoaded,
    reviewsError,
    reviewsPage, 
    reviewsNumberOfPages,
  ] = useProductReviewList(adminToken);

  useEffect(
    function() { 
      if (!reviewsLoaded && reviewsError === null) 
        fetchProductReviews(product.id); 
    },
    [product.id, reviewsLoaded, reviewsError, fetchProductReviews]
  );
  
  return (
    <>

      <div className="mt-2 container-x">

        <H4Heading text="_review.Reviews" />
      
        <ReviewSummary summary={product.review_summary} />

      </div>

      <ReviewList 
        single={false}
        reviews={reviews} 
        reviewsLoading={reviewsLoading}
        reviewsLoaded={reviewsLoaded}
        reviewsError={reviewsError}
        reviewsPage={reviewsPage}
        reviewsNumberOfPages={reviewsNumberOfPages}
        fetchReviews={()=> fetchProductReviews(product.id)}
        />

    </>
  );
}


export default function Product() {

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
    headerTitle: '_product.Product',
    topNavPaths: ['/cart', '/search']
  });

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
      
      { product !== null && <ProductProfile isAdmin={true} product={product} /> }

      {
        product === null &&
        <div>
          { productLoading && <Loading /> }
          { productError === NetworkErrorCodes.NOT_FOUND && <NotFound /> }
          { productError === NetworkErrorCodes.FORBIDDEN && <Forbidden /> }
          { productError === NetworkErrorCodes.UNKNOWN_ERROR && <Reload action={()=> fetchProduct(ID)} /> }
          { productError === NetworkErrorCodes.NO_NETWORK_CONNECTION && <Reload message="_errors.No_netowrk_connection" action={()=> fetchProduct(ID)} /> }
        </div>
      }

      { 
        product !== null && 
        <ProductReviewList />
      }

    </section>
  );
}

