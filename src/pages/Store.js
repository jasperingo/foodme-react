
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

function StoreCategoriesList({ categories, onStoreCategoryClick }) {

  const categoryItems = categories.map((cat)=> (
    <StoreCategoriesItem 
      key={ `cat_${cat.id}` }
      category={cat}
      action={onStoreCategoryClick} 
      />
  ));

  return (
    <div className="border-b">

      <div className="container mx-auto px-2">

        <ul className="flex my-2">
          { categoryItems }
        </ul>

      </div>

    </div>
  );
}

function StoreProductsList({ products }) {

  return (
    <div>

      <div className="container mx-auto px-2">

        <ul>
          <li>A product</li>
        </ul>

      </div>

    </div>
  );
}

function StoreDataContainer({ storeData }) {

  return (
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

      </div>

    </div>
  );
}

export default function Store() {

  const { t } = useTranslation();

  const [storeData, setStoreData] = useState(null);

  const [storeCategories, setStoreCategories] = useState(null);

  const [storeProducts, setStoreProducts] = useState(null);

  let { ID } = useParams();

  let headerTitle = (storeData && storeData.name) || t('Store_name');
  
  function fetchStoreProducts() {
    if (!storeProducts) 
      fetch(`${API_URL}store-products.json?id=${ID}`)
        .then(response => response.json())
        .then(data => setStoreProducts(data.data));
  }

  function fetchStoreCategories() {
    if (!storeCategories) 
      fetch(`${API_URL}store-category.json?id=${ID}`)
        .then(response => response.json())
        .then(data => { 
          data.data.unshift({
            id: 0,
            name: 'All'
          });
        
          setStoreCategories(data.data);

          fetchStoreProducts();
        });
  }

  function fetchStoreData() {
    if (!storeData) 
      fetch(`${API_URL}store.json?id=${ID}`)
        .then(response => response.json())
        .then(data => {
          setStoreData(data.data);
          fetchStoreCategories();
        });
  }

  useEffect(fetchStoreData);

  function onStoreCategoryClick(category) {

  }


  return (
    <section>

      <SubHeader title={ headerTitle } />

      { storeData ? <StoreDataContainer storeData={storeData} /> : <Loading /> }

      { 
        storeData ? 
          storeCategories ? 
            <StoreCategoriesList 
              categories={storeCategories} 
              onStoreCategoryClick={onStoreCategoryClick} 
              /> 
          : <Loading /> 
        : ''
      }

      {
        storeData && storeCategories ?
          storeProducts ? 
            <StoreProductsList />
          : <Loading /> 
        : ''
      }
      
    </section>
  );
}

