
import Icon from '@mdi/react';
import React from 'react';
import { userIcon } from '../assets/icons';
import ReviewStars from './ReviewStars';

export default function ReviewItem({ review: { id, user, title, text, ratings, created_at } }) {

  return (
    <div className="py-2 mb-4 md:px-2 md:shadow md:rounded" id={id}>
      <div className="flex flex-wrap gap-2">
        <ReviewStars ratings={ratings} />
        <div className="text-color-gray">{ created_at }</div>
      </div>
      <div className="font-bold">{ title }</div>
      <div className="mb-1">{ text }</div>
      <div className="inline-flex gap-1 items-center bg-color-gray px-2 rounded-full">
        <Icon path={userIcon} className="w-4 h-4" />
        <span>{ user.first_name }</span>
      </div>
    </div>
  );
}

