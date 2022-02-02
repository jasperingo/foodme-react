
import Icon from '@mdi/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { notFoundIcon } from '../../assets/icons';
import { useMoneyFormat } from '../../hooks/viewHook';

export default function SavedCartSavedItem({ item: { quantity, product_variant } }) {
  
  const { t } = useTranslation();

  return (
    <li>
      <div className="flex gap-2 mb-5 md:block md:shadow">
        <img 
          src={product_variant.product.photo.href} 
          alt={ product_variant.product.title } 
          className="w-20 h-20 border rounded block md:w-full md:h-52" 
          />
        <div className="flex-grow md:p-2">
          <div className="mb-1">{ product_variant.product.title }</div>
          <div className="mb-1 text-color-gray">{ t('_extra.Variation') }: { product_variant.name }</div>
          <div className="font-bold mb-1">{ useMoneyFormat(product_variant.price) }</div>
          <div className="mb-1 flex gap-2 items-center">
            <span>QTY: { quantity }</span>
            {
              product_variant.quantity === 0 && 
              <div className="flex items-center gap-1 bg-color-gray px-2 rounded text-sm">
                <Icon path={notFoundIcon} className="w-4 h-4" />
                <span>{ t('_product.Product_is_out_of_stock') }</span>
              </div>
            }
            {
              product_variant.quantity < quantity && 
              <div className="flex items-center gap-1 bg-color-gray px-2 rounded text-sm">
                <Icon path={notFoundIcon} className="w-4 h-4" />
                <span>{ t('_product.Product_quantity_less') }</span>
              </div>
            }
          </div>
          {
            !product_variant.available && 
            <div className="flex items-center gap-1 text-red-500 rounded text-sm">
              <Icon path={notFoundIcon} className="w-4 h-4" />
              <span>{ t('_product._not_available_message') }</span>
            </div>
          }
        </div>
      </div>
    </li>
  );
}
