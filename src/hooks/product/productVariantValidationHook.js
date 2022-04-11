
export function useProductVariantValidation() {

  return function({ nameValidity, priceValidity, quantityValidity, weightValidity, availableValidity }) {

    let error = false;
    let nameError = '';
    let priceError = '';
    let quantityError = '';
    let weightError = '';
    let availableError = '';
    
    if (!nameValidity.valid) {
      error = true;
      nameError = '_errors.This_field_is_required';
    }

    if (!priceValidity.valid) {
      error = true;
      priceError = '_errors.This_field_is_required';
    }
    
    if (!quantityValidity.valid) {
      error = true;
      quantityError = '_errors.This_field_is_required';
    }

    if (!weightValidity.valid) {
      error = true;
      weightError = '_errors.This_field_is_required';
    }

    if (!availableValidity.valid) {
      error = true;
      availableError = '_errors.This_field_is_required';
    }

    return [error, nameError, priceError, quantityError, weightError, availableError];
  }
}
