
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import CategoryForm from '../../components/form/CategoryForm';
import { useCategoryCreate } from '../../hooks/category/categoryCreateHook';
import { useCategoryPhotoUpdate } from '../../hooks/category/categoryPhotoUpdateHook';
import { useHeader } from '../../hooks/headerHook';

export default function CategoryAdd() {

  useHeader({ 
    title: 'Add Category - DailyNeeds',
    headerTitle: '_category.Add_category'
  });

  const history = useHistory();

  const [
    onSubmit,   
    id,
    loading, 
    formError,  
    nameError, 
    typeError, 
    descriptionError
  ] = useCategoryCreate();

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
      if (id > 0 && photo !== null && !photoUploaded && photoFormError === null)
        submitPhoto(id, false);
      else if (id > 0) 
        history.push(`/category/${id}`);
    }, 
    [id, history, photo, photoUploaded, photoFormError, submitPhoto]
  );
  
  return (
    <section>
      <div className="container-x">
        <CategoryForm 
          add={true} 
          category={{ photo: { href: '/photos/default.jpg' } }} 
          onSubmit={onSubmit}
          onPhotoChoose={setPhoto}
          photoUploaded={photoUploaded}
          dialog={loading || photoLoading}
          formError={formError || photoFormError}
          nameError={nameError}
          typeError={typeError} 
          descriptionError={descriptionError}
          />
      </div>
    </section>
  );
}
