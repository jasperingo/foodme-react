
import React, { useEffect } from 'react'
import CustomerApp from '../apps/CustomerApp'
import { FETCH_STATUSES, REVIEW } from '../context/AppActions'
import { API_URL, useAppContext } from '../context/AppContext'
import { useListRender } from '../context/AppHooks'
import StarIcon from '../icons/StarIcon'
import EmptyList from './EmptyList'
import FetchMoreButton from './FetchMoreButton'
import H4Heading from './H4Heading'
import Loading from './Loading'
import Rater from './Rater'
import Reload from './Reload'
import ReviewItem from './ReviewItem'
import ReviewSummary from './ReviewSummary'


const getReviewsFetchStatusAction = (payload) => ({
  type: REVIEW.FETCH_STATUS_CHANGED,
  payload
});

export default function ProductReviewsList({ pID, appType }) {

  const { product: {
    reviews: {
      reviews,
      reviewsFetchStatus
    }
  }, productDispatch } = useAppContext();


  useEffect(()=> {

    async function fetchReviews() {
      if (reviewsFetchStatus !== FETCH_STATUSES.LOADING) 
        return;
      
      try {
        let response = await fetch(`${API_URL}reviews.json?id=${pID}`);

        if (!response.ok)
          throw new Error(response.status);
        
        let data = await response.json();
        
        productDispatch({
          type: REVIEW.FETCHED,
          payload: {
            reviews: data.data,
            reviewsNumberOfPages: 1, //data.total_pages
          }
        });

      } catch (err) {
        productDispatch(getReviewsFetchStatusAction(FETCH_STATUSES.ERROR));
      }
    }

    fetchReviews();

  }, [pID, reviewsFetchStatus, productDispatch]);

  function refetchReviews() {
    if (reviewsFetchStatus === FETCH_STATUSES.LOADING) 
      return;
    
    productDispatch(getReviewsFetchStatusAction(FETCH_STATUSES.LOADING));
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
          <ReviewSummary />
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
              (k)=> <li key={k}> <EmptyList text="_empty.No_review" Icon={StarIcon} /> </li>, 
              (k)=> <li key={k}> <FetchMoreButton action={refetchReviews} /> </li>,
            )
          }
        </ul>
      </div>
    </div>
  )
}
