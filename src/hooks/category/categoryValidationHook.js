
export function useCategoryValidation() {

  return function({ nameValidity, typeValidity, hideProductsValidity, descriptionValidity }) {

    let error = false;
    let nameError = '';
    let typeError = '';
    let hideProductsError = '';
    let descriptionError = '';
    
    if (!nameValidity.valid) {
      error = true;
      nameError = '_errors.This_field_is_required';
    }

    if (!typeValidity.valid) {
      error = true;
      typeError = '_errors.This_field_is_required';
    }

    if (!hideProductsValidity.valid) {
      error = true;
      hideProductsError = '_errors.This_field_is_required';
    }
    
    if (!descriptionValidity.valid) {
      error = true;
      descriptionError = '_errors.This_field_is_required';
    }

    return [error, nameError, typeError, hideProductsError, descriptionError];
  }
}
