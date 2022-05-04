
import React, { useEffect } from 'react';
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

  useEffect(
    function() { 
      if (!relatedLoaded && relatedError === null) 
        fetchRelatedProducts(product.id); 
    },
    [product.id, relatedLoaded, relatedError, fetchRelatedProducts]
  );

  if (relatedLoaded && related.length === 0) return null;

  return (
    <div className="container-x py-4">

      <H4Heading text="_product.Related_products" />

      <ProductList
        products={related}
        productsPage={relatedPage}
        productsError={relatedError}
        productsLoaded={relatedLoaded}
        productsLoading={relatedLoading}
        productsNumberOfPages={relatedNumberOfPages}
        fetchProducts={()=> fetchRelatedProducts(product.id)}
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
    <div className="my-2 container-x">
      <H4Heading text="_review.Reviews" href={`/product/${product.id}/reviews`} />

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
        single={true}
        reviews={reviews} 
        reviewsLoading={reviewsLoading}
        reviewsLoaded={reviewsLoaded}
        reviewsError={reviewsError}
        fetchReviews={()=> fetchProductReviews(product.id)}
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

  const [
    favoriteCreateOnSubmit,
    favoriteCreateLoading,
    favoriteCreateFormSuccess,
    favoriteCreateFormError,
    favoriteCreateResetSubmit
  ] = useFavoriteCreate();

  const [
    favoriteDeleteOnSubmit,
    favoriteDeleteLoading,
    favoriteDeleteFormSuccess,
    favoriteDeleteFormError,
    favoriteDeleteResetSubmit
  ] = useFavoriteDelete();

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

      {
        product !== null &&
        (
          <ProductProfile 
            product={product} 
            isCustomer={true} 
            customerToken={customerToken} 

            favoriteCreateOnSubmit={favoriteCreateOnSubmit}
            favoriteCreateLoading={favoriteCreateLoading}
            favoriteCreateFormSuccess={favoriteCreateFormSuccess}
            favoriteCreateFormError={favoriteCreateFormError}
            favoriteCreateResetSubmit={favoriteCreateResetSubmit} 

            favoriteDeleteOnSubmit={favoriteDeleteOnSubmit}
            favoriteDeleteLoading={favoriteDeleteLoading}
            favoriteDeleteFormSuccess={favoriteDeleteFormSuccess}
            favoriteDeleteFormError={favoriteDeleteFormError}
            favoriteDeleteResetSubmit={favoriteDeleteResetSubmit}
            />
        )
      }

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

      { product !== null && <ProductReviewList /> }

      { reviewsLoaded && <ProductRelatedList /> }

    </section>
  );
}
