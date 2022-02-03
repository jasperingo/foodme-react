import { useEffect, useState } from "react";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import PasswordResetRepository from "../../repositories/PasswordResetRepository";


export function usePasswordResetCreate({ administrator }) {

  const [email, setEmail] = useState(null);

  const [dialog, setDialog] = useState(false);

  const [formError, setFormError] = useState(null);

  const [formSuccess, setFormSuccess] = useState(null);

  const [fetchStatus, setFetchStatus] = useState(FETCH_STATUSES.PENDING);
  
  function onSubmit(email, emailValidity) {

    setFormError(null);
    setFormSuccess(null);
    
    if (!emailValidity.valid) {
      setFormError('_errors.This_field_is_required');
    } else {
      setDialog(true);
      setEmail({ email });
      setFetchStatus(FETCH_STATUSES.LOADING);
    }
  }

  useEffect(
    ()=> {

      if (fetchStatus === FETCH_STATUSES.LOADING) {
        
        const api = new PasswordResetRepository();

        let request;

        if (administrator) {
          request = api.createForAdministrator(email);
        } else {
          request = api.createForCustomer(email);
        }

        request
        .then(res=> {
  
          if (res.status === 201) {
  
            setFormSuccess('_user._forgot_password_success');
  
          } else if (res.status === 400) {
            
            setFormError(res.body.data[0].message);
                   
          } else {
            throw new Error();
          }
  
        })
        .catch(()=> {
          setFormError('_errors.Something_went_wrong');
        })
        .finally(()=> {
          setFetchStatus(FETCH_STATUSES.PENDING)
        });
        
      } else if (dialog !== false) {
        setDialog(false);
      }
    }, 
    [email, administrator, fetchStatus, dialog]
  );
  
  return [onSubmit, dialog, formError, formSuccess];
}
