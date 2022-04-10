
import React, { useEffect } from 'react';
import ReviewList from '../../components/list/ReviewList';
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
    fetchStoreReviews,
    reviews, 
    reviewsLoading,
    reviewsLoaded,
    reviewsError,
    reviewsPage, 
    reviewsNumberOfPages,
    refreshStoreReviews
  ] = useStoreReviewList(storeToken);

  useEffect(
    function() {
      if (!reviewsLoaded && reviewsError === null) 
        fetchStoreReviews(store.id); 
    },
    [store.id, reviewsError, reviewsLoaded, fetchStoreReviews]
  );
  
  return (
    <section>

      {
        store.review_summary && 
        <div className="container-x">
          <ReviewRaterAndSummary summary={store.review_summary} />
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
        refreshList={refreshStoreReviews}
        fetchReviews={()=> fetchStoreReviews(store.id)}
        />

    </section>
  );
}
