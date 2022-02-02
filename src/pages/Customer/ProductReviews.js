
import React from 'react';
import { useAppContext } from '../../hooks/contextHook';
import { useHasMoreToFetchViaScroll, useRenderListFooter, useRenderOnDataFetched } from '../../hooks/viewHook';
import { useHeader } from '../../hooks/headerHook';
import { useProductFetch } from '../../hooks/product/productFetchHook';
import Forbidden from '../../components/Forbidden';
import Loading from '../../components/Loading';
import NotFound from '../../components/NotFound';
import Reload from '../../components/Reload';
import { useProductReviewList } from '../../hooks/product/productReviewListHook';
import ProfileHeader from '../../components/profile/ProfileHeader';
import ReviewRaterAndSummary from '../../components/review/ReviewRaterAndSummary';
import ScrollList from '../../components/list/ScrollList';
import ReviewItem from '../../components/list_item/ReviewItem';
import EmptyList from '../../components/EmptyList';
import FetchMoreButton from '../../components/FetchMoreButton';
import { reviewIcon } from '../../assets/icons';

function Profile() {
  
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
    reviewsPage, 
    reviewsNumberOfPages,
    refetch
  ] = useProductReviewList(customerToken);

  return (
    <div className="container-x">

      <ProfileHeader 
        photo={product.photo.href}
        name={product.title} 
        />

      <ReviewRaterAndSummary 
        summary={product.review_summary}
        onReviewSubmit={(rating, review)=> console.log(rating, review)}
        title="_review.Rate_this_product"
        review={customerToken === null || product.reviews?.length === 0 ? null : product.reviews[0]}
        />

      <ScrollList
        data={reviews}
        nextPage={refetch}
        hasMore={useHasMoreToFetchViaScroll(reviewsPage, reviewsNumberOfPages, reviewsFetchStatus)}
        className="list-x"
        renderDataItem={(item)=> (
          <li key={`review-${item.id}`}> <ReviewItem review={item} /> </li>
        )}
        footer={useRenderListFooter(
          reviewsFetchStatus,
          ()=> <li key="review-footer"> <Loading /> </li>, 
          ()=> <li key="review-footer"> <Reload action={refetch} /> </li>,
          ()=> <li key="review-footer"> <EmptyList text="_empty.No_review" icon={reviewIcon} /> </li>,
          ()=> <li key="review-footer"> <FetchMoreButton action={refetch} /> </li>,
          ()=> <li key="review-footer"> <NotFound /> </li>,
          ()=> <li key="review-footer"> <Forbidden /> </li>,
        )}
        />

    </div>
  );
}


export default function ProductReviews() {

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
    product, 
    productFetchStatus, 
    refetch
  ] = useProductFetch(customerToken);

  
  useHeader({ 
    title: `${product?.name ?? 'Loading...'} - Product reviews`,
    headerTitle: '_product.Product_reviews',
    topNavPaths: ['/cart', '/search']
  });

  return (
    <section>
      {
        useRenderOnDataFetched(
          productFetchStatus,
          ()=> <Profile />,
          ()=> <div className="container-x"> <Loading /> </div>,
          ()=> <div className="container-x"> <Reload action={refetch} /> </div>,
          ()=> <div className="container-x"> <NotFound /> </div>,
          ()=> <div className="container-x"> <Forbidden /> </div>,
        )
      }
    </section>
  );
}
