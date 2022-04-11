
import React from 'react';
import Rater from './Rater';
import ReviewSummary from './ReviewSummary';

export default function ReviewRaterAndSummary(
  { 
    title, 
    review, 
    summary, 
    onReviewCreate, 
    onReviewUpdate, 
    
    reviewDeleteOnSubmit,
    reviewDeleteLoading,
    reviewDeleteFormSuccess,
    reviewDeleteFormError,
    reviewDeleteResetSubmit,

    reviewCreateOnSubmit,
    reviewCreateLoading,
    reviewCreateFormSuccess,
    reviewCreateFormError,
    reviewCreateResetSubmit,

    reviewUpdateOnSubmit,
    reviewUpdateLoading,
    reviewUpdateFormSuccess,
    reviewUpdateFormError,
    reviewUpdateResetSubmit
  }
) {
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
            
            reviewDeleteOnSubmit={reviewDeleteOnSubmit}
            reviewDeleteLoading={reviewDeleteLoading}
            reviewDeleteFormSuccess={reviewDeleteFormSuccess}
            reviewDeleteFormError={reviewDeleteFormError}
            reviewDeleteResetSubmit={reviewDeleteResetSubmit}

            reviewCreateOnSubmit={reviewCreateOnSubmit}
            reviewCreateLoading={reviewCreateLoading}
            reviewCreateFormSuccess={reviewCreateFormSuccess}
            reviewCreateFormError={reviewCreateFormError}
            reviewCreateResetSubmit={reviewCreateResetSubmit}

            reviewUpdateOnSubmit={reviewUpdateOnSubmit}
            reviewUpdateLoading={reviewUpdateLoading}
            reviewUpdateFormSuccess={reviewUpdateFormSuccess}
            reviewUpdateFormError={reviewUpdateFormError}
            reviewUpdateResetSubmit={reviewUpdateResetSubmit}
            />
        </div>
      }
      
      <div className="flex-grow">
        <ReviewSummary summary={summary} />
      </div>
    </div>
  );
}
