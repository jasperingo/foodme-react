
export function useDeliveryFirmUpdateValidation() {

  return function({ nameValidity, emailValidity, phoneValidity }) {

    let error = false;
    let nameError = '';
    let emailError = '';
    let phoneError = '';
    
    if (!nameValidity.valid) {
      error = true;
      nameError = '_errors.This_field_is_required';
    }

    if (!emailValidity.valid) {
      error = true;
      if (emailValidity.typeMismatch)
        emailError = '_errors.This_field_is_invalid';
      else
        emailError = '_errors.This_field_is_required';
    }
    
    if (!phoneValidity.valid) {
      error = true;
      phoneError = '_errors.This_field_is_required';
    }

    return [error, nameError, emailError, phoneError];
  }
}

export function useDeliveryFirmCreateValidation() {

  const validator = useDeliveryFirmUpdateValidation();

  return function(validity) {

    const result = validator(validity);

    let error = result[0];

    let passwordError = '';
    
    if (!validity.passwordValidity.valid) {
      error = true;
      
      if (validity.passwordValidity.tooShort) 
        passwordError = '_errors.Password_must_be_a_minimium_of_5_characters';
      else 
        passwordError = '_errors.This_field_is_required';
    }

    return [error, ...result.slice(1), passwordError];
  }
}
