
import React from 'react';
import Forbidden from '../../components/Forbidden';
import Loading from '../../components/Loading';
import NotFound from '../../components/NotFound';
import ProductProfile from '../../components/profile/ProductProfile';
import Reload from '../../components/Reload';
import { useAppContext } from '../../hooks/contextHook';
import { useProductFetch } from '../../hooks/product/productFetchHook';
import { useHasMoreToFetchViaScroll, useRenderListFooter, useRenderOnDataFetched } from '../../hooks/viewHook';
import H4Heading from '../../components/H4Heading';
import SingleList from '../../components/list/SingleList';
import EmptyList from '../../components/EmptyList';
import ReviewItem from '../../components/list_item/ReviewItem';
import { reviewIcon } from '../../assets/icons';
import { useProductReviewList } from '../../hooks/product/productReviewListHook';
import ReviewRaterAndSummary from '../../components/review/ReviewRaterAndSummary';
import { FETCH_STATUSES } from '../../repositories/Fetch';
import { useProductRelatedList } from '../../hooks/product/productRelatedHook';
import ScrollList from '../../components/list/ScrollList';
import FetchMoreButton from '../../components/FetchMoreButton';
import ProductItem from '../../components/list_item/ProductItem';


function RelatedList() {

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
    related, 
    relatedFetchStatus, 
    relatedPage, 
    relatedNumberOfPages, 
    refetch
  ] = useProductRelatedList(customerToken);

  return (
    <div className="container-x py-4">

      {
        relatedFetchStatus !== FETCH_STATUSES.EMPTY && 
        <H4Heading text="_product.Related_products" />
      }

      <ScrollList
        data={related}
        nextPage={refetch}
        hasMore={useHasMoreToFetchViaScroll(relatedPage, relatedNumberOfPages, relatedFetchStatus)}
        className="py-2 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5"
        renderDataItem={(item)=> (
          <li key={`product-${item.id}`}> <ProductItem product={item} layout={ProductItem.LAYOUT_GRID} /> </li>
        )}
        footer={useRenderListFooter(
          relatedFetchStatus,
          ()=> <li key="product-footer"> <Loading /> </li>, 
          ()=> <li key="product-footer"> <Reload action={refetch} /> </li>,
          ()=> null,
          ()=> <li key="product-footer"> <FetchMoreButton action={refetch} /> </li>,
          ()=> <li key="product-footer"> <NotFound /> </li>,
          ()=> <li key="product-footer"> <Forbidden /> </li>,
        )}
        />

    </div>
  );
}


function ReviewList() {

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
    reviews, 
    reviewsFetchStatus, 
    , 
    , 
    refetch
  ] = useProductReviewList(customerToken);

  function onNewReview(rating, description) {
    console.log(rating, description);
  }

  
  return (
    <div className="my-2 container-x">
      <H4Heading text="_review.Reviews" href={`/product/${product.id}/reviews`} />

      <ReviewRaterAndSummary 
        summary={product.review_summary}
        onReviewSubmit={onNewReview}
        title="_review.Rate_this_product"
        review={customerToken === null || product.reviews?.length === 0 ? null : product.reviews[0]}
        />

      <SingleList
        data={reviews}
        className="list-2-x"
        renderDataItem={(item)=> (
          <li key={`review-${item.id}`}> <ReviewItem review={item} /> </li>
        )}
        footer={useRenderListFooter(
          reviewsFetchStatus,
          ()=> <li key="review-footer"> <Loading /> </li>, 
          ()=> <li key="review-footer"> <Reload action={refetch} /> </li>,
          ()=> <li key="review-footer" className="col-span-2"> <EmptyList text="_empty.No_review" icon={reviewIcon} /> </li>,
          ()=> null,
          ()=> <li key="review-footer"> <NotFound /> </li>,
          ()=> <li key="review-footer"> <Forbidden /> </li>,
        )}
        />
    </div>
  );
}


export default function Product() {

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
        reviewsFetchStatus
      } 
    }
  } = useAppContext();

  const [
    product, 
    productFetchStatus, 
    refetch
  ] = useProductFetch(customerToken);

  
  return (
    <section>
      {
        useRenderOnDataFetched(
          productFetchStatus,
          ()=> <ProductProfile product={product} isCustomer={true} customerToken={customerToken} />,
          ()=> <div className="container-x"> <Loading /> </div>,
          ()=> <div className="container-x"> <Reload action={refetch} /> </div>,
          ()=> <div className="container-x"> <NotFound /> </div>,
          ()=> <div className="container-x"> <Forbidden /> </div>,
        )
      }

      { 
        product && 
        <ReviewList />
      }

      { 
        product && 
        (
          reviewsFetchStatus === FETCH_STATUSES.DONE || 
          reviewsFetchStatus === FETCH_STATUSES.MORE || 
          reviewsFetchStatus === FETCH_STATUSES.EMPTY
        ) &&
        <RelatedList /> 
      }
    </section>
  );
}

