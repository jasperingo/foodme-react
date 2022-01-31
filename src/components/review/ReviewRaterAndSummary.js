
import React from 'react';
import Rater from './Rater';
import ReviewSummary from './ReviewSummary';

export default function ReviewRaterAndSummary({ title, review, onReviewSubmit, summary }) {
  return (
    <div className="md:flex md:gap-5">
      <div>
        <Rater 
          title={title}
          review={review}
          onRateSubmitted={onReviewSubmit}
          />
      </div>
      
      <div className="flex-grow">
        <ReviewSummary summary={summary} />
      </div>
    </div>
  );
}
