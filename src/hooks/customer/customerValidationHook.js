
export function useCustomerUpdateValidation() {

  return function({ firstNameValidity, lastNameValidity, emailValidity, phoneValidity }) {

    let error = false;
    let firstNameError = '';
    let lastNameError = '';
    let emailError = '';
    let phoneError = '';
    
    if (!firstNameValidity.valid) {
      error = true;
      firstNameError = '_errors.This_field_is_required';
    }

    if (!lastNameValidity.valid) {
      error = true;
      lastNameError = '_errors.This_field_is_required';
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

    return [error, firstNameError, lastNameError, emailError, phoneError];
  }
}

export function useCustomerCreateValidation() {

  const validator = useCustomerUpdateValidation();

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
