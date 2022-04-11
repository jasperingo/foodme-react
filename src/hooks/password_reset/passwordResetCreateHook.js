import { useMemo, useState } from "react";
import PasswordResetRepository from "../../repositories/PasswordResetRepository";

export function usePasswordResetCreate({ administrator, customer, store, deliveryFirm }) {

  const [loading, setLoading] = useState(false);

  const [formError, setFormError] = useState(null);

  const [formSuccess, setFormSuccess] = useState(null);

  const api = useMemo(function() { return new PasswordResetRepository(); }, []);
  
  async function onSubmit(email, name, emailValidity, nameValidity) {

    if (loading) return;
    
    if (!window.navigator.onLine) {
      setFormError('_errors.No_netowrk_connection');
      return;
    }

    setFormError(null);
    setFormSuccess(null);
    
    if (!emailValidity.valid || (nameValidity && !nameValidity.valid)) {
      setFormError('_errors.Fill_form_correctly');
      return;
    }
  
    setLoading(true);
    
    try {

      const res = await getRequest((store || deliveryFirm) ? { name, administrator_email: email } : { email });

      if (res.status === 201) {
  
        setFormSuccess('_user._forgot_password_success');

      } else if (res.status === 400) {
        
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

  function getRequest(data) {

    if (administrator) {
      return api.createForAdministrator(data);
    } else if (store) {
      return api.createForStore(data);
    } else if (deliveryFirm) {
      return api.createForDeliveryFirm(data);
    } else if (customer) {
      return api.createForCustomer(data);
    } else {
      throw new Error('User type not specified');
    }
  }
  
  return [onSubmit, loading, formError, formSuccess];
}
