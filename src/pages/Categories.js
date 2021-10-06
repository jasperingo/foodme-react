
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CategoriesIcon from '../icons/CategoriesIcon';
import { useAppContext, API_URL } from '../context/AppContext';
import { RESTAURANT_CATEGORIES_FETCHED } from '../context/AppActions';
import Loading from '../components/Loading';

function CategoryItem({ category, iconColor }) {

  const { t } = useTranslation();

  return (
    <li className="">
      <Link to="/categories" className={ `flex gap-2 bg-color px-2 py-3 md:block md:text-center hover:bg-color-gray-h ${iconColor}` }>
        <CategoriesIcon classList="fill-current mx-auto" />
        <div className="flex-grow">
          <div className="font-bold">{ category.name }</div>
          <div className="text-sm text-color-gray">{ t('resturantWithCount', { count : parseInt(category.stores_count) }) }</div>
        </div>
      </Link>
    </li>
  );
}

export default function Categories() {

  const { dispatch, restaurantCategories } = useAppContext();

  const catColors = ['text-blue-500', 'text-purple-500', 'text-red-500', 'text-green-500'];
  
  const categories = restaurantCategories.map((item, i) => (
    <CategoryItem 
      key={i} 
      category={item} 
      iconColor={catColors[i%catColors.length]}
      />
  ));

  useEffect(() => {
    
    if (restaurantCategories.length < 1) {
      fetch(`${API_URL}category.json`)
        .then(response => response.json())
        .then(data => dispatch({
          type: RESTAURANT_CATEGORIES_FETCHED,
          payload: data.data
        }));
    }

  }, [dispatch, restaurantCategories]);

  return (
    <section>
      <div className="container mx-auto px-2">
        { categories.length < 1 ? <Loading /> :
        <ul className="py-2 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4">
          { categories }
        </ul>
        }
      </div>
    </section>
  );
}


