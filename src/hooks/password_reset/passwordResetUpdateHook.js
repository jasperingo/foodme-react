import { useMemo, useState } from "react";
import PasswordResetRepository from "../../repositories/PasswordResetRepository";

export function usePasswordResetUpdate() {

  const [loading, setLoading] = useState(false);

  const [formError, setFormError] = useState(null);

  const [formSuccess, setFormSuccess] = useState(null);

  const api = useMemo(function() { return new PasswordResetRepository(); }, []);
  
  async function onSubmit(token, password, passwordValidity) {

    if (loading) return;
    
    if (!window.navigator.onLine) {
      setFormError('_errors.No_netowrk_connection');
      return;
    }

    setFormError(null);
    setFormSuccess(null);
    
    if (!passwordValidity.valid) {
      if (passwordValidity.tooShort) 
        setFormError('_errors.Password_must_be_a_minimium_of_5_characters');
      else 
        setFormError('_errors.This_field_is_required');

      return;
    } 

    setLoading(true);

    try {

      const res = await api.update({ 
        token,
        password,
        password_confirmation: password
      });
  
      if (res.status === 200) {

        setFormSuccess('_user._reset_password_success');

      } else if (res.status === 400) {
        
        if (res.body.data[0].name === 'token')
          setFormError('_user._reset_password_token_invalid');
        else
          setFormError(res.body.data[0].message);
        
      } else {
        throw new Error();
      }

    } catch {
      setFormError('_errors.Something_went_wrong');
    } finally {
      setLoading(false);
    }
  }
  
  return [onSubmit, loading, formError, formSuccess];
}
