
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import CategoryForm from '../../components/form/CategoryForm';
import { useCategoryCreate } from '../../hooks/category/categoryCreateHook';
import { useHeader } from '../../hooks/headerHook';

export default function CategoryAdd() {

  useHeader({ 
    title: 'Add Category - DailyNeeds',
    headerTitle: '_category.Add_category'
  });

  const history = useHistory();

  const [
    onSubmit, 
    onPhotoChoose,
    photoUploaded,  
    id,
    dialog, 
    formError, 
    formSuccess, 
    nameError, 
    typeError, 
    descriptionError
  ] = useCategoryCreate();
  
  useEffect(
    ()=> {
      if (id) {
        history.push(`/category/${id}`);
      }
    }, 
    [id, history]
  );
  
  return (
    <section>
      <div className="container-x">
        <CategoryForm 
          add={true} 
          category={{ photo: { href: '/photos/default.jpg' } }} 
          onSubmit={onSubmit}
          onPhotoChoose={onPhotoChoose}
          photoUploaded={photoUploaded}
          dialog={dialog}
          formError={formError}
          formSuccess={formSuccess}
          nameError={nameError}
          typeError={typeError} 
          descriptionError={descriptionError}
          />
      </div>
    </section>
  );
}
