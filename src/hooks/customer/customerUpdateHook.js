import { useMemo, useState } from 'react';
import { CUSTOMER } from '../../context/actions/customerActions';
import CustomerRepository from '../../repositories/CustomerRepository';
import { useAppContext } from '../contextHook';

export function useCustomerUpdate() {

  const { 
    customer: { 
      dispatch,
      customer: {
        customer: {
          customer,
          customerToken
        }
      } 
    } 
  } = useAppContext();

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  const [formError, setFormError] = useState(null);

  const [formSuccess, setFormSuccess] = useState(null);

  const [firstNameError, setFirstNameError] = useState('');

  const [lastNameError, setLastNameError] = useState('');

  const [emailError, setEmailError] = useState('');

  const [phoneError, setPhoneError] = useState('');

  const api = useMemo(function() { return new CustomerRepository(customerToken); }, [customerToken]);
  
  async function onSubmit(
    firstName, 
    lastName, 
    email, 
    phone_number,

    firstNameValidity, 
    lastNameValidity, 
    emailValidity, 
    phoneValidity
  ) {

    if (loading) return;
    
    if (!window.navigator.onLine) {
      setFormError('_errors.No_netowrk_connection');
      return;
    }
    
    let error = false;

    setFormError(null);
    setFormSuccess(null);
    
    if (!firstNameValidity.valid) {
      error = true;
      setFirstNameError('_errors.This_field_is_required');
    } else {
      setFirstNameError('');
    }

    if (!lastNameValidity.valid) {
      error = true;
      setLastNameError('_errors.This_field_is_required');
    } else {
      setLastNameError('');
    }

    if (!emailValidity.valid) {
      error = true;
      setEmailError('_errors.This_field_is_required');
    } else {
      setEmailError('');
    }

    if (!phoneValidity.valid) {
      error = true;
      setPhoneError('_errors.This_field_is_required');
    } else {
      setPhoneError('');
    }
    
    if (error) return;

    setLoading(true);

    try {
      
      const res = await api.update(customer.id, {
        email,
        phone_number,
        last_name: lastName,
        first_name: firstName,
      });

      if (res.status === 200) {

        setFormSuccess(res.body.message);
        
        dispatch({
          type: CUSTOMER.FETCHED, 
          payload: { customer: res.body.data }
        });

        setSuccess(true);

      } else if (res.status === 400) {
        
        for (let error of res.body.data) {

          switch(error.name) {

            case 'first_name':
              setFirstNameError(error.message);
              break;

            case 'last_name':
              setLastNameError(error.message);
              break;

            case 'email':
              setEmailError(error.message);
                break;

            case 'phone_number':
              setPhoneError(error.message);
              break;

            default:
          }
        }

      } else {
        throw new Error();
      }

    } catch (error) {
      setFormError('_errors.Something_went_wrong');
    } finally {
      setLoading(false);
    }
  }
  
  return [
    onSubmit,
    customer, 
    loading, 
    success,
    setSuccess,
    formError, 
    formSuccess, 
    firstNameError, 
    lastNameError, 
    emailError, 
    phoneError
  ];
}
