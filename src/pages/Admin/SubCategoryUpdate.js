
import React from 'react';
import Forbidden from '../../components/Forbidden';
import SubCategoryForm from '../../components/form/SubCategoryForm';
import Loading from '../../components/Loading';
import NotFound from '../../components/NotFound';
import Reload from '../../components/Reload';
import { useProductCategoryList } from '../../hooks/category/productCategoryListHook';
import { useStoreCategoryList } from '../../hooks/category/storeCategoryListHook';
import { useSubCategoryFetch } from '../../hooks/category/subCategoryFetchHook';
import { useHeader } from '../../hooks/headerHook';
import { useRenderOnDataFetched } from '../../hooks/viewHook';

export default function SubCategoryUpdate() {

  const [
    subCategory, 
    subCategoryFetchStatus, 
    refetch
  ] = useSubCategoryFetch();
  
  useHeader({ 
    title: 'Edit Sub Category - DailyNeeds',
    headerTitle: '_category.Edit_sub_category'
  });

  const [
    stores, 
    storesFetchStatus, 
    refetchStores
  ] = useStoreCategoryList();

  const [
    products, 
    productsFetchStatus, 
    refetchProducts
  ] = useProductCategoryList(true);

  function retryLoad() {
    refetch();
    refetchStores();
    refetchProducts();
  }

  return (
    <section className="flex-grow">
      <div className="container-x">
        {
          useRenderOnDataFetched(
            [subCategoryFetchStatus, storesFetchStatus, productsFetchStatus]
,            ()=> (
              <SubCategoryForm 
                add={false} 
                categories={stores.concat(products)}
                subCategory={subCategory} 
                // onSubmit={onSubmit}
                // onPhotoChoose={onPhotoChoose}
                // photoUploaded={photoUploaded}
                // dialog={dialog}
                // formError={formError}
                // formSuccess={formSuccess}
                // nameError={nameError}
                // typeError={typeError} 
                // descriptionError={descriptionError}
                />
            ),
            ()=> <Loading />,
            ()=> <Reload action={retryLoad} />,
            ()=> <NotFound />,
            ()=> <Forbidden />,
          )
        }
      </div>
    </section>
  );
}
