
import React, { useRef } from 'react';
import LoadingDialog from '../dialog/LoadingDialog';
import FormButton from './FormButton';
import FormField from './FormField';
import FormMessage from './FormMessage';
import FormSelect from './FormSelect';
import FormTextArea from './FormTextArea';
import FormPhotoField from './FormPhotoField';

export default function CategoryForm(
  {
    category, 
    add,  
    onSubmit, 
    onPhotoChoose, 
    photoUploaded, 
    dialog, 
    formError, 
    formSuccess, 
    nameError, 
    typeError, 
    descriptionError
  }
) {

  const nameInput = useRef(null);

  const typeInput = useRef(null);
  
  const descriptionInput = useRef(null);

  function onFormSubmit(e) {
    e.preventDefault();
    if (add) {
      onSubmit(
        nameInput.current.value,
        typeInput.current.value,
        descriptionInput.current.value,

        {
          nameValidity: nameInput.current.validity,
          typeValidity: typeInput.current.validity,
          descriptionValidity: descriptionInput.current.validity
        }        
      );
    } else {
      onSubmit(
        nameInput.current.value,
        descriptionInput.current.value,
  
        {
          typeValidity: { valid: true },
          nameValidity: nameInput.current.validity,
          descriptionValidity: descriptionInput.current.validity
        }
      );
    }
  }
  
  return (
    <form method="POST" action="" onSubmit={onFormSubmit} className="form-1-x" noValidate>

      <FormMessage 
        error={formError} 
        success={formSuccess} 
        /> 

      <FormPhotoField 
        alt={category.name} 
        src={category.photo.href} 
        onChoose={onPhotoChoose}
        uploaded={photoUploaded}
        />

      <FormField 
        ref={ nameInput }
        error={ nameError }
        ID="name-input" 
        label="_extra.Name" 
        required={true}
        value={category.name}
        />

      { 
        add && 
        <FormSelect 
          ref={ typeInput }
          error={ typeError }
          ID="type-input" 
          label="_extra.Type" 
          required={true}
          value={category.type}
          options={[
            { key: 'store', value: 'Store' },
            { key: 'product', value: 'Product' }
          ]}
          />
      }

      <FormTextArea 
        ref={ descriptionInput }
        error={ descriptionError }
        ID="description-input" 
        label="_extra.Description"
        value={category.description}
        />

      <FormButton text="_extra.Submit" />

      { dialog && <LoadingDialog dialog={dialog} /> }

    </form>
  );
}
