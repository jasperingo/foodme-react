
export function useDeliveryRouteLocationValidation() {

  return function({ stateValidity, cityValidity }) {

    let error = false;
    let stateError = '';
    let cityError = '';
    
    if (!stateValidity.valid) {
      error = true;
      stateError = '_errors.This_field_is_required';
    }

    if (!cityValidity.valid) {
      error = true;
      cityError = '_errors.This_field_is_required';
    }

    return [error, stateError, cityError];
  }
}
