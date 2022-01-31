
import Icon from '@mdi/react';
import React from 'react';
import { reviewEmptyIcon, reviewIcon } from '../../assets/icons';

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

export default function RatingButtons({ rate, onRateClicked }) {

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

  return <ul>{ buttons }</ul>;
}
