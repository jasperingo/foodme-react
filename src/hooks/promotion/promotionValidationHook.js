
export function usePromotionValidation() {

  return function({ titleValidity, linkValidity, linkTypeValidity, amountValidity, durationValidity }) {
    
    let error = false;
    let titleError = '';
    let linkError = '';
    let linkTypeError = '';
    let amountError = '';
    let durationError = '';
    
    if (!titleValidity.valid) {
      error = true;
      titleError = '_errors.This_field_is_required';
    }

    if (!linkValidity.valid) {
      error = true;
      if (linkValidity.valueMissing)
        linkError = '_errors.This_field_is_required';
      else if (linkValidity.typeMismatch)
        linkError = '_errors.This_field_is_invalid';
    }

    if (!linkTypeValidity.valid) {
      error = true;
      linkTypeError = '_errors.This_field_is_required';
    }

    if (!amountValidity.valid) {
      error = true;
      amountError = '_errors.This_field_is_required';
    }

    if (!durationValidity.valid) {
      error = true;
      durationError = '_errors.This_field_is_required';
    }

    return [error, titleError, linkError, linkTypeError, amountError, durationError];
  }
}
