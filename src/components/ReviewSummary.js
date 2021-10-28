
import React from 'react';
import { useTranslation } from 'react-i18next';
import StarIcon from '../icons/StarIcon';
import ReviewStars from './ReviewStars';

function ReviewNumberData({ num }) {

  return (
    <li>
      <div className="flex gap-1 items-center">
        <div className="inline-block">{ num }</div>
        <StarIcon classList="w-4 h-4 text-yellow-500 fill-current" />
        <div>({ num + 5 })</div>
        <div className="ml-2 bg-yellow-500 flex-grow h-2 rounded"></div>
      </div>
    </li>
  );
}

export default function ReviewSummary() {

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
        <strong className="text-5xl">4.4</strong>
        <ReviewStars ratings={4} />
        <div>300 { t('_review.ratings') }</div>
      </div>
      <ul className="flex-grow">
        { data }
      </ul>
    </div>
  );
}

