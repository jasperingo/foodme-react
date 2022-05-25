
import React, { useCallback, useEffect } from 'react';
import { useAppContext } from '../hooks/contextHook';
import { useHeader } from '../hooks/headerHook';
import { useProductFetch } from '../hooks/product/productFetchHook';
import Forbidden from '../components/Forbidden';
import Loading from '../components/Loading';
import NotFound from '../components/NotFound';
import Reload from '../components/Reload';
import { useProductReviewList } from '../hooks/product/productReviewListHook';
import ProfileHeader from '../components/profile/ProfileHeader';
import ReviewRaterAndSummary from '../components/review/ReviewRaterAndSummary';
import NetworkErrorCodes from '../errors/NetworkErrorCodes';
import { useParams } from 'react-router-dom';
import ReviewList from '../components/list/ReviewList';
import { useReviewUpdate } from '../hooks/review/reviewUpdateHook';
import { useReviewDelete } from '../hooks/review/reviewDeleteHook';
import { useReviewCreate } from '../hooks/review/reviewCreateHook';

function ProductReviewList() {
  
  const {
    customer: {
      customer: {
        customer: {
          customerToken
        }
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
    refreshProductReviews
  ] = useProductReviewList(customerToken);

  const [
    reviewUpdateOnSubmit,
    reviewUpdateLoading,
    reviewUpdateFormSuccess,
    reviewUpdateFormError,
    reviewUpdateResetSubmit
  ] = useReviewUpdate();

  const [
    reviewDeleteOnSubmit,
    reviewDeleteLoading,
    reviewDeleteFormSuccess,
    reviewDeleteFormError,
    reviewDeleteResetSubmit
  ] = useReviewDelete({ product: true });
  
  const [
    reviewCreateOnSubmit,
    reviewCreateLoading,
    reviewCreateFormSuccess,
    reviewCreateFormError,
    reviewCreateResetSubmit
  ] = useReviewCreate({ product: product.id });

  useEffect(
    function() { 
      if (!reviewsLoaded && reviewsError === null) 
        fetchProductReviews(product.id); 
    },
    [product.id, reviewsLoaded, reviewsError, fetchProductReviews]
  );
  
  return (
    <div className="container-x">

      <ReviewRaterAndSummary 
        summary={product.review_summary}
        title="_review.Rate_this_product"
        review={customerToken === null || !product?.reviews?.length ? null : product.reviews[0]}

        reviewDeleteOnSubmit={reviewDeleteOnSubmit}
        reviewDeleteLoading={reviewDeleteLoading}
        reviewDeleteFormSuccess={reviewDeleteFormSuccess}
        reviewDeleteFormError={reviewDeleteFormError}
        reviewDeleteResetSubmit={reviewDeleteResetSubmit}

        reviewCreateOnSubmit={reviewCreateOnSubmit}
        reviewCreateLoading={reviewCreateLoading}
        reviewCreateFormSuccess={reviewCreateFormSuccess}
        reviewCreateFormError={reviewCreateFormError}
        reviewCreateResetSubmit={reviewCreateResetSubmit}

        reviewUpdateOnSubmit={reviewUpdateOnSubmit}
        reviewUpdateLoading={reviewUpdateLoading}
        reviewUpdateFormSuccess={reviewUpdateFormSuccess}
        reviewUpdateFormError={reviewUpdateFormError}
        reviewUpdateResetSubmit={reviewUpdateResetSubmit}
        />

      <ReviewList
        single={false}
        reviews={reviews} 
        reviewsLoading={reviewsLoading}
        reviewsLoaded={reviewsLoaded}
        reviewsError={reviewsError}
        reviewsPage={reviewsPage}
        reviewsNumberOfPages={reviewsNumberOfPages}
        fetchReviews={()=> fetchProductReviews(product.id)}
        refreshList={refreshProductReviews}
        />
    </div>
  );
}


export default function ProductReviews() {

  const { ID } = useParams();

  const {
    customer: {
      customer: {
        customer: {
          customerToken
        }
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
  ] = useProductFetch(customerToken);

  useHeader({ 
    title: `${product?.title ?? 'Loading...'} - Product`,
    headerTitle: '_product.Product',
    topNavPaths: ['/cart', '/search']
  });

  const productFetch = useCallback(
    function(ID) {
      if (!productLoading) fetchProduct(ID);
    },
    [productLoading, fetchProduct]
  );

  useEffect(
    function() {
      if ((product !== null || productError !== null) && productID !== ID) 
        unfetchProduct();
      else if (product === null && productError === null)
        productFetch(ID);
    },
    [ID, product, productError, productID, productFetch, unfetchProduct]
  );
  
  return (
    <section>

      { 
        product !== null && 
        <div className="container-x">
          <ProfileHeader 
            photo={product.photo.href}
            name={product.title} 
            />
        </div>
      }

      {
        product === null &&
        <div>
          { productLoading && <Loading /> }
          { productError === NetworkErrorCodes.NOT_FOUND && <NotFound /> }
          { productError === NetworkErrorCodes.FORBIDDEN && <Forbidden /> }
          { productError === NetworkErrorCodes.UNKNOWN_ERROR && <Reload action={()=> productFetch(ID)} /> }
          { productError === NetworkErrorCodes.NO_NETWORK_CONNECTION && <Reload message="_errors.No_netowrk_connection" action={()=> productFetch(ID)} /> }
        </div>
      }

      { product !== null && <ProductReviewList /> }

    </section>
  );
}
