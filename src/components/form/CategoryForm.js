
import React, { useRef } from 'react';
import LoadingDialog from '../dialog/LoadingDialog';
import FormButton from './FormButton';
import FormField from './FormField';
import FormMessage from './FormMessage';
import FormSelect from './FormSelect';
import FormTextArea from './FormTextArea';
import FormPhotoField from './FormPhotoField';
import Category from '../../models/Category';
import { useCategoryTypeText } from '../../hooks/category/categoryViewHook';
import { useTranslation } from 'react-i18next';

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
    hideProductsError,
    descriptionError
  }
) {

  const nameInput = useRef(null);

  const typeInput = useRef(null);

  const hideProductsInput = useRef(null);
  
  const descriptionInput = useRef(null);

  const { t } = useTranslation();

  const typeText = useCategoryTypeText();

  function onFormSubmit(e) {
    e.preventDefault();
    if (add) {
      onSubmit(
        nameInput.current.value,
        typeInput.current.value,
        hideProductsInput.current.value,
        descriptionInput.current.value,

        {
          nameValidity: nameInput.current.validity,
          typeValidity: typeInput.current.validity,
          hideProductsValidity: hideProductsInput.current.validity,
          descriptionValidity: descriptionInput.current.validity
        }        
      );
    } else {
      onSubmit(
        nameInput.current.value,
        hideProductsInput.current.value,
        descriptionInput.current.value,
  
        {
          typeValidity: { valid: true },
          nameValidity: nameInput.current.validity,
          hideProductsValidity: hideProductsInput.current.validity,
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
          options={Category.getTypes().map(type => ({
            key: type, value: t(typeText(type))
          }))}
          />
      }

      <FormSelect 
        ref={ hideProductsInput }
        error={ hideProductsError }
        ID="hide-products-input" 
        label="_product.Hide_products" 
        required={true}
        value={category.hide_products}
        options={[
          { key: true, value: t('_extra.Yes') },
          { key: false, value: t('_extra.No') },
        ]}
        />

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
