
import React from 'react'
import SubCategoryForm from '../../components/form/SubCategoryForm';
import Loading from '../../components/Loading';
import Reload from '../../components/Reload';
import { useProductCategoryList } from '../../hooks/category/productCategoryListHook';
import { useStoreCategoryList } from '../../hooks/category/storeCategoryListHook';
import { useSubCategoryCreate } from '../../hooks/category/subCategoryCreateHook';
import { useHeader } from '../../hooks/headerHook';
import { useRenderOnDataFetched, useURLQuery } from '../../hooks/viewHook';

export default function SubCategoryAdd() {

  useHeader({ 
    title: 'Add Sub Category - DailyNeeds',
    headerTitle: '_category.Add_sub_category'
  });

  const category = useURLQuery().get('category_id');

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
    refetchStores();
    refetchProducts();
  }

  const [
    onSubmit, 
    onPhotoChoose,
    photoUploaded, 
    dialog, 
    formError, 
    formSuccess, 
    nameError, 
    categoryError,
    descriptionError
  ] = useSubCategoryCreate();

  return (
    <section>
      <div className="container-x">
        {
          useRenderOnDataFetched(
            [storesFetchStatus, productsFetchStatus],
            ()=> (
              <SubCategoryForm 
                add={true}
                category={category}
                categories={stores.concat(products)}
                subCategory={{ photo: { href: '/photos/default.jpg' } }}
                onSubmit={onSubmit}
                onPhotoChoose={onPhotoChoose}
                photoUploaded={photoUploaded}
                dialog={dialog}
                formError={formError}
                formSuccess={formSuccess}
                nameError={nameError}
                categoryError={categoryError}  
                descriptionError={descriptionError}
                />
            ),
            ()=> <Loading />,
            ()=> <Reload action={retryLoad} />
          )
        }
      </div>
    </section>
  );
}
