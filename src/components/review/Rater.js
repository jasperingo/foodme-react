
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AlertDialog from '../dialog/AlertDialog';
import LoadingDialog from '../dialog/LoadingDialog';
import ReviewItem from '../list_item/ReviewItem';
import RatingButtons from './RatingButtons';
import ReviewDialog from './ReviewDialog';


export default function Rater({ title, review, onRateCreate, onRateUpdate, onRateDelete }) {

  const { t } = useTranslation();

  const [rating, setRating] = useState(review?.rating || 0);

  const [dialog, setDialog] = useState(false);

  const [alertDialog, setAlertDialog] = useState(null);

  const [loadingDialog, setLoadingDialog] = useState(null);

  function responseHandler(message) {
    setLoadingDialog(false);
    setAlertDialog({
      body: message,
      positiveButton: {
        text: '_extra.Done',
        action() {
          setAlertDialog(null);
        }
      }
    });
  }

  function rateSubmitted(rate, text) {
    setDialog(false);
    setLoadingDialog(true);
    if (review !== null) {
      onRateUpdate(
        review.id, 
        { rating: rate, description: text },
        {
          onSuccess: responseHandler,
          onError: responseHandler
        }
      );
    } else {
      onRateCreate(
        { rating: rate, description: text },
        {
          onSuccess: responseHandler,
          onError: responseHandler
        }
      );
    }
  }
  
  function onRateClicked(num) {
    setRating(num);
    setDialog(true);
  }

  function onDeleteClicked() {
    setLoadingDialog(true);
    onRateDelete(
      review.id,
      {
        onSuccess: responseHandler,
        onError: responseHandler
      }
    );
  }

  function onConfirmDeleteClicked() {
    setAlertDialog({
      body: '_review._delete_review_confirm_message',
      positiveButton: {
        text: '_extra.Yes',
        action() {
          setAlertDialog(null);
          onDeleteClicked();
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
        loadingDialog && <LoadingDialog />
      }
    </div>
  );
}

