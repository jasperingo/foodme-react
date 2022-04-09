
import React, { useCallback, useEffect } from 'react';
import Forbidden from '../../components/Forbidden';
import Loading from '../../components/Loading';
import NotFound from '../../components/NotFound';
import ProductProfile from '../../components/profile/ProductProfile';
import Reload from '../../components/Reload';
import { useAppContext } from '../../hooks/contextHook';
import { useProductFetch } from '../../hooks/product/productFetchHook';
import H4Heading from '../../components/H4Heading';
import { useProductReviewList } from '../../hooks/product/productReviewListHook';
import ReviewRaterAndSummary from '../../components/review/ReviewRaterAndSummary';
import { useProductRelatedList } from '../../hooks/product/productRelatedHook';
import { useHeader } from '../../hooks/headerHook';
import { useFavoriteCreate } from '../../hooks/favorite/favoriteCreateHook';
import { useFavoriteDelete } from '../../hooks/favorite/favoriteDeleteHook';
import { useReviewUpdate } from '../../hooks/review/reviewUpdateHook';
import { useReviewDelete } from '../../hooks/review/reviewDeleteHook';
import { useReviewCreate } from '../../hooks/review/reviewCreateHook';
import { useParams } from 'react-router-dom';
import NetworkErrorCodes from '../../errors/NetworkErrorCodes';
import ReviewList from '../../components/list/ReviewList';
import ProductList from '../../components/list/ProductList';

function ProductRelatedList() {

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
    fetchRelatedProducts,
    related, 
    relatedLoading,
    relatedLoaded,
    relatedError,
    relatedPage,
    relatedNumberOfPages
  ] = useProductRelatedList(product.id, customerToken);

  const relatedFetch = useCallback(
    function() { if (!relatedLoading && relatedError === null) fetchRelatedProducts(); },
    [relatedLoading, relatedError, fetchRelatedProducts]
  );

  useEffect(
    function() { if (!relatedLoaded) relatedFetch(); },
    [relatedLoaded, relatedFetch]
  );

  return (
    <div className="container-x py-4">

      {
        relatedLoaded && related.length > 0 && 
        <H4Heading text="_product.Related_products" />
      }

      <ProductList
        products={related}
        productsPage={relatedPage}
        productsError={relatedError}
        productsLoaded={relatedLoaded}
        productsLoading={relatedLoading}
        productsNumberOfPages={relatedNumberOfPages}
        fetchProducts={relatedFetch}
        />

    </div>
  );
}


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
  ] = useProductReviewList(product.id, customerToken);

  const onReviewUpdate = useReviewUpdate();

  const onReviewDelete = useReviewDelete({ product: true });
  
  const onReviewCreate = useReviewCreate({ product: product.id });

  const reviewsFetch = useCallback(
    function() {
      if (!reviewsLoading) 
        fetchProductReviews();
    },
    [reviewsLoading, fetchProductReviews]
  );

  useEffect(
    function() { if (!reviewsLoaded && reviewsError === null) reviewsFetch(); },
    [reviewsLoaded, reviewsError, reviewsFetch]
  );
  
  return (
    <div className="my-2 container-x">
      <H4Heading text="_review.Reviews" href={`/product/${product.id}/reviews`} />

      <ReviewRaterAndSummary 
        onReviewCreate={onReviewCreate}
        onReviewUpdate={onReviewUpdate}
        onReviewDelete={onReviewDelete}
        summary={product.review_summary}
        title="_review.Rate_this_product"
        review={customerToken === null || !product?.reviews?.length ? null : product.reviews[0]}
        />

      <ReviewList 
        single={true}
        reviews={reviews} 
        reviewsLoading={reviewsLoading}
        reviewsLoaded={reviewsLoaded}
        reviewsError={reviewsError}
        fetchReviews={reviewsFetch}
        />
    </div>
  );
}


export default function Product() {

  const { ID } = useParams();

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
        reviewsLoaded
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

  const onFavoriteCreateSubmit = useFavoriteCreate();

  const onFavoriteDeleteSubmit = useFavoriteDelete();

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
        (
          <ProductProfile 
            product={product} 
            isCustomer={true} 
            customerToken={customerToken} 
            onFavoriteSubmit={onFavoriteCreateSubmit} 
            onUnfavoriteSubmit={onFavoriteDeleteSubmit} 
            />
        )
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

      { reviewsLoaded && <ProductRelatedList /> }

    </section>
  );
}
