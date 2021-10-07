
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Reload from '../components/Reload';
import Loading from '../components/Loading';
import StoreItem from '../components/StoreItem';
import { useAppContext, API_URL } from '../context/AppContext';
import { RESTAURANT_CATEGORIES_FETCHED } from '../context/AppActions';
import CategoriesIcon from '../icons/CategoriesIcon';
import ResturantIcon from '../icons/ResturantIcon';
import EmptyList from '../components/EmptyList';
import { useCategoryColor } from '../context/AppHooks';

function CategoryItem({ name, index }) {

  const iconColor = useCategoryColor(index);

  return (
    <li className="lg:mb-2">
      <Link 
        to={`/search?category=${name}`}
        className={`block bg-color dark:bg-color-d hover:bg-color-gray-h shadow-lg px-2 py-3 rounded text-center ${iconColor} lg:flex lg:text-left lg:gap-1`}
        >
        <CategoriesIcon classList="fill-current mx-auto" />
        <div className="flex-grow text-sm break-all">{ name }</div>
      </Link>
    </li>
  );
}

export default function Home() {

  const { t } = useTranslation();
  
  const { dispatch, restaurantCategories } = useAppContext();

  const [stores, setStores] = useState([]);

  const [storesFetched, setStoresFetched] = useState(stores.length < 1 ? 0 : 1);

  const [categoriesFetch, setCategoriesFetch] = useState(restaurantCategories.length < 1 ? 0 : 1);

  let categoriesRender, storesRender;

  function fetchCategories() {
    if (categoriesFetch === 0) {
      fetch(`${API_URL}category.json`)
        .then(response => {
          if (!response.ok)
            throw new Error(response.status);
          return response.json();
        })
        .then(data => {
          setCategoriesFetch(1);
          dispatch({
            type: RESTAURANT_CATEGORIES_FETCHED,
            payload: data.data
          })
        })
        .catch(err => {
          setCategoriesFetch(-1);
        });
    }
  }

  function refetchCategories() {
    setCategoriesFetch(0);
    fetchCategories();
  }
  
  async function fetchStores() {
    if (storesFetched !== 0) return;
    
    try {
      let response = await fetch(`${API_URL}stores.json`);

      if (!response.ok)
        throw new Error(response.status);
      
      let data = await response.json();

      setStores(data.data);
      setStoresFetched(1);

    } catch (err) {
      setStoresFetched(-1);
    }
  }

  function refetchStores() {
    setStoresFetched(0);
    fetchStores();
  }

  useEffect(fetchCategories);

  useEffect(fetchStores);

  if (categoriesFetch === 0) {
    categoriesRender = <Loading />;
  } else if (categoriesFetch === -1) {
    categoriesRender = <Reload action={refetchCategories} />;
  } else if (categoriesFetch === 1 && restaurantCategories.length === 0) {
    categoriesRender = <EmptyList text="_empty.No_category" Icon={CategoriesIcon} />;
  } else {
    categoriesRender = (
      <ul className="grid gap-4 grid-cols-3 md:grid-cols-4 lg:block">
        { 
          restaurantCategories.map((item, i) => (
            <CategoryItem 
              key={i} 
              index={i}
              name={item.name} 
              />
          ))
        } 
      </ul>
    );
  }

  if (storesFetched === 0) {
    storesRender = <Loading />;
  } else if (storesFetched === -1) {
    storesRender = <Reload action={refetchStores} />;
  } else if (storesFetched === 1 && stores.length === 0) {
    storesRender = <EmptyList text="_empty.No_store" Icon={ResturantIcon} />;
  } else {
    storesRender = (
      <ul className="py-2 md:grid md:grid-cols-3 lg:grid-cols-5 md:gap-4">
        { 
          stores.map((item, i)=> (
            <li key={ `store_${i}`}>
              <StoreItem store={item} />
            </li>
          )) 
        } 
      </ul>
    );
  }

  return (
    <section>
      <div className="lg:container mx-auto">
        <div className="lg:flex lg:items-start lg:gap-2">

          <div className="bg-color-gray lg:rounded lg:my-2 lg:w-56">
            <div className="container-x border py-2 border-transparent">
              <h2 className="font-bold my-2">{ t('_extra.Categories') }</h2>
              { categoriesRender }
            </div>
          </div>

          <div className="flex-grow">
            <div className="container-x py-2">
              <h2 className="font-bold my-2">{ t('Recommended') }</h2>
              { storesRender }
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


