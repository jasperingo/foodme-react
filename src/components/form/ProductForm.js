
import React, { useRef } from 'react';
import LoadingDialog from '../dialog/LoadingDialog';
import FormButton from './FormButton';
import FormField from './FormField';
import FormMessage from './FormMessage';
import FormPhotoField from './FormPhotoField';
import FormSelect from './FormSelect';
import FormTextArea from './FormTextArea';

export default function ProductForm(
  { 
    categories, 
    product,
    onSubmit, 
    onPhotoChoose, 
    photoUploaded, 
    dialog, 
    formError, 
    formSuccess, 
    titleError, 
    categoryError, 
    descriptionError
  }
) {

  const titleInput = useRef(null);

  const categoryInput = useRef(null);

  const descriptionInput = useRef(null);


  function onFormSubmit(e) {
    e.preventDefault();
    onSubmit(
      titleInput.current.value,
      categoryInput.current.value,
      descriptionInput.current.value,
      
      titleInput.current.validity,
      categoryInput.current.validity,
      descriptionInput.current.validity,
    );
  }
  
  return (
    <form method="POST" action="" onSubmit={onFormSubmit} className="form-1-x" noValidate>

      <FormMessage 
        error={formError} 
        success={formSuccess} 
        /> 

      <FormPhotoField 
        alt={product.title} 
        src={product.photo.href} 
        onChoose={onPhotoChoose}
        uploaded={photoUploaded}
        />
      
      <FormField 
        ref={ titleInput }
        error={ titleError }
        ID="title-input" 
        label="_extra.Title" 
        required={true}
        value={product.title}
        />

      <FormSelect  
        ref={ categoryInput }
        error={ categoryError }
        ID="category-input" 
        label="_product.Product_category"
        required={true}
        value={product.sub_category_id}
        options={categories.flatMap(i=> i.sub_categories).map(i=> ({ key: i.id, value: i.name }))}
        />

      <FormTextArea 
        ref={ descriptionInput }
        error={ descriptionError }
        ID="description-input" 
        label="_extra.Description" 
        required={true}
        value={product.description}
        />

      <FormButton text="_extra.Submit" />

      { dialog && <LoadingDialog /> }

    </form>
  );
}

