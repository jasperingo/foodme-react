

export function useAddressValidation() {

  return function(titleValidity, streetValidity, stateValidity, cityValidity, typeValidity) {
    
    let error = false;
    let titleError = '';
    let streetError = '';
    let stateError = '';
    let cityError = '';
    let typeError = '';
    
    if (!titleValidity.valid) {
      error = true;
      titleError = '_errors.This_field_is_required';
    }

    if (!streetValidity.valid) {
      error = true;
      streetError = '_errors.This_field_is_required';
    }

    if (!stateValidity.valid) {
      error = true;
      stateError = '_errors.This_field_is_required';
    }

    if (!cityValidity.valid) {
      error = true;
      cityError = '_errors.This_field_is_required';
    }

    if (!typeValidity.valid) {
      error = true;
      typeError = '_errors.This_field_is_required';
    }

    return [error, titleError, streetError, stateError, cityError, typeError];
  }
}
