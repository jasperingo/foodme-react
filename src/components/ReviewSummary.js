
import Icon from '@mdi/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { reviewIcon } from '../assets/icons';
import ReviewStars from './ReviewStars';

function ReviewNumberData({ num }) {

  return (
    <li>
      <div className="flex gap-1 items-center">
        <div className="inline-block">{ num }</div>
        <Icon path={reviewIcon} className="w-4 h-4 text-yellow-500" />
        <div>({ num + 5 })</div>
        <div className="ml-2 bg-yellow-500 flex-grow h-2 rounded"></div>
      </div>
    </li>
  );
}

export default function ReviewSummary({ ratings }) {

  const data = [];

  const { t } = useTranslation();

  for(let i=5; i>0; i--) {
    data.push(
      <ReviewNumberData 
        key={i} 
        num={i} 
      />
    );
  }

  return (
    <div className="flex gap-5 py-4 items-center">
      <div className="text-center py-4 px-5 bg-color-gray rounded">
        <strong className="text-5xl">{ ratings }</strong>
        <ReviewStars ratings={ratings} />
        <div>300 { t('_review.ratings') }</div>
      </div>
      <ul className="flex-grow">
        { data }
      </ul>
    </div>
  );
}

