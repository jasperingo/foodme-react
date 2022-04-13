
import React, { useEffect } from 'react'
import SubCategoryForm from '../../components/form/SubCategoryForm';
import Loading from '../../components/Loading';
import Reload from '../../components/Reload';
import NetworkErrorCodes from '../../errors/NetworkErrorCodes';
import { useProductCategoryList } from '../../hooks/category/productCategoryListHook';
import { useStoreCategoryList } from '../../hooks/category/storeCategoryListHook';
import { useSubCategoryCreate } from '../../hooks/category/subCategoryCreateHook';
import { useSubCategoryPhotoUpdate } from '../../hooks/category/subCategoryPhotoUpdateHook';
import { useHeader } from '../../hooks/headerHook';
import { useURLQuery } from '../../hooks/viewHook';

export default function SubCategoryAdd() {

  useHeader({ 
    title: 'Add Sub Category - DailyNeeds',
    headerTitle: '_category.Add_sub_category'
  });

  const [category] = useURLQuery(['category_id']);

  const [
    fetchStoreCategories, 
    stores,
    storesLoading,
    storesLoaded,
    storesError
  ] = useStoreCategoryList();

  const [
    fetchProductCategories, 
    products,
    productsLoading,
    productsLoaded,
    productsError
  ] = useProductCategoryList();

  useEffect(
    function() { 
      if (!storesLoaded && storesError === null) fetchStoreCategories(); 
      if (!productsLoaded && productsError === null) fetchProductCategories();
    },
    [storesLoaded, storesError, productsLoaded, productsError, fetchStoreCategories, fetchProductCategories]
  );

  const [
    onSubmit, 
    loading, 
    id, 
    setId,
    formError, 
    formSuccess, 
    nameError, 
    categoryError,
    descriptionError
  ] = useSubCategoryCreate();

  const [
    submitPhoto,
    photo,
    setPhoto,
    photoLoading,
    photoUploaded,
    photoFormError
  ] = useSubCategoryPhotoUpdate();

  useEffect(
    function() {
      if (id > 0 && photo !== null && !photoUploaded && photoFormError === null)
        submitPhoto(id);
      else if (id > 0) 
        setId(0);
    }, 
    [id, photo, photoUploaded, photoFormError, submitPhoto, setId]
  );

  function retryLoad() {
    if (!storesLoaded) fetchStoreCategories(); 
    if (!productsLoaded) fetchProductCategories();
  }

  return (
    <section>
      <div className="container-x">
        {
          (storesLoaded && productsLoaded) &&
          <SubCategoryForm 
            add={true}
            category={category}
            categories={stores.concat(products)}
            subCategory={{ photo: { href: '/photos/default.jpg' } }}
            onSubmit={onSubmit}
            onPhotoChoose={setPhoto}
            photoUploaded={photoUploaded}
            dialog={loading || photoLoading}
            formError={formError || photoFormError}
            formSuccess={formSuccess}
            nameError={nameError}
            categoryError={categoryError}  
            descriptionError={descriptionError}
            />
        }

        { (productsLoading || storesLoading) && <Loading /> }

        { 
          (productsError === NetworkErrorCodes.UNKNOWN_ERROR || storesError === NetworkErrorCodes.UNKNOWN_ERROR) && 
          <Reload action={retryLoad} /> 
        }

        { 
          (productsError === NetworkErrorCodes.NO_NETWORK_CONNECTION || storesError === NetworkErrorCodes.NO_NETWORK_CONNECTION) && 
          <Reload message="_errors.No_netowrk_connection" action={retryLoad} /> 
        }
      </div>
    </section>
  );
}
