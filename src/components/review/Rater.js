
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import AlertDialog from '../dialog/AlertDialog';
import LoadingDialog from '../dialog/LoadingDialog';
import ReviewItem from '../list_item/ReviewItem';
import RatingButtons from './RatingButtons';
import ReviewDialog from './ReviewDialog';

export default function Rater(
  { 
    title, 
    review,  
    
    reviewDeleteOnSubmit,
    reviewDeleteLoading,
    reviewDeleteFormSuccess = null,
    reviewDeleteFormError = null,
    reviewDeleteResetSubmit,

    reviewCreateOnSubmit,
    reviewCreateLoading,
    reviewCreateFormSuccess = null,
    reviewCreateFormError = null,
    reviewCreateResetSubmit,

    reviewUpdateOnSubmit,
    reviewUpdateLoading,
    reviewUpdateFormSuccess = null,
    reviewUpdateFormError = null,
    reviewUpdateResetSubmit
  }
) {

  const { t } = useTranslation();

  const [rating, setRating] = useState(review?.rating ?? 0);

  const [dialog, setDialog] = useState(false);

  const [alertDialog, setAlertDialog] = useState(null);

  useEffect(
    function() {
      if (reviewCreateFormError !== null || reviewCreateFormSuccess !== null) {
        setAlertDialog({
          body: reviewCreateFormError || reviewCreateFormSuccess,
          positiveButton: {
            text: '_extra.Done',
            action() {
              setAlertDialog(null);
              reviewCreateResetSubmit();
            }
          }
        });
      }
    },
    [reviewCreateFormSuccess, reviewCreateFormError, reviewCreateResetSubmit]
  );

  useEffect(
    function() {
      if (reviewDeleteFormError !== null || reviewDeleteFormSuccess !== null) {
        setAlertDialog({
          body: reviewDeleteFormError || reviewDeleteFormSuccess,
          positiveButton: {
            text: '_extra.Done',
            action() {
              setAlertDialog(null);
              reviewDeleteResetSubmit();
            }
          }
        });
      }
    },
    [reviewDeleteFormSuccess, reviewDeleteFormError, reviewDeleteResetSubmit]
  );

  useEffect(
    function() {
      if (reviewUpdateFormError !== null || reviewUpdateFormSuccess !== null) {
        setAlertDialog({
          body: reviewUpdateFormError || reviewUpdateFormSuccess,
          positiveButton: {
            text: '_extra.Done',
            action() {
              setAlertDialog(null);
              reviewUpdateResetSubmit();
            }
          }
        });
      }
    },
    [reviewUpdateFormSuccess, reviewUpdateFormError, reviewUpdateResetSubmit]
  );

  function rateSubmitted(rate, text) {
    setDialog(false);
    if (review !== null) {
      reviewUpdateOnSubmit(review.id, rate, text );
    } else {
      reviewCreateOnSubmit(rate, text);
    }
  }
  
  function onConfirmDeleteClicked() {
    setAlertDialog({
      body: '_review._delete_review_confirm_message',
      positiveButton: {
        text: '_extra.Yes',
        action() {
          setAlertDialog(null);
          reviewDeleteOnSubmit(review.id);
        }
      },
      negativeButton: {
        text: '_extra.No',
        action() {
          setAlertDialog(null);
        }
      }
    })
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
        <ReviewItem review={review} canEdit={true} editReview={onRateClicked} deletReview={onConfirmDeleteClicked} />
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
      {
        alertDialog && <AlertDialog dialog={alertDialog} />
      }
      {
        (reviewDeleteLoading || reviewCreateLoading || reviewUpdateLoading) && <LoadingDialog />
      }
    </div>
  );
}
