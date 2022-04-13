
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SubCategoryForm from '../../components/form/SubCategoryForm';
import Loading from '../../components/Loading';
import NotFound from '../../components/NotFound';
import Reload from '../../components/Reload';
import NetworkErrorCodes from '../../errors/NetworkErrorCodes';
import { useSubCategoryFetch } from '../../hooks/category/subCategoryFetchHook';
import { useSubCategoryPhotoUpdate } from '../../hooks/category/subCategoryPhotoUpdateHook';
import { useSubCategoryUpdate } from '../../hooks/category/subCategoryUpdateHook';
import { useHeader } from '../../hooks/headerHook';

export default function SubCategoryUpdate() {

  const { ID } = useParams();

  const [
    fetchSubCategory,
    subCategory,
    subCategoryLoading,
    subCategoryError,
    subCategoryID,
    unfetchSubCategory
  ] = useSubCategoryFetch();
  
  useHeader({ 
    title: `${subCategory?.name ?? 'Loading...'}- DailyNeeds`,
    headerTitle: '_category.Edit_sub_category'
  });

  const [
    onSubmit, 
    loading,
    success, 
    setSuccess,
    formError, 
    formSuccess, 
    nameError, 
    descriptionError
  ] = useSubCategoryUpdate();

  
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
      if ((subCategory !== null || subCategoryError !== null) && subCategoryID !== ID) 
        unfetchSubCategory();
      else if (subCategory === null && subCategoryError === null)
        fetchSubCategory(ID);
    },
    [ID, subCategory, subCategoryError, subCategoryID, fetchSubCategory, unfetchSubCategory]
  );

  useEffect(
    function() {
      if (success && photo !== null && !photoUploaded && photoFormError === null)
        submitPhoto(ID);
      else if (success) 
        setSuccess(false);
    }, 
    [ID, success, photo, photoUploaded, photoFormError, submitPhoto, setSuccess]
  );

  return (
    <section>
      <div className="container-x">

        {
          subCategory !== null &&
          <SubCategoryForm 
            add={false}
            subCategory={subCategory} 
            onSubmit={onSubmit}
            onPhotoChoose={setPhoto}
            photoUploaded={photoUploaded}
            dialog={loading || photoLoading}
            formError={formError || photoFormError}
            formSuccess={formSuccess}
            nameError={nameError}
            descriptionError={descriptionError}
            />
        }

        { subCategoryLoading && <Loading /> }

        { subCategoryError === NetworkErrorCodes.NOT_FOUND && <NotFound /> }

        { subCategoryError === NetworkErrorCodes.UNKNOWN_ERROR && <Reload action={()=> fetchSubCategory(ID)} /> }

        { subCategoryError === NetworkErrorCodes.NO_NETWORK_CONNECTION && <Reload message="_errors.No_netowrk_connection" action={()=> fetchSubCategory(ID)} /> }


      </div>
    </section>
  );
}
