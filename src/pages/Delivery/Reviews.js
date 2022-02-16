
import React from 'react';
import ReviewList from '../../components/profile/section/ReviewList';
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
    reviews, 
    reviewsFetchStatus, 
    reviewsPage, 
    reviewsNumberOfPages, 
    refetch
  ] = useDeliveryFirmReviewList(deliveryFirmToken);

  return (
    <section className="flex-grow">
     {
        deliveryFirm.review_summary && 
        <div className="container-x">
          <ReviewRaterAndSummary summary={deliveryFirm.review_summary} />
        </div>
      }

      <ReviewList 
        reviews={reviews}
        reviewsFetchStatus={reviewsFetchStatus}
        reviewsPage={reviewsPage}
        reviewsNumberOfPages={reviewsNumberOfPages}
        refetch={refetch}
        />
    </section>
  );
}
