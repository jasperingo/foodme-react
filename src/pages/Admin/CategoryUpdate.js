
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CategoryApi from '../../api/CategoryApi';
import CategoryForm from '../../components/CategoryForm';
import Loading from '../../components/Loading';
import Reload from '../../components/Reload';
import { CATEGORIES, FETCH_STATUSES, getCategoryFetchStatusAction } from '../../context/AppActions';
import { useAppContext } from '../../context/AppContext';
import { useDataRender } from '../../context/AppHooks';

export default function CategoryUpdate() {

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
    <section className="flex-grow">
      <div className="container-x">
        { 
          useDataRender(
            category, 
            categoryFetchStatus,
            ()=> <CategoryForm type={CategoryForm.UPDATE} category={category} />,
            ()=> <Loading />, 
            ()=> <Reload action={refetchCategory} />,
          )
        }
      </div>
    </section>
  );
}
