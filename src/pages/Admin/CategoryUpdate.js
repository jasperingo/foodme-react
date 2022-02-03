
import React from 'react';
import CategoryForm from '../../components/form/CategoryForm';
import Forbidden from '../../components/Forbidden';
import Loading from '../../components/Loading';
import NotFound from '../../components/NotFound';
import Reload from '../../components/Reload';
import { useCategoryFetch } from '../../hooks/category/categoryFetchHook';
import { useHeader } from '../../hooks/headerHook';
import { useRenderOnDataFetched } from '../../hooks/viewHook';
import { useCategoryUpdate } from '../../hooks/category/categoryUpdateHook';

export default function CategoryUpdate() {

  const [
    category, 
    categoryFetchStatus, 
    refetch
  ] = useCategoryFetch();

  useHeader({ 
    title: `${category?.name ?? 'Loading...'} - Category`,
    headerTitle: '_category.Edit_category'
  });

  const [
    onSubmit, 
    onPhotoChoose,
    photoUploaded, 
    dialog, 
    formError, 
    formSuccess, 
    nameError, 
    typeError, 
    descriptionError
  ] = useCategoryUpdate();

  return (
    <section>
      <div className="container-x">
        {
          useRenderOnDataFetched(
            categoryFetchStatus,
            ()=> (
              <CategoryForm 
                add={false} 
                category={category} 
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
            ),
            ()=> <Loading />,
            ()=> <Reload action={refetch} />,
            ()=> <NotFound />,
            ()=> <Forbidden />,
          )
        }
      </div>
    </section>
  );
}
