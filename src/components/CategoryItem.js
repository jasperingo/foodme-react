
import Icon from '@mdi/react';
import React from 'react'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { editIcon } from '../assets/icons';
import { useCategoryColor } from '../context/AppHooks';

export default function CategoryItem({ category, index, sub }) {

  const { t } = useTranslation();

  const iconColor = useCategoryColor(index);

  const path = category.type === 'product' ? 'products' : 'stores';

  const fullPath = sub ? `/search/${path}?category=${category.id}` : `/category/${category.id}`;

  return (
    <li className="mb-2">
      <div className={`flex items-center bg-color py-2 rounded md:px-2 md:items-start md:py-3 md:shadow hover:bg-color-gray-h ${iconColor}`}>
        <Link 
          to={fullPath} 
          className="flex flex-grow gap-2 md:block md:text-center"
          >
          <img src={`/photos/category/${category.photo}`} alt={category.name} width="100" height="100" className="w-14 h-14 block mx-auto rounded" />
          <div className="flex-grow">
            <div className="font-bold">{ category.name }</div>
            <div className="text-sm text-color-gray">
              { category.stores_count && t('_store.store__Count', { count : parseInt(category.stores_count) }) }
              { category.products_count && t('_product.product__Count', { count : parseInt(category.products_count) }) }
            </div>
          </div>
        </Link>
        {
          sub && 
          <Link to={`/sub-category/${category.id}/update`} className="btn-color-primary rounded p-1">
            <span className="sr-only">{ t('_extra.Edit') }</span>
            <Icon path={editIcon} className="w-5 h-5" />
          </Link>
          }
      </div>
    </li>
  );
}
