
import React from 'react'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useCategoryColor } from '../context/AppHooks';


export default function CategoryItem({ category, index }) {

  const { t } = useTranslation();

  const iconColor = useCategoryColor(index);

  return (
    <li className="mb-2">
      <Link 
        to={`/category/${category.id}`} 
        className={ `flex gap-2 bg-color py-2 rounded md:py-3 md:shadow md:block md:text-center hover:bg-color-gray-h ${iconColor}` }
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
    </li>
  );
}
