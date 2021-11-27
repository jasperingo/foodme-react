
import Icon from '@mdi/react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { reviewEmptyIcon, reviewIcon } from '../assets/icons';
import AlertDialog from './AlertDialog';

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

  const [text, setText] = useState('');

  const [rate, setRate] = useState(startRate);

  function onRateClicked(num) {
    setRate(num);
  }

  function onRateSubmit() {

    if (text === '')
      return;
    
    onSubmitClicked(rate, text);
  }
  
  return (
    <div className="p-4">
      <RateButtons rate={rate} onRateClicked={onRateClicked} />
      <form onSubmit={(e)=> e.preventDefault()} className="mt-5">
        <textarea 
          value={text}
          style={{minHeight: '80px'}}
          onInput={(e)=> setText(e.target.value)}
          placeholder={t('_review.Tell_us_your_experience')}
          className="w-full max-h-52 bg-color text-color border-b border-yellow-500 outline-none"
          >
        </textarea>
        <div className="text-right">
          <button className="text-yellow-500 font-bold p-2 hover:bg-color-gray-h" onClick={onCancelClicked}>
            { t('_extra.Cancel') }
          </button>
          <button className="text-yellow-500 font-bold p-2 hover:bg-color-gray-h" onClick={onRateSubmit}>
            { t('_extra.Submit') }
          </button>
        </div>
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

