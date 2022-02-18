
import React from 'react';
import Forbidden from '../../components/Forbidden';
import Loading from '../../components/Loading';
import NotFound from '../../components/NotFound';
import ProductProfile from '../../components/profile/ProductProfile';
import ReviewList from '../../components/profile/section/ReviewList';
import Reload from '../../components/Reload';
import { useAppContext } from '../../hooks/contextHook';
import { useProductFetch } from '../../hooks/product/productFetchHook';
import {  useRenderOnDataFetched } from '../../hooks/viewHook';
import H4Heading from '../../components/H4Heading';
import { useProductReviewList } from '../../hooks/product/productReviewListHook';
import { useHeader } from '../../hooks/headerHook';
import ReviewSummary from '../../components/review/ReviewSummary';


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
    reviews, 
    reviewsFetchStatus, 
    reviewsPage, 
    reviewsNumberOfPages, 
    refetch
  ] = useProductReviewList(adminToken);
  
  return (
    <>

      <div className="mt-2 container-x">

        <H4Heading text="_review.Reviews" />
      
        <ReviewSummary summary={product.review_summary} />

      </div>

      <ReviewList 
        reviews={reviews}
        reviewsFetchStatus={reviewsFetchStatus}
        reviewsPage={reviewsPage}
        reviewsNumberOfPages={reviewsNumberOfPages}
        refetch={refetch}
        />

    </>
  );
}


export default function Product() {

  const {
    admin: { 
      admin: {
        adminToken
      }
    } 
  } = useAppContext();

  const [
    product, 
    productFetchStatus, 
    refetch
  ] = useProductFetch(adminToken);

  useHeader({ 
    title: `${product?.title ?? 'Loading...'} - Product`,
    headerTitle: '_product.Product',
    topNavPaths: ['/cart', '/search']
  });

  return (
    <section>
      {
        useRenderOnDataFetched(
          productFetchStatus,
          ()=> (
            <ProductProfile 
              product={product} 
              isAdmin={true}
              />
          ),
          ()=> <div className="container-x"> <Loading /> </div>,
          ()=> <div className="container-x"> <Reload action={refetch} /> </div>,
          ()=> <div className="container-x"> <NotFound /> </div>,
          ()=> <div className="container-x"> <Forbidden /> </div>,
        )
      }

      { 
        product && 
        <ProductReviewList />
      }
    </section>
  );
}

