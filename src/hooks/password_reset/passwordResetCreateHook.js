import { useEffect, useState } from "react";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import PasswordResetRepository from "../../repositories/PasswordResetRepository";


export function usePasswordResetCreate({ administrator, customer, store, deliveryFirm }) {

  const [data, setData] = useState(null);

  const [dialog, setDialog] = useState(false);

  const [formError, setFormError] = useState(null);

  const [formSuccess, setFormSuccess] = useState(null);

  const [fetchStatus, setFetchStatus] = useState(FETCH_STATUSES.PENDING);
  
  function onSubmit(email, name, emailValidity, nameValidity) {

    setFormError(null);
    setFormSuccess(null);

    if (!emailValidity.valid || (nameValidity && !nameValidity.valid)) {
      setFormError('_errors.Fill_form_correctly');
    } else {
      setDialog(true);
      setData((store || deliveryFirm) ? { name, administrator_email: email } : { email });
      setFetchStatus(FETCH_STATUSES.LOADING);
    }
  }

  useEffect(
    ()=> {

      if (fetchStatus === FETCH_STATUSES.LOADING) {
        
        const api = new PasswordResetRepository();

        let request;

        if (administrator) {
          request = api.createForAdministrator(data);
        } else if (store) {
          request = api.createForStore(data);
        } else if (deliveryFirm) {
          request = api.createForDeliveryFirm(data);
        } else if (customer) {
          request = api.createForCustomer(data);
        } else {
          request = Promise.reject();
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
    [data, administrator, store, deliveryFirm, customer, fetchStatus, dialog]
  );
  
  return [onSubmit, dialog, formError, formSuccess];
}
