
export function useDiscountValidation() {

  return function({ titleValidity, typeValidity, valueValidity, minAmountValidity, minQtyValidity, startDateValidity, endDateValidity }) {

    let error = false;
    let titleError = '';
    let typeError = '';
    let valueError = '';
    let minAmountError = '';
    let minQtyError = '';
    let startDateError = '';
    let endDateError = '';
    
    if (!titleValidity.valid) {
      error = true;
      titleError = '_errors.This_field_is_required';
    }

    if (!typeValidity.valid) {
      error = true;
      typeError = '_errors.This_field_is_required';
    }
    
    if (!valueValidity.valid) {
      error = true;
      valueError = '_errors.This_field_is_required';
    }

    if (!minAmountValidity.valid) {
      error = true;
      minAmountError = '_errors.This_field_is_required';
    }

    if (!minQtyValidity.valid) {
      error = true;
      minQtyError = '_errors.This_field_is_required';
    }

    if (!startDateValidity.valid) {
      error = true;
      startDateError = '_errors.This_field_is_required';
    }

    if (!endDateValidity.valid) {
      error = true;
      endDateError = '_errors.This_field_is_required';
    }

    return [
      error, 
      titleError,
      typeError,
      valueError, 
      minAmountError, 
      minQtyError, 
      startDateError, 
      endDateError
    ];
  }
}
