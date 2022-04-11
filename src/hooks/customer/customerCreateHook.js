import { useState, useMemo } from 'react';
import CustomerRepository from '../../repositories/CustomerRepository';
import { useCustomerCreateValidation } from './customerValidationHook';

export function useCustomerCreate() {

  const [loading, setLoading] = useState(false);

  const [formSuccess, setFormSuccess] = useState(null);

  const [formError, setFormError] = useState(null);

  const [firstNameError, setFirstNameError] = useState('');

  const [lastNameError, setLastNameError] = useState('');

  const [emailError, setEmailError] = useState('');

  const [phoneError, setPhoneError] = useState('');

  const [passwordError, setPasswordError] = useState('');

  const validator = useCustomerCreateValidation();

  const api = useMemo(function() { return new CustomerRepository(); }, []);

  async function onSubmit(firstName, lastName, email, phone, password, validity) {

    if (loading) return;
    
    if (!window.navigator.onLine) {
      setFormError('_errors.No_netowrk_connection');
      return;
    }

    setFormError(null);
    setFormSuccess(null);

    const [
      error, 
      firstNameError, 
      lastNameError, 
      emailError, 
      phoneError, 
      passwordError
    ] = validator(validity);
    
    setFirstNameError(firstNameError);
    setLastNameError(lastNameError);
    setEmailError(emailError);
    setPhoneError(phoneError);
    setPasswordError(passwordError);
    
    if (error) return;

    setLoading(true);

    try {
      
      const res = await api.create({
        email,
        password,
        phone_number: phone,
        last_name: lastName,
        first_name: firstName,
        password_confirmation: password
      });

      if (res.status === 201) {

        setFormSuccess(res.body.message);

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

            case 'password':
            case 'password_confirmation':
              setPasswordError(error.message);
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
    loading, 
    formSuccess,
    formError, 
    firstNameError, 
    lastNameError, 
    emailError, 
    phoneError, 
    passwordError
  ];
}
