
import Icon from '@mdi/react';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import CategoryApi from '../api/CategoryApi';
import AdminApp from '../apps/AdminApp';
import { editIcon, productIcon, storeIcon } from '../assets/icons';
import AddButton from '../components/AddButton';
import CategoryItem from '../components/CategoryItem';
import Loading from '../components/Loading';
import ProfileLink from '../components/ProfileLink';
import Reload from '../components/Reload';
import { CATEGORIES, FETCH_STATUSES, getCategoryFetchStatusAction } from '../context/AppActions';
import { useAppContext } from '../context/AppContext';
import { useDataRender } from '../context/AppHooks';

export default function Category({ appType }) {

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
                  <div className="flex-grow">
                    <div className="flex gap-2 items-center">
                      <h3 className="font-bold text-xl">{ category.name }</h3>
                      <Icon path={(category.type === 'product') ? productIcon : storeIcon} className="w-6 h-6" />
                    </div>
                    <div className="text-sm text-color-gray">
                      { category.stores_count && t('_store.store__Count', { count : parseInt(category.stores_count) }) }
                      { category.products_count && t('_product.product__Count', { count : parseInt(category.products_count) }) }
                    </div>
                  </div>
                  <ul>
                    {
                      appType === AdminApp.TYPE && 
                      <ProfileLink href={`/category/${category.id}/update`} icon={editIcon} title="_extra.Edit" />
                    }
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-lg text-color-gray mb-1">{ t('_category.sub_category__Count', { count: category.sub_categories.length }) }</h4>
                  {
                    appType === AdminApp.TYPE && <AddButton text="_category.Add_sub_category" href={`/sub-category/add?category=${category.id}`} />
                  }
                  <ul className="category-list">
                    {
                      category.sub_categories.map((item, i)=> <CategoryItem key={`sub-category-${item.id}`} category={item} index={i} sub={true} />)
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
