
import React from 'react'
import { Link } from 'react-router-dom';
import { useCategoryColor } from '../../hooks/viewHook';

export default function CategoryItem({ canEdit, category, index, sub, path, grid }) {

  const iconColor = useCategoryColor(index);

  const fullPath = sub ? `/search/${path}?${path}_sub_category=${category.id}` : `/category/${category.id}`;

  return (
    <li className="mb-2">
      <Link 
        to={canEdit ? `/sub-category/${category.id}/update` : fullPath} 
        className={`${grid ? 'block text-center shadow' : 'flex'} flex-grow items-center gap-2 bg-color p-2 rounded md:py-3 md:shadow md:block md:text-center hover:bg-color-gray-h`}
        >
        <img 
          src={category.photo.href} 
          alt={category.name} 
          width="100" 
          height="100" 
          className={`${grid ? 'w-full mb-1' : 'w-20'} h-20 block mx-auto rounded lg:h-52 lg:w-full lg:mb-1`}
          />
        <div className={`flex-grow truncate overflow-ellipsis ${iconColor}`}>{ category.name }</div>
      </Link>
    </li>
  );
}
