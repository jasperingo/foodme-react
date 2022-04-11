
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

export function useStoreCreateValidation() {

  const validator = useStoreUpdateValidation();

  return function(validity) {

    const result = validator(validity);

    let error = result[0];

    let adminEmailError = '';
    let adminPasswordError = '';
    
    if (!validity.adminEmailValidity.valid) {
      error = true;
      adminEmailError = '_errors.This_field_is_required';
    }

    if (!validity.adminPasswordValidity.valid) {
      error = true;
      
      if (validity.adminPasswordValidity.tooShort) 
        adminPasswordError = '_errors.Password_must_be_a_minimium_of_5_characters';
      else 
        adminPasswordError = '_errors.This_field_is_required';
    }

    return [error, ...result.slice(1), adminEmailError, adminPasswordError];
  }
}
