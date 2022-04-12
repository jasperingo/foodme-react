
import React, { useEffect } from 'react';
import ReviewList from '../../components/list/ReviewList';
import ReviewRaterAndSummary from '../../components/review/ReviewRaterAndSummary';
import { useAppContext } from '../../hooks/contextHook';
import { useDeliveryFirmReviewList } from '../../hooks/delivery_firm/deliveryFirmReviewListHook';
import { useHeader } from '../../hooks/headerHook';

export default function Reviews() {

  const { 
    deliveryFirm: { 
      deliveryFirm: {
        deliveryFirm,
        deliveryFirmToken
      }
    } 
  } = useAppContext();

  useHeader({ 
    title: `${deliveryFirm.user.name} - Reviews`,
    headerTitle: "_review.Reviews"
  });
  
  const [
    fetchDeliveryFirmReviews,
    reviews, 
    reviewsLoading,
    reviewsLoaded,
    reviewsError,
    reviewsPage, 
    reviewsNumberOfPages
  ] = useDeliveryFirmReviewList(deliveryFirmToken);

  useEffect(
    function() {
      if (!reviewsLoaded && reviewsError === null) 
        fetchDeliveryFirmReviews(deliveryFirm.id); 
    },
    [deliveryFirm.id, reviewsError, reviewsLoaded, fetchDeliveryFirmReviews]
  );

  return (
    <section>
     {
        deliveryFirm.review_summary && 
        <div className="container-x">
          <ReviewRaterAndSummary summary={deliveryFirm.review_summary} />
        </div>
      }

      <ReviewList 
        single={false}
        reviews={reviews} 
        reviewsLoading={reviewsLoading}
        reviewsLoaded={reviewsLoaded}
        reviewsError={reviewsError}
        reviewsPage={reviewsPage}
        reviewsNumberOfPages={reviewsNumberOfPages}
        fetchReviews={()=> fetchDeliveryFirmReviews(deliveryFirm.id)}
        />

    </section>
  );
}
