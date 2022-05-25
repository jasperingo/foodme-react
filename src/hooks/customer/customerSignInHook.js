import { useState, useMemo } from 'react';
import { CUSTOMER } from '../../context/actions/customerActions';
import CustomerRepository from '../../repositories/CustomerRepository';
import { useAppContext } from '../contextHook';
import { useCustomerAuthSet } from './customerAuthStorageHook';

export function useCustomerSignIn() {

  const { 
    customer: { dispatch } 
  } = useAppContext();

  const setAuthToken = useCustomerAuthSet();

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  const [formError, setFormError] = useState(null);

  const api = useMemo(function() { return new CustomerRepository(); }, []);

  async function onSubmit(email, password, emailValidity, passwordValidity) {
    
    if (loading) return;

    if (!window.navigator.onLine) {
      setFormError('_errors.No_netowrk_connection');
      return;
    }

    if (!emailValidity.valid || !passwordValidity.valid) {
      setFormError('_errors.Credentials_are_incorrect');
      return;
    }

    setLoading(true);
    
    setFormError(null);

    try {
      
      const res = await api.auth({
        email: email,
        password: password,
        password_confirmation: password
      });

      if (res.status === 200) {

        setAuthToken(res.body.data.customer.id, res.body.data.api_token.token);
        
        dispatch({
          type: CUSTOMER.AUTHED, 
          payload: { 
            customer: res.body.data.customer, 
            token: res.body.data.api_token.token
          }
        });

        setSuccess(true);
        
      } else if (res.status === 401 || res.status === 403) {
        setFormError(res.body.message);
      } else {
        throw new Error();
      }

    } catch (error) {
      setFormError('_errors.Something_went_wrong');
    } finally {
      setLoading(false);
    }
  }

  return [onSubmit, loading, success, formError];
}
