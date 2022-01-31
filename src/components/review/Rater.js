
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReviewItem from '../list_item/ReviewItem';
import RatingButtons from './RatingButtons';
import ReviewDialog from './ReviewDialog';


export default function Rater({ title, review, onRateSubmitted }) {

  const { t } = useTranslation();

  const [rating, setRating] = useState(review?.rating || 0);

  const [dialog, setDialog] = useState(false);

  function rateSubmitted(rate, text) {
    setDialog(false);
    onRateSubmitted(rate, text);
  }

  function onRateClicked(num) {
    setRating(num);
    setDialog(true);
  }

  return (
    <div className="py-2">
      
      {
        review === null ?
        <div className="md:text-center">
          <h5 className="font-bold mb-2">{ t(title) }</h5>
          <RatingButtons rate={0} onRateClicked={onRateClicked} />
        </div>
        :
        <ReviewItem review={review} canEdit={true} editReview={onRateClicked} />
      }
      { 
        dialog && 
        <ReviewDialog 
          description={review?.description || ''}
          startRate={rating} 
          onRateClicked={onRateClicked} 
          onSubmitClicked={rateSubmitted}
          onCancelClicked={()=> setDialog(false)}
          />
      }
    </div>
  );
}

