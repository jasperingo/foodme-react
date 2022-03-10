
import React from 'react';
import { reviewIcon } from '../../../assets/icons';
import { useHasMoreToFetchViaScroll, useRenderListFooter } from '../../../hooks/viewHook';
import EmptyList from '../../EmptyList';
import FetchMoreButton from '../../FetchMoreButton';
import Forbidden from '../../Forbidden';
import ScrollList from '../../list/ScrollList';
import ReviewItem from '../../list_item/ReviewItem';
import Loading from '../../Loading';
import NotFound from '../../NotFound';
import Reload from '../../Reload';

export default function ReviewList({ reviews, reviewsFetchStatus, reviewsPage, reviewsNumberOfPages, refetch }) {
  
  return (
    <div>
      <div className="container-x">

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
            ()=> <li key="review-footer" className="list-x-col-span"> <Loading /> </li>, 
            ()=> <li key="review-footer" className="list-x-col-span"> <Reload action={refetch} /> </li>,
            ()=> <li key="review-footer" className="list-x-col-span"> <EmptyList text="_empty.No_review" icon={reviewIcon} /> </li>,
            ()=> <li key="review-footer" className="list-x-col-span"> <FetchMoreButton action={refetch} /> </li>,
            ()=> <li key="review-footer" className="list-x-col-span"> <NotFound /> </li>,
            ()=> <li key="review-footer" className="list-x-col-span"> <Forbidden /> </li>,
          )}
          />

      </div>
    </div>
  );
}

