
import Icon from '@mdi/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { userIcon } from '../../assets/icons';
import { useDateFormat } from '../../hooks/viewHook';
import ReviewStars from '../review/ReviewStars';

export default function ReviewItem({ canEdit, editReview, deletReview, review: { id, customer, description, rating, created_at } }) {

  const { t } = useTranslation();

  return (
    <div className="py-2 mb-4 md:px-2 md:shadow md:rounded" id={id}>
      <div className="flex flex-wrap gap-2">
        <ReviewStars ratings={rating} />
        <time dateTime={created_at} className="block text-color-gray">{ useDateFormat(created_at, { date: true }) }</time>
      </div>
      <div className="mb-2">{ description }</div>
      <div className="flex items-center gap-2 text-sm">
        <div className="inline-flex gap-1 items-center bg-color-gray px-2 rounded-full">
          <Icon path={userIcon} className="w-4 h-4" />
          <span>{ customer.user.name }</span>
        </div>
        {
          canEdit && 
          <div className="flex gap-2 flex-grow justify-end">
            <button className="btn-color-primary px-2 rounded" onClick={()=> editReview(rating)}>{ t('_extra.Edit') }</button>
            <button className="btn-color-red px-2 rounded" onClick={()=> deletReview()}>{ t('_extra.Delete') }</button>
          </div>
        }
      </div>
      
    </div>
  );
}

