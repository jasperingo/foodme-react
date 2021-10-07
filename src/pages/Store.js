
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, Route, Switch, useParams, useRouteMatch } from 'react-router-dom';
import Loading from '../components/Loading';
import SubHeader from '../components/SubHeader';
import { API_URL } from '../context/AppContext';
import LocationIcon from '../icons/LocationIcon';
import ReviewIcon from '../icons/ReviewIcon';
import PhoneIcon from '../icons/PhoneIcon';
import EmailIcon from '../icons/EmailIcon';
import CategoriesIcon from '../icons/CategoriesIcon';
import ProductItem from '../components/ProductItem';
import Reload from '../components/Reload';
import EmptyList from '../components/EmptyList';


const PROFILE_NAV_LINKS = [
  { title : '_product.Products', href: 'products' },
  { title : '_extra.Reviews', href: 'reviews' },
  { title : '_store.Promotions', href: 'promotions' }
];


/*function StoreCategoriesItem({ category, action, isActive }) {

  let color = isActive ? 'bg-color-primary text-white hover:bg-yellow-300' : 'bg-color text-color-gray hover:bg-color-gray-h';

  return (
    <li>
      <button 
        onClick={ ()=> action(category) }
        className={ `block ${color} px-2 py-1 rounded` }
        >
        { category.name }
      </button>
    </li>
  );
}

function StoreCategoriesList({ categories, onStoreCategoryClick, activeItem }) {

  const categoryItems = categories.map((cat)=> (
    <StoreCategoriesItem 
      key={ `cat_${cat.id}` }
      category={cat}
      isActive={cat.name === activeItem}
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
}*/

function StoreProductsList() {

  const { ID } = useParams();

  const [products, setProducts] = useState([]);

  const [productsFetched, setProductsFetched] = useState(products.length < 1 ? 0 : 1);

  let productsRender;

  async function fetchProducts() {
    if (productsFetched !== 0) return;
    
    try {
      let response = await fetch(`${API_URL}store-products.json?id=${ID}`);

      if (!response.ok)
        throw new Error(response.status);
      
      let data = await response.json();
      console.log(data)
      setProducts(data.data);
      setProductsFetched(1);

    } catch (err) {
      setProductsFetched(-1);
    }
  }

  function refetchProducts() {
    setProductsFetched(0);
    fetchProducts();
  }

  useEffect(fetchProducts);

  if (productsFetched === 0) {
    productsRender = <Loading />;
  } else if (productsFetched === -1) {
    productsRender = <Reload action={refetchProducts} />;
  } else if (productsFetched === 1 && products.length === 0) {
    productsRender = <EmptyList text="_empty.No_product" Icon={CategoriesIcon} />;
  } else {
    productsRender = (
      <ul className="py-2 md:grid md:grid-cols-3 lg:grid-cols-5 md:gap-4">
        { 
          products.map((p)=> (
            <ProductItem
              key={`prod_${p.id}`}
              prod={p}
              />
          ))
        }
      </ul>
    );
  }

  return (
    <div>
      <div className="container mx-auto px-2">
        { productsRender }
      </div>
    </div>
  );
}

function StoreProfileNavItem({ title, href }) {

  const match = useRouteMatch();

  const { t } = useTranslation();

  return (
    <li>
      <NavLink 
        to={`${match.url}/${href}`}
        className="block px-2 py-1 rounded bg-color text-color-gray hover:bg-color-gray-h"
        activeClassName="bg-color-primary text-white hover:bg-yellow-300"
        >
        { t(title) }
      </NavLink>
    </li>
  );
}

function StoreProfileItem({ Icon, data }) {
  return (
    <li className="inline-flex">
      <div className="bg-color-gray text-color flex items-center px-2 py-1 rounded mr-2 mb-2">
        <Icon classList="fill-current inline-block w-5 h-5 " />
        <span className="inline-block ml-1 text-sm">{ data }</span>
      </div>
    </li>
  );
}

function StoreProfile({ storeData }) {
  return (
    <>

      <div className="flex items-center mb-2">
        <img 
          src={ `/photos/${storeData.logo}` } 
          alt={ storeData.name } 
          className="w-10 h-10 md:w-16 md:h-16 border rounded-full" 
          />
        <h4 className="font-bold ml-2 md:text-xl">{ storeData.name }</h4> 
      </div>

      <ul className="pt-3">

        <StoreProfileItem Icon={LocationIcon} data={ storeData.address } />

        <StoreProfileItem Icon={PhoneIcon} data={ storeData.phone } />

        <StoreProfileItem Icon={EmailIcon} data={ storeData.email } />

        <StoreProfileItem Icon={CategoriesIcon} data={ storeData.category } />

        <StoreProfileItem Icon={ReviewIcon} data={ storeData.rating } />

      </ul>

      <ul className="flex my-2 gap-1">
        {
          PROFILE_NAV_LINKS.map((item, i)=> (
            <StoreProfileNavItem 
              key={ `nav_item_${i}` }
              title={item.title}
              href={item.href}
              />
          ))
        }
      </ul>

    </>
  );
}

export default function Store() {

  const { ID } = useParams();

  const match = useRouteMatch();

  const { t } = useTranslation();

  const [profile, setProfile] = useState(null);

  const [profileFetched, setProfileFetched] = useState(!profile ? 0 : 1);

  let profileRender;
  
  /*function fetchStoreProducts() {
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
        
          setStoreCategories(data.data);

          fetchStoreProducts();
        });
  }*/

  async function fetchProfile() {
    if (profileFetched !== 0) return;
    
    try {
      let response = await fetch(`${API_URL}store.json?id=${ID}`);

      if (!response.ok)
        throw new Error(response.status);
      
      let data = await response.json();

      setProfile(data.data);
      setProfileFetched(1);

    } catch (err) {
      setProfileFetched(-1);
    }
  }

  function refetchProfile() {
    setProfileFetched(0);
    fetchProfile();
  }

  useEffect(fetchProfile);

  if (profileFetched === 0) {
    profileRender = <Loading />;
  } else if (profileFetched === -1) {
    profileRender = <Reload action={refetchProfile} />;
  } else {
    profileRender = <StoreProfile storeData={profile} />;
  }

  return (
    <section>

      <SubHeader title={ t('_store.Store') } />

      <div>
        <div className="container-x">
          { profileRender }
        </div>
      </div>

      {
        profile && 
        <Switch>
          <Route path={`${match.url}/products`}>
            <StoreProductsList />
          </Route>
          <Route path={`${match.url}/reviews`}>
            <div className="container-x">REVIEWS LOADING...</div>
          </Route>
          <Route path={`${match.url}/promotions`}>    
          <div className="container-x">PROMOTIONS LOADING...</div>
          </Route>
        </Switch>
      }

      { /*
        storeData ? 
          storeCategories ? 
            <StoreCategoriesList 
              categories={storeCategories} 
              activeItem={activeCategory}
              onStoreCategoryClick={onStoreCategoryClick} 
              /> 
          : <Loading /> 
        : ''
      */}

      {/*
        storeData && storeCategories ?
          storeProducts ? 
            <StoreProductsList products={storeProducts} />
          : <Loading /> 
        : ''
      */}
      
    </section>
  );
}

