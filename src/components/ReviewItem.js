
import React from 'react';
import { useTranslation } from 'react-i18next';
import ReviewStars from './ReviewStars';

export default function ReviewItem({ review: { id, user, title, text, ratings, created_at } }) {

  const { t } = useTranslation();

  return (
    <div className="pb-2 mb-4 border-b md:border md:p-2" id={id}>
      <div className="flex flex-wrap gap-2">
        <ReviewStars ratings={ratings} />
        <div className="text-color-gray">{ created_at }</div>
      </div>
      <div className="font-bold">{ title }</div>
      <div>{ text }</div>
      <div className="text-color-gray font-bold">{ t('_extra.By') } { user.first_name }</div>
    </div>
  );
}

