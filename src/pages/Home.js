
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import ResturantItem from '../components/ResturantItem';
import { useAppContext, API_URL } from '../context/AppContext';
import { RESTAURANT_CATEGORIES_FETCHED } from '../context/AppActions';
import CategoriesIcon from '../icons/CategoriesIcon';

function CategoryItem({ name, iconColor }) {
  return (
    <li className="lg:mb-2">
      <Link 
        to="/" 
        className={`block bg-white shadow-lg px-2 py-3 rounded text-center ${iconColor} hover:text-white hover:${iconColor.replace('text', 'bg')} lg:flex lg:text-left lg:gap-1`}
        >
        <CategoriesIcon classList="fill-current mx-auto" />
        <div className="flex-grow">{ name }</div>
      </Link>
    </li>
  );
}

export default function Home({ restaurants, onRestaurantsFetched }) {

  const { t } = useTranslation();

  const { dispatch, restaurantCategories } = useAppContext();
  
  const catColors = ['text-blue-500', 'text-purple-500', 'text-red-500', 'text-green-500'];
  
  const categories = restaurantCategories.map((item, i) => (
    <CategoryItem 
      key={i} 
      name={item} 
      iconColor={catColors[i%catColors.length]}
      />
  ));

  const restaurantsList = restaurants.map((item, i)=> (
    <ResturantItem 
      key={i}
      ID={item.id}
      photo={item.logo}
      name={item.name}
      location={item.address}
      ratings={item.ratings}
      />     
  ));

  useEffect(() => {
    fetch(`${API_URL}category.json`)
      .then(response => response.json())
      .then(data => dispatch({
        type: RESTAURANT_CATEGORIES_FETCHED,
        payload: data.data
      }));

    fetch(`${API_URL}restaurants.json`)
      .then(response => response.json())
      .then(data => onRestaurantsFetched(data.data));
  }, [dispatch, onRestaurantsFetched]);

  return (
    <section>
      <div className="lg:container mx-auto">
        <div className="lg:flex lg:items-start lg:gap-2">

          <div className="bg-gray-200 lg:rounded lg:my-2 lg:w-56">
            <div className="container mx-auto">
              
              <h2 className="font-bold px-2 pt-4 text-lg">{ t('Categories') }</h2>
              { categories.length < 1 ? <Loading /> :
              <ul className="grid grid-cols-3 md:grid-cols-4 gap-4 px-2 py-3 lg:block">
                { categories } 
              </ul>
              }
            </div>
          </div>

          <div className="flex-grow">
            <div className="container mx-auto">
              <h2 className="font-bold px-2 pt-4 pb-2 text-lg">{ t('Recommended') }</h2>
              { restaurants.length < 1 ? <Loading /> :
              <ul className="p-2 md:grid md:grid-cols-3 lg:grid-cols-5 md:gap-4">
                { restaurantsList }
              </ul>
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


