
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useAppContext, API_URL } from '../context/AppContext';
import { RESTAURANT_CATEGORIES_FETCHED, FETCH_STATUSES } from '../context/AppActions';
import { useCategoryColor, useListRender } from '../context/AppHooks';
import Reload from '../components/Reload';
import Loading from '../components/Loading';
import StoreItem from '../components/StoreItem';
import CategoriesIcon from '../icons/CategoriesIcon';
import StoreIcon from '../icons/StoreIcon';
import EmptyList from '../components/EmptyList';
import FetchMoreButton from '../components/FetchMoreButton';

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

  const [stores, setStores] = useState([FETCH_STATUSES.LOADING]);

  const [storesPage, setStoresPage] = useState(1);

  const [storesNumberOfPages, setStoresNumberOfPages] = useState(0);

  const [categoriesFetch, setCategoriesFetch] = useState(restaurantCategories.length < 1 ? 0 : 1);

  let categoriesRender;

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

  useEffect(fetchCategories);
  

  useEffect(()=> {
    async function fetchStores() {
      
      if (stores[stores.length-1] !== FETCH_STATUSES.LOADING) 
        return;
      
      try {
        let response = await fetch(`${API_URL}stores.json`);
        
        if (!response.ok)
          throw new Error(response.status);
        
        let data = await response.json();

        //data.data = [];
        //data.total_pages = 0;

        setStoresPage(s=> {
          s < data.total_pages && data.data.push(FETCH_STATUSES.MORE);
          return ++s;
        });
        
        setStores(s=> {
          s.pop();
          data.data.length < 1 && data.data.push(FETCH_STATUSES.EMPTY);
          return s.concat(data.data);
        });

        setStoresNumberOfPages(data.total_pages);

      } catch (err) {
        setStores(s=> {
          s.pop();
          return s.concat(FETCH_STATUSES.ERROR);
        });
      }
    }

    fetchStores(); 

  }, [stores]);

  function refetchStores() {
    
    if (stores[stores.length-1] === FETCH_STATUSES.LOADING) 
      return;

    if (stores[stores.length-1] === FETCH_STATUSES.ERROR)
      stores.pop();

    if (stores[stores.length-1] === FETCH_STATUSES.MORE)
      stores.pop(); 

    setStores(stores.concat(FETCH_STATUSES.LOADING));
  }

  if (categoriesFetch === 0) {
    categoriesRender = (
      <li className="col-span-3">
        <Loading />
      </li>
    );
  } else if (categoriesFetch === -1) {
    categoriesRender = (
      <li className="col-span-3">
        <Reload action={refetchCategories} />
      </li>
    );
  } else if (categoriesFetch === 1 && restaurantCategories.length === 0) {
    categoriesRender = (
      <li className="col-span-3">
        <EmptyList text="_empty.No_category" Icon={CategoriesIcon} />
      </li>
    );
  } else {
    categoriesRender = (
      restaurantCategories.map((item, i) => (
        <CategoryItem 
          key={i} 
          index={i}
          name={item.name} 
          />
      ))
    );
  }

  return (
    <section>
      <div className="lg:container mx-auto">
        <div className="lg:flex lg:items-start lg:gap-2">

          <div className="bg-color-gray lg:rounded lg:my-2 lg:w-56">
            <div className="container-x border pt-2 pb-4 border-transparent">
              <h2 className="font-bold my-2">{ t('_extra.Categories') }</h2>
              <ul className="grid gap-4 grid-cols-3 lg:block">
                { categoriesRender }
              </ul>
            </div>
          </div>

          <div className="flex-grow">
            <div className="container-x py-2">
              <h2 className="font-bold my-2">{ t('Recommended') }</h2>
              <InfiniteScroll 
                dataLength={stores.length}
                next={refetchStores}
                hasMore={
                  storesPage%5 !== 0 && 
                  storesPage <= storesNumberOfPages && 
                  stores[stores.length-1] !== FETCH_STATUSES.ERROR
                }
                >
                <ul className="list-x">
                  { 
                    useListRender(
                      stores, 
                      (item)=> <StoreItem store={item} />, 
                      ()=> <Loading />, 
                      ()=> <EmptyList text="_empty.No_store" Icon={StoreIcon} />, 
                      ()=> <Reload action={refetchStores} />,
                      ()=> <FetchMoreButton action={refetchStores} />,
                      { viewKeyPrefix: 'store' }
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


