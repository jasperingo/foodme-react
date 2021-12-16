
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import CategoryApi from '../../api/CategoryApi';
import AddButton from '../../components/AddButton';
import CategoryItem from '../../components/CategoryItem';
import Loading from '../../components/Loading';
import Reload from '../../components/Reload';
import { FETCH_STATUSES, getCategoriesProductFetchStatusAction, getCategoriesStoreFetchStatusAction } from '../../context/AppActions';
import { useAppContext } from '../../context/AppContext';
import { useListRender } from '../../context/AppHooks';

export default function Categories() {

  const { t } = useTranslation();

  const { 
    categories: {
      products: {
        products,
        productsFetchStatus
      },
      stores: {
        stores,
        storesFetchStatus
      }
    }, 
    categoriesDispatch
  } = useAppContext();

  useEffect(()=> {
    const api = new CategoryApi();

    if (storesFetchStatus === FETCH_STATUSES.LOADING) {
      api.getListByStore(categoriesDispatch);
    }

    if (productsFetchStatus === FETCH_STATUSES.LOADING) {
      api.getListByProduct(categoriesDispatch);
    }
  }, [storesFetchStatus, productsFetchStatus, categoriesDispatch]);

  function refetchStores() {
    if (storesFetchStatus !== FETCH_STATUSES.LOADING) 
      categoriesDispatch(getCategoriesStoreFetchStatusAction(FETCH_STATUSES.LOADING));
  }

  function refetchProducts() {
    if (productsFetchStatus !== FETCH_STATUSES.LOADING) 
      categoriesDispatch(getCategoriesProductFetchStatusAction(FETCH_STATUSES.LOADING));
  }

  return (
    <section>
      
      <div className="container-x">

        <AddButton text="_extra.Add_category" href="/category/add" />

        <div className="py-2">
          <h2 className="font-bold my-2">{ t('_store.Store_categories') }</h2>
          <ul className="category-list">
            { 
              useListRender(
                stores, 
                storesFetchStatus,
                (item, i)=> (
                  <CategoryItem 
                    key={`store-category-${i}`} 
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
          <ul className="category-list">
            { 
              useListRender(
                products, 
                productsFetchStatus,
                (item, i)=> (
                  <CategoryItem 
                    key={`product-category-${i}`} 
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
