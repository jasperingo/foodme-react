
import Icon from '@mdi/react';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import CategoryApi from '../api/CategoryApi';
import { productIcon, storeIcon } from '../assets/icons';
import Loading from '../components/Loading';
import Reload from '../components/Reload';
import { CATEGORIES, FETCH_STATUSES, getCategoryFetchStatusAction } from '../context/AppActions';
import { useAppContext } from '../context/AppContext';
import { useCategoryColor, useDataRender } from '../context/AppHooks';

function SubCategoryItem({ category, index }) {

  const { t } = useTranslation();

  const iconColor = useCategoryColor(index);

  const path = category.type === 'product' ? 'products' : 'stores';

  return (
    <li className="mb-2">
      <Link 
        to={`/search/${path}?category=${category.id}`} 
        className={ `flex gap-2 bg-color py-2 rounded md:py-3 md:shadow md:block md:text-center hover:bg-color-gray-h ${iconColor}` }
        >
        <img src={`/photos/category/${category.photo}`} alt={category.name} width="100" height="100" className="w-14 h-14 block mx-auto rounded" />
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

export default function Category() {

  const { t } = useTranslation();

  const cID = parseInt(useParams().ID);

  const { 
    categories: {
      category: {
        category,
        categoryFetchStatus
      },
    }, 
    categoriesDispatch
  } = useAppContext();

  useEffect(()=> {
    if (category !== null && cID !== category.id) {
      categoriesDispatch({ type: CATEGORIES.UNFETCH });
    } else if (categoryFetchStatus === FETCH_STATUSES.LOADING) {
      const api = new CategoryApi();
      api.get(cID, categoriesDispatch);
    }
  }, [cID, category, categoryFetchStatus, categoriesDispatch]);

  function refetchCategory() {
    if (categoryFetchStatus !== FETCH_STATUSES.LOADING) 
      categoriesDispatch(getCategoryFetchStatusAction(FETCH_STATUSES.LOADING));
  }

  return (
    <section>
       <div className="container-x">
        { 
          useDataRender(
            category, 
            categoryFetchStatus,
            ()=> (
              <>
                <div className="flex my-4 gap-2 items-center">
                  <img src={`/photos/category/${category.photo}`} alt="category" width="200" height="200" className="w-14 h-14 rounded" />
                  <div>
                    <div className="flex gap-2 items-center">
                      <h3 className="font-bold text-xl">{ category.name }</h3>
                      <Icon path={(category.type === 'product') ? productIcon : storeIcon} className="w-6 h-6" />
                    </div>
                    <div className="text-sm text-color-gray">
                      { category.stores_count && t('_store.store__Count', { count : parseInt(category.stores_count) }) }
                      { category.products_count && t('_product.product__Count', { count : parseInt(category.products_count) }) }
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-lg text-color-gray mb-1">{ t('_extra.sub_category__Count', { count: category.sub_categories.length }) }</h4>
                  <ul className="category-list">
                    {
                      category.sub_categories.map((item, i)=> <SubCategoryItem key={`sub-category-${item.id}`} category={item} index={i} />)
                    }
                  </ul>
                </div>
              </>
            ),
            ()=> <div className="container-x"> <Loading /> </div>, 
            ()=> <div className="container-x"> <Reload action={refetchCategory} /> </div>,
          )
        }
      </div>
    </section>
  );
}
