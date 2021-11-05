
import React from 'react';
import { Link } from 'react-router-dom';
import { useMoneyFormat } from '../context/AppHooks';
import StoreIcon from '../icons/StoreIcon';

export default function ProductItem({ prod, href = `/store/${prod.store.id}/product/${prod.id}`, layout = ProductItem.LAYOUT_LIST_GRID }) {

  let layoutStyle, layoutImgStyle, layoutBodyStyle;

  switch(layout) {
    case ProductItem.LAYOUT_LIST:
      layoutStyle = 'flex gap-2 md:p-2 md:shadow';
      layoutImgStyle = 'w-24';
      layoutBodyStyle = 'pb-2';
      break;
    case ProductItem.LAYOUT_GRID:
      layoutStyle = 'block shadow';
      layoutImgStyle = 'w-full h-40';
      layoutBodyStyle = 'p-2';
      break;
    default:
      layoutStyle = 'flex gap-2 md:block md:shadow';
      layoutImgStyle = 'w-24 md:w-full md:h-40';
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
        alt={prod.title} 
        src={`/photos/products/${prod.photo}`} 
        className={`${layoutImgStyle} border rounded block`}
        />
      <div className={`flex-grow ${layoutBodyStyle}`}>
        <h4 className="mb-1">{ prod.title }</h4>
        <div className="text-color-gray text-sm mb-1">{ prod.sub_title }</div>
        <div className="font-bold mb-1">{ useMoneyFormat(prod.price) }</div>
        <div className="flex flex-wrap gap-1 items-center bg-color-primary text-sm text-white py-1 px-2 rounded-full w-max">
          <StoreIcon />
          <div>{ prod.store.name }</div>
        </div>
      </div>
    </Link>
  );
}

ProductItem.LAYOUT_LIST = 0;

ProductItem.LAYOUT_GRID = 1;

ProductItem.LAYOUT_LIST_GRID = 2;

