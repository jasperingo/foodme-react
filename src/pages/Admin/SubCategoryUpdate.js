
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SubCategoryApi from '../../api/SubCategoryApi';
import Loading from '../../components/Loading';
import Reload from '../../components/Reload';
import SubCategoryForm from '../../components/SubCategoryForm';
import { CATEGORIES, FETCH_STATUSES, getSubCategoryFetchStatusAction } from '../../context/AppActions';
import { useAppContext } from '../../context/AppContext';
import { useDataRender } from '../../context/AppHooks';

export default function SubCategoryUpdate() {
  
  const cID = parseInt(useParams().ID);

  const { 
    categories: {
      subCategory: {
        subCategory,
        subCategoryFetchStatus
      },
    }, 
    categoriesDispatch
  } = useAppContext();

  useEffect(()=> {
    if (subCategory !== null && cID !== subCategory.id) {
      categoriesDispatch({ type: CATEGORIES.SUB_UNFETCH });
    } else if (subCategoryFetchStatus === FETCH_STATUSES.LOADING) {
      const api = new SubCategoryApi();
      api.get(cID, categoriesDispatch);
    }
  }, [cID, subCategory, subCategoryFetchStatus, categoriesDispatch]);

  function refetchCategory() {
    if (subCategoryFetchStatus !== FETCH_STATUSES.LOADING) 
      categoriesDispatch(getSubCategoryFetchStatusAction(FETCH_STATUSES.LOADING));
  }

  return (
    <section className="flex-grow">
      <div className="container-x">
        { 
          useDataRender(
            subCategory, 
            subCategoryFetchStatus,
            ()=> <SubCategoryForm type={SubCategoryForm.UPDATE} category={subCategory} />,
            ()=> <Loading />, 
            ()=> <Reload action={refetchCategory} />,
          )
        }
      </div>
    </section>
  );
}
