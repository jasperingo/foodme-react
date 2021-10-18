
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { API_URL, useAppContext } from '../context/AppContext';
import { FETCH_STATUSES, HOME } from '../context/AppActions';
import { useCategoryColor, useListRender, useHasMoreToFetchViaScroll } from '../context/AppHooks';
import Reload from '../components/Reload';
import Loading from '../components/Loading';
import StoreItem from '../components/StoreItem';
import CategoriesIcon from '../icons/CategoriesIcon';
import StoreIcon from '../icons/StoreIcon';
import EmptyList from '../components/EmptyList';
import FetchMoreButton from '../components/FetchMoreButton';

const getCategoriesFetchStatusAction = (payload) => ({
  type: HOME.CATEGORIES_FETCH_STATUS_CHANGED,
  payload
});

const getsStoresFetchStatusAction = (payload) => ({
  type: HOME.STORES_FETCH_STATUS_CHANGED,
  payload
});

function CategoryItem({ category, index }) {

  const iconColor = useCategoryColor(index);

  const path = category.type === 'product' ? 'products' : 'stores';

  return (
    <li className="lg:mb-2">
      <Link 
        to={`/search/${path}?q=${category.name}&category=${category.name}`}
        className={`block bg-color dark:bg-color-d hover:bg-color-gray-h shadow-lg px-2 py-3 rounded text-center ${iconColor} lg:flex lg:text-left lg:gap-1`}
        >
        <CategoriesIcon classList="fill-current mx-auto" />
        <div className="flex-grow text-sm break-all">{ category.name }</div>
      </Link>
    </li>
  );
}

export default function Home() {

  const { t } = useTranslation();

  const { home: {
    categories: {
      categories,
      categoriesFetchStatus
    },
    stores: {
      stores,
      storesFetchStatus,
      storesPage,
      storesNumberOfPages
    }
  }, homeDispatch } = useAppContext();
  
  useEffect(()=> {
    async function fetchCategories() {

      if (categoriesFetchStatus !== FETCH_STATUSES.LOADING) 
        return;
      
      try {
        let response = await fetch(`${API_URL}category.json`);

        if (!response.ok)
          throw new Error(response.status);
        
        let data = await response.json();

        //data.data = [];

        homeDispatch({
          type: HOME.CATEGORIES_FETCHED,
          payload: data.data
        });
        
      } catch (err) {
        homeDispatch(getCategoriesFetchStatusAction(FETCH_STATUSES.ERROR));
      }
    }

    fetchCategories(); 

  }, [categoriesFetchStatus, homeDispatch]);

  function refetchCategories() {
    if (categoriesFetchStatus === FETCH_STATUSES.LOADING) 
      return;

    homeDispatch(getCategoriesFetchStatusAction(FETCH_STATUSES.LOADING));
  }
  

  useEffect(()=> {
    async function fetchStores() {
      
      if (storesFetchStatus !== FETCH_STATUSES.LOADING) 
        return;
      
      try {
        let response = await fetch(`${API_URL}stores.json`);
        
        if (!response.ok)
          throw new Error(response.status);
        
        let data = await response.json();

        //data.data = [];
        //data.total_pages = 0;
        
        homeDispatch({
          type: HOME.STORES_FETCHED,
          payload: {
            stores: data.data,
            storesNumberOfPages: data.total_pages
          }
        });
        
      } catch (err) {
        homeDispatch(getsStoresFetchStatusAction(FETCH_STATUSES.ERROR));
      }
    }

    fetchStores(); 

  }, [storesFetchStatus, homeDispatch]);

  function refetchStores() {
    
    if (storesFetchStatus === FETCH_STATUSES.LOADING) 
      return;

    homeDispatch(getsStoresFetchStatusAction(FETCH_STATUSES.LOADING));
  }

  return (
    <section>
      <div className="lg:container mx-auto">
        <div className="lg:flex lg:items-start lg:gap-2">

          <div className="bg-color-gray lg:rounded lg:my-2 lg:w-56">
            <div className="container-x border pt-2 pb-4 border-transparent">
              <h2 className="font-bold my-2">{ t('_extra.Categories') }</h2>
              <ul className="grid gap-4 grid-cols-3 lg:block">
                { 
                  useListRender(
                    categories, 
                    categoriesFetchStatus,
                    (item, i)=> (
                      <CategoryItem 
                        key={`categories-${i}`} 
                        index={i}
                        category={item} 
                        />
                    ),
                    (k)=> <li key={k} className="col-span-3"> <Loading /> </li>, 
                    (k)=> <li key={k} className="col-span-3"> <Reload action={refetchCategories} /> </li>,
                  )
                }
              </ul>
            </div>
          </div>

          <div className="flex-grow">
            <div className="container-x py-2">
              <h2 className="font-bold my-2">{ t('Recommended') }</h2>
              <InfiniteScroll 
                dataLength={stores.length}
                next={refetchStores}
                hasMore={useHasMoreToFetchViaScroll(storesPage, storesNumberOfPages, storesFetchStatus)}
                >
                <ul className="list-x">
                  { 
                    useListRender(
                      stores, 
                      storesFetchStatus,
                      (item, i)=> <li key={`store-${i}`}> <StoreItem store={item} /> </li>, 
                      (k)=> <li key={k}> <Loading /> </li>, 
                      (k)=> <li key={k}> <Reload action={refetchStores} /> </li>,
                      (k)=> <li key={k}> <EmptyList text="_empty.No_store" Icon={StoreIcon} /> </li>, 
                      (k)=> <li key={k}> <FetchMoreButton action={refetchStores} /> </li>,
                    )
                  }
                </ul>
              </InfiniteScroll>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


