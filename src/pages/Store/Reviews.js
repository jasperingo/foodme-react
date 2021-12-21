
import React, { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import ReviewApi from '../../api/ReviewApi';
import { reviewIcon } from '../../assets/icons';
import EmptyList from '../../components/EmptyList';
import FetchMoreButton from '../../components/FetchMoreButton';
import Loading from '../../components/Loading';
import Reload from '../../components/Reload';
import ReviewItem from '../../components/ReviewItem';
import { FETCH_STATUSES, getReviewsListFetchStatusAction } from '../../context/AppActions';
import { useAppContext } from '../../context/AppContext';
import { useHasMoreToFetchViaScroll, useListRender } from '../../context/AppHooks';

export default function Reviews() {

  const { user: { user }, reviews: {
    reviews: {
      reviews,
      reviewsPage,
      reviewsNumberOfPages,
      reviewsFetchStatus,
    }
  }, reviewsDispatch} = useAppContext();

  useEffect(()=>{
    if (reviewsFetchStatus === FETCH_STATUSES.LOADING) {
      const api = new ReviewApi(user.api_token);
      api.getListByStore(0, reviewsPage, reviewsDispatch);
    }
  });

  function refetchReviews() {
    if (reviewsFetchStatus !== FETCH_STATUSES.LOADING) 
      reviewsDispatch(getReviewsListFetchStatusAction(FETCH_STATUSES.LOADING));
  }

  return (
    <section className="flex-grow">
      <div className="container-x">
        <InfiniteScroll 
          dataLength={reviews.length}
          next={refetchReviews}
          hasMore={useHasMoreToFetchViaScroll(reviewsPage, reviewsNumberOfPages, reviewsFetchStatus)}
          >
          <ul className="list-2-x">
            { 
              useListRender(
                reviews,
                reviewsFetchStatus,
                (item, i)=> <ReviewItem key={`review-${i}`} review={item} />, 
                (k)=> <li key={k}> <Loading /> </li>, 
                (k)=> <li key={k}> <Reload action={refetchReviews} /> </li>,
                (k)=> <li key={k}> <EmptyList text="_empty.No_reviews" icon={reviewIcon} /> </li>, 
                (k)=> <li key={k}> <FetchMoreButton action={refetchReviews} /> </li>,
              )
            }
          </ul>
        </InfiniteScroll>
      </div>
    </section>
  );
}


