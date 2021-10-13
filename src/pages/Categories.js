
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FETCH_STATUSES, CATEGORIES } from '../context/AppActions';
import { API_URL, useAppContext } from '../context/AppContext';
import { useCategoryColor, useListRender } from '../context/AppHooks';
import CategoriesIcon from '../icons/CategoriesIcon';
import Loading from '../components/Loading';
import Reload from '../components/Reload';

const getStoresFetchStatusAction = (payload) => ({
  type: CATEGORIES.STORES_FETCH_STATUS_CHANGED,
  payload
});

const getProductsFetchStatusAction = (payload) => ({
  type: CATEGORIES.PRODUCTS_FETCH_STATUS_CHANGED,
  payload
});

function CategoryItem({ category, index }) {

  const { t } = useTranslation();

  const iconColor = useCategoryColor(index);

  return (
    <li className="">
      <Link to={`/search?category=${category.name}`} className={ `flex gap-2 bg-color py-2 rounded md:shadow md:block md:text-center hover:bg-color-gray-h ${iconColor}` }>
        <CategoriesIcon classList="fill-current mx-auto" />
        <div className="flex-grow">
          <div className="font-bold">{ category.name }</div>
          <div className="text-sm text-color-gray">
            { category.stores_count && t('_store.store__Count', { count : parseInt(category.stores_count) }) }
            { category.products_count && t('_product.product__Count', { count : parseInt(category.products_count) }) }
          </div>
        </div>
      </Link>
    </li>
  );
}

export default function Categories() {

  const { t } = useTranslation();

  const { categories: {
    products: {
      products,
      productsFetchStatus
    },
    stores: {
      stores,
      storesFetchStatus
    }
  }, categoriesDispatch } = useAppContext();

  /*const [stores, setStores] = useState([]);

  const [products, setProducts] = useState([]);

  const [storesFetched, setStoresFetched] = useState(stores.length < 1 ? 0 : 1);

  const [productsFetched, setProductsFetched] = useState(products.length < 1 ? 0 : 1);*/

  const listStyle = "md:grid md:grid-cols-3 md:gap-4";

  useEffect(()=> {
    async function fetchStores() {

      if (storesFetchStatus !== FETCH_STATUSES.LOADING) 
        return;
      
      try {
        let response = await fetch(`${API_URL}category-store.json`);

        if (!response.ok)
          throw new Error(response.status);
        
        let data = await response.json();

        //data.data = [];

        categoriesDispatch({
          type: CATEGORIES.STORES_FETCHED,
          payload: data.data
        });
        
      } catch (err) {
        categoriesDispatch(getStoresFetchStatusAction(FETCH_STATUSES.ERROR));
      }
    }

    fetchStores(); 

  }, [storesFetchStatus, categoriesDispatch]);

  function refetchStores() {
    if (storesFetchStatus === FETCH_STATUSES.LOADING) 
      return;

    categoriesDispatch(getStoresFetchStatusAction(FETCH_STATUSES.LOADING));
  }

  useEffect(()=> {
    async function fetchProducts() {

      if (productsFetchStatus !== FETCH_STATUSES.LOADING) 
        return;
      
      try {
        let response = await fetch(`${API_URL}category-product.json`);

        if (!response.ok)
          throw new Error(response.status);
        
        let data = await response.json();

        //data.data = [];

        categoriesDispatch({
          type: CATEGORIES.PRODUCTS_FETCHED,
          payload: data.data
        });
        
      } catch (err) {
        categoriesDispatch(getProductsFetchStatusAction(FETCH_STATUSES.ERROR));
      }
    }

    fetchProducts(); 

  }, [productsFetchStatus, categoriesDispatch]);

  function refetchProducts() {
    if (productsFetchStatus === FETCH_STATUSES.LOADING) 
      return;

    categoriesDispatch(getProductsFetchStatusAction(FETCH_STATUSES.LOADING));
  }

  return (
    <section>
      <div className="container-x">
        <div className="py-2">
          <h2 className="font-bold my-2">{ t('_store.Store_categories') }</h2>
          <ul className={listStyle}>
            { 
              useListRender(
                stores, 
                storesFetchStatus,
                (item, i)=> (
                  <CategoryItem 
                    key={`categories-${i}`} 
                    index={i}
                    category={item} 
                    />
                ),
                (k)=> <li key={k} className="col-span-3"> <Loading /> </li>, 
                (k)=> <li key={k} className="col-span-3"> <Reload action={refetchStores} /> </li>,
              )
            }
          </ul>
        </div>
        <div className="py-2">
          <h2 className="font-bold my-2">{ t('_product.Product_categories') }</h2>
          <ul className={listStyle}>
            { 
              useListRender(
                products, 
                productsFetchStatus,
                (item, i)=> (
                  <CategoryItem 
                    key={`categories-${i}`} 
                    index={i}
                    category={item} 
                    />
                ),
                (k)=> <li key={k} className="col-span-3"> <Loading /> </li>, 
                (k)=> <li key={k} className="col-span-3"> <Reload action={refetchProducts} /> </li>,
              )
            }
          </ul>
        </div>
      </div>
    </section>
  );
}


