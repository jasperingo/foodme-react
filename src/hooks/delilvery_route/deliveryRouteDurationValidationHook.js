
export function useDeliveryRouteDurationValidation() {

  return (minimium, maximium, minValidity, maxValidity, feeValidity, unitValidity)=> {

    let error = false;
    let minError = '';
    let maxError = '';
    let feeError = '';
    let unitError = '';

    if (!minValidity.valid) {
      error = true;
      minError = '_errors.This_field_is_required';
    }

    if (!maxValidity.valid) {
      error = true;
      maxError = '_errors.This_field_is_required';
    }

    if (!feeValidity.valid) {
      error = true;
      feeError = '_errors.This_field_is_required';
    }
    
    if (!unitValidity.valid) {
      error = true;
      unitError = '_errors.This_field_is_required';
    }

    if (!error && Number(minimium) >= Number(maximium)) {
      error = true;
      minError = '_errors.This_field_is_invalid';
    }

    return [error, minError, maxError, feeError, unitError]
  }
}
