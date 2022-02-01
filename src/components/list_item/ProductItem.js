
import Icon from '@mdi/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { storeIcon } from '../../assets/icons';
import { useMoneyFormat } from '../../hooks/viewHook';

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
    layout = ProductItem.LAYOUT_LIST_GRID 
  }
) {

  const { t } = useTranslation();

  const priceView = useMoneyFormat(variant?.price || 0);

  let layoutStyle, layoutImgStyle, layoutBodyStyle;

  switch(layout) {
    case ProductItem.LAYOUT_LIST:
      layoutStyle = 'flex gap-2 md:p-2 md:shadow';
      layoutImgStyle = 'w-24 h-24';
      layoutBodyStyle = 'pb-2';
      break;
    case ProductItem.LAYOUT_GRID:
      layoutStyle = 'block shadow';
      layoutImgStyle = 'w-full h-52';
      layoutBodyStyle = 'p-2';
      break;
    default:
      layoutStyle = 'flex gap-2 md:block md:shadow';
      layoutImgStyle = 'w-24 h-24 md:w-full md:h-52';
      layoutBodyStyle = 'pb-2 md:p-2';
  }

  return (
    <Link 
      to={href} 
      className={`${layoutStyle} mb-5 hover:bg-color-gray-h`}
      >
      <img 
        width="200"
        height="200"
        alt={title} 
        src={photo.href} 
        className={`${layoutImgStyle} border rounded block`}
        />
      <div className={`flex-grow ${layoutBodyStyle}`}>
        <div className="mb-1">{ title }</div>
        {
          variant?.price ?
          priceView :
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

ProductItem.LAYOUT_LIST = 0;

ProductItem.LAYOUT_GRID = 1;

ProductItem.LAYOUT_LIST_GRID = 2;

