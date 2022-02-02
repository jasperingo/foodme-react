
import React from 'react';
import Rater from './Rater';
import ReviewSummary from './ReviewSummary';

export default function ReviewRaterAndSummary({ title, review, summary, onReviewCreate, onReviewUpdate, onReviewDelete }) {
  return (
    <div className="md:flex md:gap-5">
      {
        summary.customer_can_review && 
        <div>
          <Rater 
            title={title}
            review={review}
            onRateCreate={onReviewCreate}
            onRateUpdate={onReviewUpdate}
            onRateDelete={onReviewDelete}
            />
        </div>
      }
      
      <div className="flex-grow">
        <ReviewSummary summary={summary} />
      </div>
    </div>
  );
}
