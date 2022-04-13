
import React, { useEffect, useRef } from 'react';
import LoadingDialog from '../dialog/LoadingDialog';
import FormButton from './FormButton';
import FormField from './FormField';
import FormMessage from './FormMessage';
import FormSelect from './FormSelect';
import FormPhotoField from './FormPhotoField';
import FormTextArea from './FormTextArea';

export default function SubCategoryForm(
  { 
    add, 
    category,
    categories, 
    subCategory,
    onSubmit, 
    onPhotoChoose, 
    photoUploaded, 
    dialog, 
    formError, 
    formSuccess, 
    nameError, 
    categoryError, 
    descriptionError, 
  }
) {

  const nameInput = useRef(null);

  const categoryInput = useRef(null);

  const descriptionInput = useRef(null);

  function onFormSubmit(e) {
    e.preventDefault();

    if (add) {
      onSubmit(
        nameInput.current.value,
        categoryInput.current.value,
        descriptionInput.current.value,

        {
          nameValidity: nameInput.current.validity,
          categoryValidity: categoryInput.current.validity,
          descriptionValidity: descriptionInput.current.validity
        }
      );
    } else {
      onSubmit(
        nameInput.current.value,
        descriptionInput.current.value,

        {
          nameValidity: nameInput.current.validity,
          categoryValidity: { valid: true },
          descriptionValidity: descriptionInput.current.validity
        }
      );
    }
  }

  useEffect(
    function() {
      if (formSuccess && add) {
        nameInput.current.value =  '';
        categoryInput.current.value =  '';
        descriptionInput.current.value =  '';
      }
    }, 
    [formSuccess, add]
  );
  
  return (
    <form method="POST" action="" onSubmit={onFormSubmit} className="form-1-x" noValidate>

      <FormMessage 
        error={formError} 
        success={formSuccess} 
        /> 

      <FormPhotoField 
        alt={subCategory.name} 
        src={subCategory.photo.href} 
        onChoose={onPhotoChoose}
        uploaded={photoUploaded}
        />

      <FormField 
        ref={ nameInput }
        error={ nameError }
        ID="name-input" 
        label="_extra.Name" 
        required={true}
        value={subCategory.name}
        />

      {
        add && 
        <FormSelect 
          ref={ categoryInput }
          error={ categoryError }
          ID="category-input" 
          label="_category.Category" 
          required={true}
          value={category}
          options={categories.map(i=> ({ key: i.id, value: i.name }))}
          />
      }

      <FormTextArea 
        ref={ descriptionInput }
        error={ descriptionError }
        ID="description-input" 
        label="_extra.Description"
        value={subCategory.description}
        />

      <FormButton text="_extra.Submit" />

      { dialog && <LoadingDialog /> }

    </form>
  );
}
