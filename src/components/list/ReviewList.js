
import React from 'react';
import { reviewIcon } from '../../assets/icons';
import ScrollList from './ScrollList';
import Forbidden from '../Forbidden';
import EmptyList from '../EmptyList';
import FetchMoreButton from '../FetchMoreButton';
import ReviewItem from '../list_item/ReviewItem';
import Loading from '../Loading';
import NotFound from '../NotFound';
import Reload from '../Reload';
import { useListFooter, useLoadOnListScroll } from '../../hooks/viewHook';
import NetworkErrorCodes from '../../errors/NetworkErrorCodes';

export default function ReviewList(
  { single, reviews, reviewsLoaded, reviewsLoading, reviewsError, reviewsPage, reviewsNumberOfPages, fetchReviews, refreshList }
) {
  
  const listFooter = useListFooter();

  const loadOnScroll = useLoadOnListScroll();

  return (
    <div className="container-x">

      <ScrollList
        data={reviews}
        nextPage={fetchReviews}
        refreshPage={refreshList}
        hasMore={!single && loadOnScroll(reviewsPage, reviewsNumberOfPages, reviewsError)}
        className="list-2-x"
        renderDataItem={(item)=> (
          <li key={`review-${item.id}`}> <ReviewItem review={item} /> </li>
        )}
        footer={listFooter([
          { 
            canRender: reviewsLoading, 
            render() { 
              return <li key="review-footer" className="list-2-x-col-span"> <Loading /> </li>; 
            }
          },
          { 
            canRender: !single && reviewsPage <= reviewsNumberOfPages,
            render() { 
              return <li key="orders-footer" className="list-2-x-col-span"> <FetchMoreButton action={fetchReviews} /> </li>; 
            }
          },
          { 
            canRender: reviewsError === NetworkErrorCodes.UNKNOWN_ERROR, 
            render() { 
              return <li key="review-footer" className="list-2-x-col-span"> <Reload action={fetchReviews} /> </li>; 
            }
          },
          { 
            canRender: reviewsLoaded && reviews.length === 0, 
            render() { 
              return <li key="review-footer" className="list-2-x-col-span"> <EmptyList text="_empty.No_review" icon={reviewIcon} /> </li>; 
            }
          },
          { 
            canRender: reviewsError === NetworkErrorCodes.NOT_FOUND, 
            render() { 
              return <li key="review-footer" className="list-2-x-col-span"> <NotFound /> </li>;
            }
          },
          { 
            canRender: reviewsError === NetworkErrorCodes.FORBIDDEN, 
            render() { 
              return <li key="review-footer" className="list-2-x-col-span"> <Forbidden /> </li>; 
            }
          },
          { 
            canRender: reviewsError === NetworkErrorCodes.NO_NETWORK_CONNECTION, 
            render() { 
              return <li key="review-footer" className="list-2-x-col-span"> <Reload message="_errors.No_netowrk_connection" action={fetchReviews} /> </li>; 
            }
          },
        ])}
        />

    </div>
  );
}

