
export function useProductValidation() {

  return function({ titleValidity, categoryValidity, descriptionValidity }) {

    let error = false;
    let titleError = '';
    let categoryError = '';
    let descriptionError = '';
    
    if (!titleValidity.valid) {
      error = true;
      titleError = '_errors.This_field_is_required';
    }

    if (!categoryValidity.valid) {
      error = true;
      categoryError = '_errors.This_field_is_required';
    }
    
    if (!descriptionValidity.valid) {
      error = true;
      descriptionError = '_errors.This_field_is_required';
    }

    return [error, titleError, categoryError, descriptionError];
  }
}
