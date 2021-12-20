
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import CategoryApi from '../api/CategoryApi';
import AdminApp from '../apps/AdminApp';
import { categoryIcon, editIcon, productIcon, storeIcon } from '../assets/icons';
import AddButton from '../components/AddButton';
import CategoryItem from '../components/CategoryItem';
import Loading from '../components/Loading';
import ProfileDetails from '../components/ProfileDetails';
import ProfileHeader from '../components/ProfileHeader';
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

  const topLinks = [];

  if (category !== null && appType === AdminApp.TYPE) {
    topLinks.push({
      href: `/category/${category.id}/update`,
      title: '_extra.Edit',
      icon: editIcon
    });
  }

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
                <ProfileHeader 
                  photo={`/photos/category/${category.photo}`}
                  name={category.name}
                  links={topLinks}
                  />
                
                <ProfileDetails
                  details={[
                    {
                      icon: (category.type === 'product') ? productIcon : storeIcon,
                      data: (category.type === 'product') ? t('_product.product__Count', { count : parseInt(category.products_count) }) : t('_store.store__Count', { count : parseInt(category.stores_count) })
                    },
                    {
                      icon: categoryIcon,
                      data: t('_category.sub_category__Count', { count: category.sub_categories.length })
                    }
                  ]}
                  />

                <div>
                  {
                    appType === AdminApp.TYPE && <AddButton text="_category.Add_sub_category" href={`/sub-category/add?category=${category.id}`} />
                  }
                  <ul className="category-list">
                    {
                      category.sub_categories.map((item, i)=> <CategoryItem key={`sub-category-${item.id}`} category={item} index={i} sub={true} appType={appType} />)
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
