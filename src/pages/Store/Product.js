
import React from 'react';
import Forbidden from '../../components/Forbidden';
import H4Heading from '../../components/H4Heading';
import Loading from '../../components/Loading';
import NotFound from '../../components/NotFound';
import ProductProfile from '../../components/profile/ProductProfile';
import ReviewList from '../../components/profile/section/ReviewList';
import Reload from '../../components/Reload';
import ReviewSummary from '../../components/review/ReviewSummary';
import { useAppContext } from '../../hooks/contextHook';
import { useHeader } from '../../hooks/headerHook';
import { useProductFetch } from '../../hooks/product/productFetchHook';
import { useProductReviewList } from '../../hooks/product/productReviewListHook';
import { useRenderOnDataFetched } from '../../hooks/viewHook';

function ProductReviewList() {

  const {
    store: { 
      store: {
        storeToken
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
  ] = useProductReviewList(storeToken);
  
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
    store: { 
      store: {
        storeToken
      }
    }
  } = useAppContext();

  const [
    product, 
    productFetchStatus, 
    refetch
  ] = useProductFetch(storeToken);

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
              isStore={true} 
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
