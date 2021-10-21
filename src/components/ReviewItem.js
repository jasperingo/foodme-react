
import React from 'react';
import { useTranslation } from 'react-i18next';
import StarIcon from '../icons/StarIcon';

export default function ReviewItem({ review: { id, user, title, text, ratings, created_at } }) {

  const { t } = useTranslation();

  const stars = [];

  for(let i=0; i<5; i++) {
    if (i < ratings) 
      stars.push(<StarIcon key={i} classList="w-4 h-4 text-yellow-500 fill-current" />);
    else 
      stars.push(<StarIcon key={i} classList="w-4 h-4 text-gray-500 fill-current" />);
  }

  return (
    <div className="pb-2 mb-4 border-b" id={id}>
      <div className="flex">
        <div className="flex flex-grow">
          { stars }
        </div>
        <div className="text-color-gray">{ created_at }</div>
      </div>
      <div className="font-bold">{ title }</div>
      <div>{ text }</div>
      <div className="text-color-gray font-bold">{ t('_extra.By') } { user.first_name }</div>
    </div>
  );
}

