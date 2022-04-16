
export function useDeliveryRouteValidation() {

  return function({ nameValidity, doorDeliveryValidity }) {

    let error = false;
    let nameError = '';
    let doorDeliveryError = '';
    
    if (!nameValidity.valid) {
      error = true;
      nameError = '_errors.This_field_is_required';
    }
    
    if (!doorDeliveryValidity.valid) {
      error = true;
      doorDeliveryError = '_errors.This_field_is_required';
    }

    return [error, nameError, doorDeliveryError];
  }
}
