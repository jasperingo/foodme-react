import { useState, useMemo } from 'react';
import { CUSTOMER } from '../../context/actions/customerActions';
import CustomerRepository from '../../repositories/CustomerRepository';
import { FETCH_STATUSES } from '../../repositories/Fetch';
import { useAppContext } from '../contextHook';
import { useMessageFetch } from '../message/messageFetchHook';
import { useCustomerAuthSet } from './customerAuthStorageHook';

export function useCustomerCreate() {

  const { 
    customer: { dispatch } 
  } = useAppContext();

  const newMessage = useMessageFetch();

  const setAuthToken = useCustomerAuthSet();

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  const [formError, setFormError] = useState(null);

  const [firstNameError, setFirstNameError] = useState('');

  const [lastNameError, setLastNameError] = useState('');

  const [emailError, setEmailError] = useState('');

  const [phoneError, setPhoneError] = useState('');

  const [passwordError, setPasswordError] = useState('');

  const api = useMemo(function() { return new CustomerRepository(); }, []);

  async function onSubmit(
    firstName, 
    lastName, 
    email, 
    phone, 
    password, 
    firstNameValidity, 
    lastNameValidity, 
    emailValidity, 
    phoneValidity, 
    passwordValidity
  ) {

    if (loading) return;
    
    if (!window.navigator.onLine) {
      setFormError('_errors.No_netowrk_connection');
      return;
    }

    let error = false;

    setFormError(null);
    
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

    if (!passwordValidity.valid) {

      error = true;
      
      if (passwordValidity.tooShort) 
        setPasswordError('_errors.Password_must_be_a_minimium_of_5_characters');
      else 
        setPasswordError('_errors.This_field_is_required');

    } else {
      setPasswordError('');
    }
    
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

        setAuthToken(res.body.data.customer.id, res.body.data.api_token.token);
        
        dispatch({
          type: CUSTOMER.AUTHED, 
          payload: { 
            customer: res.body.data.customer, 
            token: res.body.data.api_token.token, 
            fetchStatus: FETCH_STATUSES.DONE 
          }
        });

        newMessage(res.body.data.api_token.token, res.body.data.customer.user.id);

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
    success,
    formError, 
    firstNameError, 
    lastNameError, 
    emailError, 
    phoneError, 
    passwordError
  ];
}
