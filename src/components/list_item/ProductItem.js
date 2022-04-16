
import Icon from '@mdi/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { storeIcon } from '../../assets/icons';
import { useMoneyFormatter } from '../../hooks/viewHook';

export default function ProductItem(
  { 
    product: {
      id, 
      photo,
      title,
      store,
      product_variants: [ variant ]
    }, 
    href = `/product/${id}`, 
  }
) {

  const { t } = useTranslation();

  const moneyFormat = useMoneyFormatter();

  return (
    <Link 
      to={href} 
      className="flex gap-2 md:block md:shadow mb-5 hover:bg-color-gray-h"
      >
      <img 
        width="200"
        height="200"
        alt={title} 
        src={photo.href} 
        className="w-24 h-24 border rounded block md:w-full md:h-52"
        />
      <div className="flex-grow pb-2 md:p-2">
        <div className="mb-1">{ title }</div>
        {
          variant?.price ?
          <div className="font-bold mb-1">{ moneyFormat(variant.price) }</div> :
          <div className="italic mb-1 text-red-500">{ t('_extra.No_price') }</div>
        }
        <div className="flex gap-1 items-start text-color-primary text-sm py-1 w-full">
          <Icon path={storeIcon} className="w-5 h-5" />
          <div>{ store.user.name }</div>
        </div>
      </div>
    </Link>
  );
}
