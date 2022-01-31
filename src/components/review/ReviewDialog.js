
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AlertDialogDualButton from '../dialog/AlertDialogDualButton';
import Dialog from '../dialog/Dialog';
import FormTextArea from '../form/FormTextArea';
import RatingButtons from './RatingButtons';

export default function ReviewDialog({ startRate, description, onSubmitClicked, onCancelClicked }) {

  const { t } = useTranslation();

  const msgInput = useRef(null);

  const [rate, setRate] = useState(startRate);

  const [msgError, setMsgError] = useState('');

  function onRateClicked(num) {
    setRate(num);
  }

  function onRateSubmit() {

    if (!msgInput.current.validity.valid) {
      setMsgError('_errors.This_field_is_required');
    } else {
      setMsgError('');
      onSubmitClicked(rate, msgInput.current.value);
    }
  }
  
  return (
    <Dialog>
      <div className="p-4">
        <RatingButtons rate={rate} onRateClicked={onRateClicked} />
        <form onSubmit={(e)=> e.preventDefault()} className="mt-5">
          <FormTextArea 
            ref={msgInput}
            error={msgError}
            ID="review-message-input"
            label={t('_review.Tell_us_your_experience')}
            value={description}
            required={true}
            />
          <AlertDialogDualButton 
            onBad={onCancelClicked}
            onGood={onRateSubmit}
            />
        </form>
      </div>
    </Dialog>
  );
}
