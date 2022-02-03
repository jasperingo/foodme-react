import { useEffect, useState } from "react";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import PasswordResetRepository from "../../repositories/PasswordResetRepository";


export function usePasswordResetUpdate() {

  const [data, setData] = useState(null);

  const [dialog, setDialog] = useState(false);

  const [formError, setFormError] = useState(null);

  const [formSuccess, setFormSuccess] = useState(null);

  const [fetchStatus, setFetchStatus] = useState(FETCH_STATUSES.PENDING);
  
  function onSubmit(token, password, passwordValidity) {

    setFormError(null);
    setFormSuccess(null);
    
    if (!passwordValidity.valid) {
      if (passwordValidity.tooShort) 
        setFormError('_errors.Password_must_be_a_minimium_of_5_characters');
      else 
        setFormError('_errors.This_field_is_required');
    } else {
      setDialog(true);
      setData({ 
        token,
        password,
        password_confirmation: password
      });
      setFetchStatus(FETCH_STATUSES.LOADING);
    }
  }

  useEffect(
    ()=> {

      if (fetchStatus === FETCH_STATUSES.LOADING) {
        
        const api = new PasswordResetRepository();

        api.update(data)
        .then(res=> {
  
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
  
        })
        .catch(()=> {
          setFormError('_errors.Something_went_wrong');
        })
        .finally(()=> {
          setFetchStatus(FETCH_STATUSES.PENDING);
        });
        
      } else if (dialog !== false) {
        setDialog(false);
      }
    }, 
    [data, fetchStatus, dialog]
  );
  
  return [onSubmit, dialog, formError, formSuccess];
}

