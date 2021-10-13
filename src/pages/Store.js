
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, Route, Switch, useParams, useRouteMatch } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { API_URL, useAppContext } from '../context/AppContext';
import { FETCH_STATUSES, STORE } from '../context/AppActions';
import { useListRender, useDataRender, useHasMoreToFetchViaScroll } from '../context/AppHooks';
import Loading from '../components/Loading';
import SubHeader from '../components/SubHeader';
import LocationIcon from '../icons/LocationIcon';
import ReviewIcon from '../icons/ReviewIcon';
import PhoneIcon from '../icons/PhoneIcon';
import EmailIcon from '../icons/EmailIcon';
import FilterIcon from '../icons/FilterIcon';
import CategoriesIcon from '../icons/CategoriesIcon';
import ProductIcon from '../icons/ProductIcon';
import ProductItem from '../components/ProductItem';
import Reload from '../components/Reload';
import EmptyList from '../components/EmptyList';
import FetchMoreButton from '../components/FetchMoreButton';


const PROFILE_NAV_LINKS = [
  { title : '_product.Products', href: 'products' },
  { title : '_extra.Reviews', href: 'reviews' },
  { title : '_store.Promotions', href: 'promotions' }
];

const getStoreFetchStatusAction = (payload) => ({
  type: STORE.STORE_FETCH_STATUS_CHANGED,
  payload
});

const getProductFetchStatusAction = (payload) => ({
  type: STORE.PRODUCTS_FETCH_STATUS_CHANGED,
  payload
});

function StoreProductsList({ categories }) {

  const { ID } = useParams();

  const { store: {
    products: {
      products,
      productsFetchStatus,
      productsPage,
      productsNumberOfPages
    }
  }, storeDispatch } = useAppContext();

  useEffect(()=> {
    async function fetchProducts() {
      if (productsFetchStatus !== FETCH_STATUSES.LOADING) 
        return;
      
      try {
        let response = await fetch(`${API_URL}store-products.json?id=${ID}`);

        if (!response.ok)
          throw new Error(response.status);
        
        let data = await response.json();
        
        storeDispatch({
          type: STORE.PRODUCTS_FETCHED,
          payload: {
            products: data.data,
            productsNumberOfPages: data.total_pages
          }
        });

      } catch (err) {
        storeDispatch(getProductFetchStatusAction(FETCH_STATUSES.ERROR));
      }
    }

    fetchProducts();

  }, [ID, productsFetchStatus, storeDispatch]);

  function refetchProducts() {
    if (productsFetchStatus === FETCH_STATUSES.LOADING) 
      return;
    
    storeDispatch(getProductFetchStatusAction(FETCH_STATUSES.LOADING));
  }

  return (
    <div>
      <div className="container-x">
        <div className="flex my-4">
          <FilterIcon classList="fill-current text-color" />
          <select className="bg-color-gray ml-1 p-1 rounded">
            {
              categories.map((item, i)=> (
                <option key={i}>{ item.name }</option>
              ))
            }
          </select>
        </div>
        
        <InfiniteScroll 
          dataLength={products.length}
          next={refetchProducts}
          hasMore={useHasMoreToFetchViaScroll(productsPage, productsNumberOfPages, productsFetchStatus)}
          >
          <ul className="list-x">
            { 
              useListRender(
                products, 
                productsFetchStatus,
                (item, i)=> <li key={`prod-${i}`}> <ProductItem prod={item} /> </li>, 
                (k)=> <li key={k}> <Loading /> </li>, 
                (k)=> <li key={k}> <Reload action={refetchProducts} /> </li>,
                (k)=> <li key={k}> <EmptyList text="_empty.No_product" Icon={ProductIcon} /> </li>, 
                (k)=> <li key={k}> <FetchMoreButton action={refetchProducts} /> </li>,
              )
            }
          </ul>
        </InfiniteScroll>
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
        className="block px-2 py-1 rounded btn-color-gray"
        activeClassName="btn-color-primary"
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

  const { store: {
    store: {
      store,
      storeFetchStatus
    }
  }, storeDispatch } = useAppContext();

  useEffect(()=> {
    async function fetchStore() {
      if (storeFetchStatus !== FETCH_STATUSES.LOADING) 
        return;
      
      try {
        let response = await fetch(`${API_URL}store.json?id=${ID}`);

        if (!response.ok)
          throw new Error(response.status);
        
        let data = await response.json();
        
        storeDispatch({
          type: STORE.STORE_FETCHED,
          payload: data.data
        });

      } catch (err) {
        storeDispatch(getStoreFetchStatusAction(FETCH_STATUSES.ERROR));
      }
    }

    fetchStore();

  }, [ID, storeFetchStatus, storeDispatch]);

  function refetchStore() {
    if (storeFetchStatus === FETCH_STATUSES.LOADING) 
      return;

    storeDispatch(getStoreFetchStatusAction(FETCH_STATUSES.LOADING));
  }

  return (
    <section>

      <SubHeader title={ t('_store.Store') } />

      <div>
        <div className="container-x">
          { 
            useDataRender(
              store, 
              storeFetchStatus,
              (item, i)=> <StoreProfile storeData={store} />,
              (k)=> <Loading />, 
              (k)=> <Reload action={refetchStore} />,
            )
          }
        </div>
      </div>

      {
        store && 
        <Switch>
          <Route path={`${match.url}/products`}>
            <StoreProductsList categories={store.categories} />
          </Route>
          <Route path={`${match.url}/reviews`}>
            <div className="container-x">REVIEWS LOADING...</div>
          </Route>
          <Route path={`${match.url}/promotions`}>    
          <div className="container-x">PROMOTIONS LOADING...</div>
          </Route>
        </Switch>
      }
      
    </section>
  );
}

