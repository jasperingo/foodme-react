
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CategoriesIcon from '../icons/CategoriesIcon';

function CategoryItem({ name, iconColor, numberOfResturants }) {

  const { t } = useTranslation();

  return (
    <li className="">
      <Link to="/categories" className={"flex gap-2 bg-white px-2 py-3 hover:bg-gray-100 "+iconColor}>
        <CategoriesIcon />
        <div className="flex-grow">
          <div className="font-bold">{ name }</div>
          <div className="text-sm text-gray-500">{ t('resturantWithCount', { count : numberOfResturants }) }</div>
        </div>
      </Link>
    </li>
  );
}

export default function Categories() {
  return (
    <section>
      
      <ul className="p-2">

        <CategoryItem name="African" iconColor="text-red-500" numberOfResturants="45" />

        <CategoryItem name="Snacks" iconColor="text-purple-500" numberOfResturants="300" />

        <CategoryItem name="Coffee" iconColor="text-red-500" numberOfResturants="12" />

        <CategoryItem name="Pizza" iconColor="text-blue-500" numberOfResturants="20" />

        <CategoryItem name="Chinese" iconColor="text-pink-500" numberOfResturants="1" />

        <CategoryItem name="Mexican" iconColor="text-green-500" numberOfResturants="7" />

      </ul>

    </section>
  );
}


