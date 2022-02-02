
import Icon from '@mdi/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { reviewIcon } from '../../assets/icons';
import ReviewStars from './ReviewStars';

function ReviewNumberData({ number, count, total }) {
  
  const value = total === 0 ? 0 : (count / total) * 100;
  
  return (
    <li>
      <div className="flex gap-1 items-center">
        <div className="inline-block">{ number }</div>
        <Icon path={reviewIcon} className="w-4 h-4 text-yellow-500" />
        <div>({ count })</div>
        <div className="ml-2 bg-color-gray flex-grow h-2 rounded relative">
          <span className="bg-yellow-500 h-2 rounded inline-block absolute" style={{ width: value+'%' }}></span>
        </div>
      </div>
    </li>
  );
}

export default function ReviewSummary({ summary }) {

  const data = [];

  const { t } = useTranslation();

  for(let i=5; i>0; i--) {
    data.push(
      <ReviewNumberData 
        key={i} 
        number={i}
        count={summary.ratings[i-1]} 
        total={summary.total}
      />
    );
  }

  return (
    <div className="flex gap-5 py-2 items-center">
      <div className="text-center py-4 px-5 bg-color-gray rounded">
        <strong className="text-5xl">{ summary.average.toFixed(1) }</strong>
        <ReviewStars ratings={ Math.round(summary.average) } />
        <div className="text-sm">{ t('_review.review__Count', { count: summary.total }) }</div>
      </div>
      <ul className="flex-grow">{ data }</ul>
    </div>
  );
}

