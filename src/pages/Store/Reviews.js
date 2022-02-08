
import React from 'react';
import ReviewList from '../../components/profile/section/ReviewList';
import ReviewRaterAndSummary from '../../components/review/ReviewRaterAndSummary';
import { useAppContext } from '../../hooks/contextHook';
import { useHeader } from '../../hooks/headerHook';
import { useStoreReviewList } from '../../hooks/store/storeReviewListHook';

export default function Reviews() {

  const {
    store: { 
      store: {
        store,
        storeToken
      }
    } 
  } = useAppContext();

  useHeader({ 
    title: `${store.user.name} - Reviews`,
    headerTitle: "_review.Reviews"
  });
  
  const [
    reviews, 
    reviewsFetchStatus, 
    reviewsPage, 
    reviewsNumberOfPages, 
    refetch
  ] = useStoreReviewList(storeToken);
  
  return (
    <section>

      {
        store.review_summary && 
        <div className="container-x">
          <ReviewRaterAndSummary summary={store.review_summary} />
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


