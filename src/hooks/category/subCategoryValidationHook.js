
export function useSubCategoryValidation() {

  return function({ nameValidity, categoryValidity, descriptionValidity }) {

    let error = false;
    let nameError = '';
    let categoryError = '';
    let descriptionError = '';
    
    if (!nameValidity.valid) {
      error = true;
      nameError = '_errors.This_field_is_required';
    }

    if (!categoryValidity.valid) {
      error = true;
      categoryError = '_errors.This_field_is_required';
    }
    
    if (!descriptionValidity.valid) {
      error = true;
      descriptionError = '_errors.This_field_is_required';
    }

    return [error, nameError, categoryError, descriptionError];
  }
}
