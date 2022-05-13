
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import CategoryForm from '../../components/form/CategoryForm';
import Loading from '../../components/Loading';
import NotFound from '../../components/NotFound';
import Reload from '../../components/Reload';
import { useCategoryFetch } from '../../hooks/category/categoryFetchHook';
import { useHeader } from '../../hooks/headerHook';
import { useCategoryUpdate } from '../../hooks/category/categoryUpdateHook';
import NetworkErrorCodes from '../../errors/NetworkErrorCodes';
import { useCategoryPhotoUpdate } from '../../hooks/category/categoryPhotoUpdateHook';

export default function CategoryUpdate() {

  const { ID } = useParams();

  const [
    fetchCategory,
    category,
    categoryLoading,
    categoryError,
    categoryID,
    unfetchCategory
  ] = useCategoryFetch();

  useHeader({ 
    title: `${category?.name ?? 'Loading...'} - Category`,
    headerTitle: '_category.Edit_category'
  });

  const [
    onSubmit, 
    loading, 
    success, 
    setSuccess,
    formError, 
    formSuccess, 
    nameError, 
    typeError, 
    hideProductsError,
    descriptionError
  ] = useCategoryUpdate();

  const [
    submitPhoto,
    photo,
    setPhoto,
    photoLoading,
    photoUploaded,
    photoFormError
  ] = useCategoryPhotoUpdate();

  useEffect(
    function() {
      if ((category !== null || categoryError !== null) && categoryID !== ID) 
        unfetchCategory();
      else if (category === null && categoryError === null)
        fetchCategory(ID);
    },
    [ID, category, categoryError, categoryID, fetchCategory, unfetchCategory]
  );

  useEffect(
    function() {
      if (success && photo !== null && !photoUploaded && photoFormError === null)
        submitPhoto(ID, true);
      else if (success) 
        setSuccess(false);
    }, 
    [ID, success, photo, photoUploaded, photoFormError, submitPhoto, setSuccess]
  );

  return (
    <section>
      <div className="container-x">
        {
          category !== null && 
          <CategoryForm 
            add={false} 
            category={category} 
            onSubmit={onSubmit}
            onPhotoChoose={setPhoto}
            photoUploaded={photoUploaded}
            dialog={loading || photoLoading}
            formError={formError || photoFormError}
            formSuccess={formSuccess}
            nameError={nameError}
            typeError={typeError} 
            hideProductsError={hideProductsError}
            descriptionError={descriptionError}
            />
        }

        { categoryLoading && <Loading /> }

        { categoryError === NetworkErrorCodes.NOT_FOUND && <NotFound /> }

        { categoryError === NetworkErrorCodes.UNKNOWN_ERROR && <Reload action={()=> fetchCategory(ID)} /> }

        { categoryError === NetworkErrorCodes.NO_NETWORK_CONNECTION && <Reload message="_errors.No_netowrk_connection" action={()=> fetchCategory(ID)} /> }

      </div>
    </section>
  );
}
