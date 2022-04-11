
export function useStoreUpdateValidation() {

  return function({ nameValidity, categoryValidity, emailValidity, phoneValidity }) {

    let error = false;
    let nameError = '';
    let categoryError = '';
    let emailError = '';
    let phoneError = '';
    
    if (!nameValidity.valid) {
      error = true;
      nameError = '_errors.This_field_is_required';
    }

    if (!categoryValidity.valid) {
      error = true;
      categoryError = '_errors.This_field_is_required';
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

    return [error, nameError, categoryError, emailError, phoneError];
  }
}
