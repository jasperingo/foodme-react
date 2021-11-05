
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import StarEmptyIcon from '../icons/StarEmptyIcon';
import StarIcon from '../icons/StarIcon';

function RateButton({ num, rate, onButtonClicked }) {

  return (
    <button onClick={()=> onButtonClicked(num)}>
      {rate >= num ? 
        <StarIcon classList="w-10 h-10 text-yellow-500 fill-current" /> :
        <StarEmptyIcon classList="w-10 h-10 text-yellow-500 fill-current" /> 
      }
    </button>
  );
}

export default function Rater({ onRateChanged }) {

  const buttons = [];

  const { t } = useTranslation();

  const [rate, setRate] = useState(0);

  function onRateClicked(num) {
    setRate(num===rate?0:num);
  }
  
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

  return (
    <div className="py-4">
      <h5 className="font-bold mb-2">{ t('_review.Rate_this_store') }</h5>
      <ul>{ buttons }</ul>
      {/*<form onSubmit={(e)=> e.preventDefault()}>
        <textarea 
          placeholder={t('_review.Tell_us_your_experience')}
          className="w-full bg-color text-color border-b border-yellow-500 outline-none"
          ></textarea>
          <button
            className="text-yellow-500 font-bold p-2 hover:bg-color-gray-h"
            >
            { t('_extra.Submit') }
          </button>
      </form>*/}
    </div>
  );
}

