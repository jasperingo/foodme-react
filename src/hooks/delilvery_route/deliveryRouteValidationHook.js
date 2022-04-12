
export function useDeliveryRouteValidation() {

  return function({ stateValidity, cityValidity, doorDeliveryValidity }) {

    let error = false;
    let stateError = '';
    let cityError = '';
    let doorDeliveryError = '';
    
    if (!stateValidity.valid) {
      error = true;
      stateError = '_errors.This_field_is_required';
    }

    if (!cityValidity.valid) {
      error = true;
      cityError = '_errors.This_field_is_required';
    }
    
    if (!doorDeliveryValidity.valid) {
      error = true;
      doorDeliveryError = '_errors.This_field_is_required';
    }

    return [error, stateError, cityError, doorDeliveryError];
  }
}
