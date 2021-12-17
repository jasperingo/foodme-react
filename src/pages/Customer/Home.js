
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { 
  FETCH_STATUSES, 
  getCategoriesListFetchStatusAction, 
  getProductsListFetchStatusAction, 
  getStoresListFetchStatusAction 
} from '../../context/AppActions';
import { useCategoryColor, useListRender } from '../../context/AppHooks';
import Reload from '../../components/Reload';
import Loading from '../../components/Loading';
import StoreItem from '../../components/StoreItem';
import EmptyList from '../../components/EmptyList';
import FetchMoreButton from '../../components/FetchMoreButton';
import ProductItem from '../../components/ProductItem';
import Icon from '@mdi/react';
import { productIcon, storeIcon } from '../../assets/icons';
import CarouselX from '../../components/CarouselX';
import CategoryApi from '../../api/CategoryApi';
import StoreApi from '../../api/StoreApi';
import ProductApi from '../../api/ProductApi';

const CAROUSEL_IMGS = [
  {
    title: 'Buy food',
    photo: '/home/burger.jpg'
  },{
    title: 'Instant delivery',
    photo: '/home/delivery.jpg'
  }, 
  {
    title: 'Buy medicine',
    photo: '/home/drugs.jpg'
  },
  {
    title: 'Buy drinks',
    photo: '/home/drink.jpg'
  }
];

function CategoryItem({ category, index }) {

  const iconColor = useCategoryColor(index);

  const iconType = category.type === 'product' ? productIcon : storeIcon;

  return (
    <li className="lg:mb-2">
      <Link 
        to={`/category/${category.id}`} 
        className={`block bg-color dark:bg-color-d hover:bg-color-gray-h shadow-lg px-2 py-3 rounded text-center ${iconColor} lg:flex lg:text-left lg:gap-2`}
        >
        <img src={`/photos/category/${category.photo}`} alt={category.name} width="100" height="100" className="w-10 h-10 block mx-auto rounded" />        
        <div className="flex flex-grow gap-1 justify-center items-center lg:justify-start">
          <div className="text-sm break-all">{ category.name }</div>
          <Icon path={iconType} className='w-4 h-4' />
        </div>
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
      storesFetchStatus
    },
    products: {
      products,
      productsFetchStatus
    }
  }, homeDispatch } = useAppContext();
  
  useEffect(()=> {
    if (categoriesFetchStatus === FETCH_STATUSES.LOADING) {
      const api = new CategoryApi();
      api.getListByRecommended(homeDispatch);
    }
  }, [categoriesFetchStatus, homeDispatch]);

  function refetchCategories() {
    if (categoriesFetchStatus !== FETCH_STATUSES.LOADING) 
      homeDispatch(getCategoriesListFetchStatusAction(FETCH_STATUSES.LOADING));
  }
  
  useEffect(()=> {
    if (storesFetchStatus === FETCH_STATUSES.LOADING) {
      const api = new StoreApi();
      api.getListByRecommended(homeDispatch);
    }
  }, [storesFetchStatus, homeDispatch]);

  function refetchStores() {
    if (storesFetchStatus !== FETCH_STATUSES.LOADING) 
      homeDispatch(getStoresListFetchStatusAction(FETCH_STATUSES.LOADING));
  }

  useEffect(()=> {
    if (productsFetchStatus === FETCH_STATUSES.LOADING) {
      const api = new ProductApi();
      api.getListByRecommended(homeDispatch);
    }
  }, [productsFetchStatus, homeDispatch]);

  function refetchProducts() {
    if (productsFetchStatus !== FETCH_STATUSES.LOADING) 
      homeDispatch(getProductsListFetchStatusAction(FETCH_STATUSES.LOADING));
  }

  return (
    <section>

      <div className="container-x">
        <CarouselX items={CAROUSEL_IMGS} />
      </div>

      <div className="lg:container mx-auto">

        <div className="lg:flex lg:items-start lg:gap-2">

          <div className="bg-color-gray lg:rounded lg:my-2 lg:w-60">
            <div className="container-x border pt-2 pb-4 border-transparent">
              <h2 className="font-bold my-2">{ t('_extra.Categories') }</h2>
              <ul className="grid gap-4 grid-cols-3 lg:block">
                { 
                  useListRender(
                    categories, 
                    categoriesFetchStatus,
                    (item, i)=> (
                      <CategoryItem 
                        key={`category-${i}`} 
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
              <h2 className="font-bold my-2">{ t('_store.Stores_on_Dailyneeds') }</h2>
              <ul className="list-x">
                { 
                  useListRender(
                    stores, 
                    storesFetchStatus,
                    (item, i)=> <li key={`store-${i}`}> <StoreItem store={item} /> </li>, 
                    (k)=> <li key={k}> <Loading /> </li>, 
                    (k)=> <li key={k}> <Reload action={refetchStores} /> </li>,
                    (k)=> <li key={k}> <EmptyList text="_empty.No_store" icon={storeIcon} /> </li>, 
                    (k)=> <li key={k}> <FetchMoreButton action={refetchStores} /> </li>,
                  )
                }
              </ul>
            </div>

            <div className="container-x py-2">
              <h2 className="font-bold my-2">{ t('_product.Products_on_Dailyneeds') }</h2>
              <ul className="list-x">
                { 
                  useListRender(
                    products, 
                    productsFetchStatus,
                    (item, i)=> <li key={`store-${i}`}> <ProductItem prod={item} /> </li>, 
                    (k)=> <li key={k}> <Loading /> </li>, 
                    (k)=> <li key={k}> <Reload action={refetchProducts} /> </li>,
                    (k)=> <li key={k}> <EmptyList text="_empty.No_store" icon={productIcon} /> </li>, 
                    (k)=> <li key={k}> <FetchMoreButton action={refetchProducts} /> </li>,
                  )
                }
              </ul>
            </div>
          </div>


        </div>
      </div>
    </section>
  );
}


