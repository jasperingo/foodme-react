import { useCallback, useEffect, useState } from "react";
import { CUSTOMER } from "../context/actions/customerActions";
import CustomerRepository from "../repositories/CustomerRepository";
import { FETCH_STATUSES } from "../repositories/Fetch";
import { useAppContext } from "./contextHook";

const CUSTOMER_ID = 'customer_id';
const CUSTOMER_TOKEN = 'customer_token';

export function useStoreCustomerToken() {
  return (id, api_token)=> {
    window.localStorage.setItem(CUSTOMER_ID, id);
    window.localStorage.setItem(CUSTOMER_TOKEN, api_token);
  }
}

export function useAuthCustomerFetch() {

  const { 
    customer: { dispatch } 
  } = useAppContext();

  const [done, setDone] = useState(FETCH_STATUSES.LOADING);

  const retry = useCallback(() => setDone(FETCH_STATUSES.LOADING), []);
  
  useEffect(
    ()=> {
      const customerId = window.localStorage.getItem(CUSTOMER_ID);
      const customerToken = window.localStorage.getItem(CUSTOMER_TOKEN);

      if (done === FETCH_STATUSES.LOADING && customerId !== null && customerToken !== null) {
        const api = new CustomerRepository(customerToken);

        api.get(customerId)
        .then(res=> {
          
          if (res.status === 200) {
            
            dispatch({
              type: CUSTOMER.AUTHED, 
              payload: { 
                token: customerToken, 
                customer: res.body.data, 
                fetchStatus: FETCH_STATUSES.DONE 
              }
            });

            setDone(FETCH_STATUSES.DONE);

          } else if (res.status === 401 ) {
            window.localStorage.removeItem(CUSTOMER_ID);
            window.localStorage.removeItem(CUSTOMER_TOKEN);
            setDone(FETCH_STATUSES.DONE);
          } else {
            throw new Error();
          }
        })
        .catch(()=> {
          setDone(FETCH_STATUSES.ERROR);
        });
      } else if (done === FETCH_STATUSES.LOADING && (customerId === null || customerToken === null)) {
        setDone(FETCH_STATUSES.DONE);
      }
    },
    [done, dispatch]
  )
  
  return [done, retry];
}

export function useCustomerLogOut() {
  const { 
    customer: { dispatch } 
  } = useAppContext();

  return ()=> {
    window.localStorage.removeItem(CUSTOMER_ID);
    window.localStorage.removeItem(CUSTOMER_TOKEN);

    dispatch({ type: CUSTOMER.UNAUTHED });
  }
}

export function useCustomerLogin() {

  const { 
    customer: { dispatch } 
  } = useAppContext();

  const storeToken = useStoreCustomerToken();

  const [data, setData] = useState(null);

  const [dialog, setDialog] = useState(false);

  const [formError, setFormError] = useState(null);

  const [fetchStatus, setFetchStatus] = useState(FETCH_STATUSES.PENDING);

  function onSubmit(email, password, emailValidity, passwordValidity) {
    
    if (!emailValidity.valid || !passwordValidity.valid) {
      setFormError('_errors.Credentials_are_incorrect');
    } else if (!window.navigator.onLine) {
      setFormError('_errors.No_netowrk_connection');
    } else {
      setDialog(true);
      setFormError(null);
      setData({
        email: email,
        password: password,
        password_confirmation: password
      });
      setFetchStatus(FETCH_STATUSES.LOADING);
    }
  }
  
  useEffect(
    ()=> {

      if (fetchStatus === FETCH_STATUSES.LOADING) {
        
        const api = new CustomerRepository();

        api.auth(data)
        .then(res=> {
          
          if (res.status === 200) {

            storeToken(res.body.data.customer.id, res.body.data.api_token.token);
            
            dispatch({
              type: CUSTOMER.AUTHED, 
              payload: { 
                customer: res.body.data.customer, 
                token: res.body.data.api_token.token, 
                fetchStatus: FETCH_STATUSES.DONE 
              }
            });

          } else if (res.status === 401 ) {
            setFormError('_errors.Credentials_are_incorrect');
          } else {
            throw new Error();
          }

        })
        .catch(()=> {
          setFormError('_error.Something_went_wrong');
        })
        .finally(()=> {
          setFetchStatus(FETCH_STATUSES.PENDING);
        });

      } else if (dialog !== false) {
        setDialog(false);
      }

    }, 
    [data, fetchStatus, dialog, dispatch, storeToken]
  );

  return [onSubmit, dialog, formError]
}


export function useCustomerCreate() {

  const { 
    customer: { dispatch } 
  } = useAppContext();

  const storeToken = useStoreCustomerToken();

  const [data, setData] = useState(null);

  const [dialog, setDialog] = useState(false);

  const [formError, setFormError] = useState(null);

  const [firstNameError, setFirstNameError] = useState('');

  const [lastNameError, setLastNameError] = useState('');

  const [emailError, setEmailError] = useState('');

  const [phoneError, setPhoneError] = useState('');

  const [passwordError, setPasswordError] = useState('');

  const [fetchStatus, setFetchStatus] = useState(FETCH_STATUSES.PENDING);

  function onSubmit(
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
    
    if (!error) {
      setDialog(true);
      setData({
        email,
        password,
        phone_number: phone,
        last_name: lastName,
        first_name: firstName,
        password_confirmation: password
      });
      setFetchStatus(FETCH_STATUSES.LOADING);
    }
  }


  useEffect(()=> {

    if (fetchStatus === FETCH_STATUSES.LOADING) {
      
      const api = new CustomerRepository();

      api.create(data)
      .then(res=> {

        if (res.status === 201) {

          storeToken(res.body.data.customer.id, res.body.data.api_token.token);
          
          dispatch({
            type: CUSTOMER.AUTHED, 
            payload: { 
              customer: res.body.data.customer, 
              token: res.body.data.api_token.token, 
              fetchStatus: FETCH_STATUSES.DONE 
            }
          });

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

  }, [data, fetchStatus, dialog, dispatch, storeToken]);


  return [onSubmit, dialog, formError, firstNameError, lastNameError, emailError, phoneError, passwordError];
}



