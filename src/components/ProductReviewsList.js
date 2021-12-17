
import React, { useEffect } from 'react';
import ReviewApi from '../api/ReviewApi';
import CustomerApp from '../apps/CustomerApp';
import { reviewIcon } from '../assets/icons';
import { FETCH_STATUSES, getReviewsListFetchStatusAction } from '../context/AppActions';
import { useAppContext } from '../context/AppContext';
import { useListRender } from '../context/AppHooks';
import EmptyList from './EmptyList';
import FetchMoreButton from './FetchMoreButton';
import H4Heading from './H4Heading';
import Loading from './Loading';
import Rater from './Rater';
import Reload from './Reload';
import ReviewItem from './ReviewItem';
import ReviewSummary from './ReviewSummary';


export default function ProductReviewsList({ pID, appType }) {

  const { products: {
    product: {
      product
    },
    reviews: {
      reviews,
      reviewsPage,
      reviewsFetchStatus
    }
  }, productsDispatch } = useAppContext();


  useEffect(()=> {
    if (reviewsFetchStatus === FETCH_STATUSES.LOADING) {
      const api = new ReviewApi();
      api.getListByProduct(pID, reviewsPage, productsDispatch);
    }
  }, [pID, reviewsFetchStatus, reviewsPage, productsDispatch]);

  function refetchReviews() {
    if (reviewsFetchStatus !== FETCH_STATUSES.LOADING) 
      productsDispatch(getReviewsListFetchStatusAction(FETCH_STATUSES.LOADING));
  }
  
  function newRate(rate, text) {
    alert('Rate product: '+rate+' with note: '+text);
  }

  return (
    <div className="container-x flex-grow md:w-1/2">
      <H4Heading text="_review.Reviews" />

      <div className="md:flex md:gap-10">
        { 
          appType === CustomerApp.TYPE && 
          <div className="flex-grow md:text-center">
            <Rater 
              title="_review.Rate_this_product" 
              onRateSubmitted={newRate}
              />
          </div>
        }
        <div className="flex-grow">
          <ReviewSummary 
            ratings={product.ratings}
            />
        </div>
      </div>

      <div>
        <ul className="list-x">
          { 
            useListRender(
              reviews, 
              reviewsFetchStatus,
              (item, i)=> <li key={`prod-${i}`}> <ReviewItem review={item} /> </li>, 
              (k)=> <li key={k}> <Loading /> </li>, 
              (k)=> <li key={k}> <Reload action={refetchReviews} /> </li>,
              (k)=> <li key={k}> <EmptyList text="_empty.No_review" icon={reviewIcon} /> </li>, 
              (k)=> <li key={k}> <FetchMoreButton action={refetchReviews} /> </li>,
            )
          }
        </ul>
      </div>
    </div>
  );
}
