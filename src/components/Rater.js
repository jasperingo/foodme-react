
import Icon from '@mdi/react';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { reviewEmptyIcon, reviewIcon } from '../assets/icons';
import AlertDialog from './AlertDialog';
import AlertDialogDualButton from './AlertDialogDualButton';
import FormTextArea from './FormTextArea';

function RateButton({ num, rate, onButtonClicked }) {

  return (
    <button onClick={()=> onButtonClicked(num)}>
      {rate >= num ? 
        <Icon path={reviewIcon} className="w-10 h-10 text-yellow-500" /> :
        <Icon path={reviewEmptyIcon} className="w-10 h-10 text-yellow-500" /> 
      }
    </button>
  );
}

function RateButtons({ rate, onRateClicked }) {

  const buttons = [];

  for(let i=1; i<6; i++) {
    buttons.push(
      <RateButton 
        key={i} 
        num={i} 
        rate={rate}
        onButtonClicked={onRateClicked}
      />
    );
  }

  return (<ul>{ buttons }</ul>);
}

function RaterDialog({ startRate, onSubmitClicked, onCancelClicked }) {

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
    <div className="p-4">
      <RateButtons rate={rate} onRateClicked={onRateClicked} />
      <form onSubmit={(e)=> e.preventDefault()} className="mt-5">
        <FormTextArea 
          ref={msgInput}
          error={msgError}
          ID="review-message-input"
          label={t('_review.Tell_us_your_experience')}
          required={true}
          />
        <AlertDialogDualButton 
          onBad={onCancelClicked}
          onGood={onRateSubmit}
          />
      </form>
    </div>
  );
}

export default function Rater({ title, onRateSubmitted }) {

  const { t } = useTranslation();

  const [dialog, setDialog] = useState(null);

  function rateSubmitted(rate, text) {
    setDialog(null);
    onRateSubmitted(rate, text);
  }

  function onRateClicked(num) {
    setDialog({
      layout() {
        return (
          <RaterDialog 
            startRate={num} 
            onRateClicked={onRateClicked} 
            onSubmitClicked={rateSubmitted}
            onCancelClicked={()=> setDialog(null)}
            />
        );
      }
    });
  }

  return (
    <div className="py-4">
      <h5 className="font-bold mb-2">{ t(title) }</h5>
      <RateButtons rate={0} onRateClicked={onRateClicked} />
      { dialog && <AlertDialog dialog={dialog} /> }
    </div>
  );
}

