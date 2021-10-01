
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import SubHeader from '../components/SubHeader';
import { API_URL } from '../context/AppContext';
import LocationIcon from '../icons/LocationIcon';
import ReviewIcon from '../icons/ReviewIcon';
import PhoneIcon from '../icons/PhoneIcon';
import EmailIcon from '../icons/EmailIcon';
import CategoriesIcon from '../icons/CategoriesIcon';


const FAKE_CATS = [
  {
    id: 0,
    name: 'All'
  },
  {
    id: 1,
    name: 'Soup'
  },
  {
    id: 2,
    name: 'Rice'
  },
  {
    id: 3,
    name: 'Beans'
  }
];

function StoreDataItem({ Icon, data }) {
  return (
    <li className="inline-flex">
      <div className="bg-gray-200 text-black  flex items-center px-2 py-1 rounded mr-2 mb-2">
        <Icon classList="fill-current inline-block w-5 h-5 " />
        <span className="inline-block ml-1 text-sm">{ data }</span>
      </div>
    </li>
  );
}

function StoreCategoriesItem({ category, action }) {
  return (
    <li>
      <button 
        onClick={ ()=> action(category) }
        className={ `block ${category.id === 0 ? 'bg-yellow-500' : 'bg-white'} text-gray-500 px-2 py-1 rounded hover:bg-gray-100` }
        >
        { category.name }
      </button>
    </li>
  );
}

export default function Store() {

  const { t } = useTranslation();

  const [storeData, setStoreData] = useState({});

  let { ID } = useParams();

  let headerTitle = storeData.name || t('Store_name');
  
  function fetchStoreData() {
    if (!storeData.id) 
      fetch(`${API_URL}store.json?id=${ID}`)
        .then(response => response.json())
        .then(data => setStoreData(data.data));
  }

  useEffect(fetchStoreData);

  function onStoreCategoryClick(category) {

  }

  const categoryItems = FAKE_CATS.map((cat)=> (
    <StoreCategoriesItem 
      key={ `cat_${cat.id}` }
      category={cat}
      action={onStoreCategoryClick} 
      />
  ));


  return (
    <section>

      <SubHeader title={ headerTitle } />

      <div className="border-b">

        <div className="container mx-auto px-2">

          <div className="flex items-center mb-2">
            <img 
              src={ `/photos/${storeData.logo}` } 
              alt={ storeData.name } 
              className="w-10 h-10 border rounded-full" 
              />
            <h4 className="font-bold ml-2">{ storeData.name }</h4> 
          </div>

          <ul>

            <StoreDataItem Icon={LocationIcon} data={ storeData.address } />

            <StoreDataItem Icon={PhoneIcon} data={ storeData.phone } />

            <StoreDataItem Icon={EmailIcon} data={ storeData.email } />

            <StoreDataItem Icon={CategoriesIcon} data={ storeData.category } />

            <StoreDataItem Icon={ReviewIcon} data={ storeData.rating } />

          </ul>

          <ul className="flex my-2">
            { categoryItems }
          </ul>

        </div>

      </div>

      <div>

        <div className="container mx-auto px-2">

        <Loading />

        <ul>

        </ul>

        </div>

      </div>


    </section>
  );
}

