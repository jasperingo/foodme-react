
import React from 'react'
import { Link } from 'react-router-dom';
import { PRODUCT } from '../../context/actions/productActions';
import { STORE } from '../../context/actions/storeActions';
import { useAppContext } from '../../hooks/contextHook';

export default function CategoryItem({ canEdit, category, sub, path, grid }) {

  const { 
    search: {
      searchDispatch 
    }
  } = useAppContext();

  const fullPath = sub ? `/search/${path}?${path}_sub_category=${category.id}` : `/category/${category.id}`;


  function onItemClick() {
    if (sub) {
      searchDispatch({ type: STORE.LIST_UNFETCHED });
      searchDispatch({ type: PRODUCT.LIST_UNFETCHED });
    }
  }

  return (
    <li className="mb-2">
      <Link 
        onClick={onItemClick}
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
        <div className="flex-grow truncate overflow-ellipsis">{ category.name }</div>
      </Link>
    </li>
  );
}
