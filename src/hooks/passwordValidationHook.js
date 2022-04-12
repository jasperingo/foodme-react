

export function useUpdatePasswordValidation() {

  return function(currentPasswordValidity, newPasswordValidity) {
    
    let error = false;
    let newPasswordError = '';
    let currentPasswordError = '';

    if (!currentPasswordValidity.valid) {
      error = true;
      if (currentPasswordValidity.tooShort) 
        currentPasswordError = '_errors.Password_must_be_a_minimium_of_5_characters';
      else 
        currentPasswordError = '_errors.This_field_is_required';
    }

    if (!newPasswordValidity.valid) {
      error = true;
      if (newPasswordValidity.tooShort) 
        newPasswordError = '_errors.Password_must_be_a_minimium_of_5_characters';
      else 
        newPasswordError = '_errors.This_field_is_required';
    }

    return [error, currentPasswordError, newPasswordError];
  }
}



