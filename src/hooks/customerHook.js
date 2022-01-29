import { useCallback, useEffect, useState } from "react";
import { CUSTOMER } from "../context/actions/customerActions";
import CustomerRepository from "../repositories/CustomerRepository";
import { FETCH_STATUSES } from "../repositories/Fetch";
import { useWithdrawalAccountValidation } from "./bankHook";
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

          } else if (res.status === 401) {
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

          } else if (res.status === 401) {
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

  const [data, setData] = useState(null);
  
  const [photo, setPhoto] = useState(null);

  const [photoUploaded, setPhotoUploaded] = useState(false);

  const [dialog, setDialog] = useState(false);

  const [formError, setFormError] = useState(null);

  const [formSuccess, setFormSuccess] = useState(null);

  const [firstNameError, setFirstNameError] = useState('');

  const [lastNameError, setLastNameError] = useState('');

  const [emailError, setEmailError] = useState('');

  const [phoneError, setPhoneError] = useState('');

  const [fetchStatus, setFetchStatus] = useState(FETCH_STATUSES.PENDING);
  

  const uploadPhoto = useCallback(
    () => {
      const form = new FormData();
      form.append('photo', photo);
      
      const api = new CustomerRepository(customerToken, null);
    
      api.updatePhoto(customer.id, form)

      .then(res=> {
        
        if (res.status === 200) {

          setFormSuccess(res.body.message);
          
          dispatch({
            type: CUSTOMER.FETCHED, 
            payload: { 
              customer: res.body.data, 
              fetchStatus: FETCH_STATUSES.DONE 
            }
          });

          setPhotoUploaded(true);

        } else if (res.status === 400) {

          const error = res.body.data[0];
          
          if (error.name === 'photo') setFormError(error.message);

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
    }, 
    [customer.id, customerToken, dispatch, photo]
  );
  
  const update = useCallback(
    () => {
      const api = new CustomerRepository(customerToken);
      
      api.update(customer.id, data)
      .then(res=> {

        if (res.status === 200) {

          setFormSuccess(res.body.message);
          
          dispatch({
            type: CUSTOMER.FETCHED, 
            payload: { 
              customer: res.body.data, 
              fetchStatus: FETCH_STATUSES.DONE 
            }
          });

          if (photo !== null) {
            uploadPhoto();
          } else {
            setFetchStatus(FETCH_STATUSES.PENDING);
          }

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

      })
      .catch(()=> {
        setFetchStatus(FETCH_STATUSES.PENDING);
        setFormError('_errors.Something_went_wrong');
      });
    }, 
    [data, photo, customer.id, customerToken, dispatch, uploadPhoto]
  );

  function onPhotoChoose(photo) {
    setPhoto(photo);
    setPhotoUploaded(false);
  }

  function onSubmit(
    firstName, 
    lastName, 
    email, 
    phone_number,
    firstNameValidity, 
    lastNameValidity, 
    emailValidity, 
    phoneValidity
  ) {

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
    
    if (!error) {
      setDialog(true);
      setData({
        email,
        phone_number,
        last_name: lastName,
        first_name: firstName,
      });
      setFetchStatus(FETCH_STATUSES.LOADING);
    }
  }

  useEffect(
    ()=> {
      if (fetchStatus === FETCH_STATUSES.LOADING) {
        update();
      } else if (dialog !== false) {
        setDialog(false);
      }
    }, 
    [fetchStatus, dialog, update]
  );
  
  return [onSubmit, onPhotoChoose, photoUploaded, customer, dialog, formError, formSuccess, firstNameError, lastNameError, emailError, phoneError];
}


export function useCustomerPasswordUpdate() {

  const { 
    customer: {
      customer: {
        customer: {
          customer,
          customerToken
        }
      } 
    } 
  } = useAppContext();

  const [data, setData] = useState(false);

  const [dialog, setDialog] = useState(false);

  const [formError, setFormError] = useState('');

  const [formSuccess, setFormSuccess] = useState('');

  const [newPasswordError, setNewPasswordError] = useState('');

  const [currentPasswordError, setCurrentPasswordError] = useState('');

  const [fetchStatus, setFetchStatus] = useState(FETCH_STATUSES.PENDING);

  function onSubmit(
    currentPassword,
    newPassword,
    currentPasswordValidity,
    newPasswordValidity
  ) {
    
    let error = false;

    setFormError('');
    setFormSuccess('');

    if (!currentPasswordValidity.valid) {
      error = true;
      if (currentPasswordValidity.tooShort) 
        setCurrentPasswordError('_errors.Password_must_be_a_minimium_of_5_characters');
      else 
        setCurrentPasswordError('_errors.This_field_is_required');
    } else {
      setCurrentPasswordError('');
    }

    if (!newPasswordValidity.valid) {
      error = true;
      if (newPasswordValidity.tooShort) 
        setNewPasswordError('_errors.Password_must_be_a_minimium_of_5_characters');
      else 
        setNewPasswordError('_errors.This_field_is_required');
    } else {
      setNewPasswordError('');
    }

    if (!error) {
      setDialog(true);
      setData({
        password: currentPassword,
        new_password: newPassword,
        new_password_confirmation: newPassword
      });
      setFetchStatus(FETCH_STATUSES.LOADING);
    }
  }
  
  useEffect(
    ()=> {

      if (fetchStatus === FETCH_STATUSES.LOADING) {

        const api = new CustomerRepository(customerToken);

        api.updatePassword(customer.id, data)
        .then(res=> {
          
          if (res.status === 200) {

            setFormSuccess(res.body.message);
  
          } else if (res.status === 400) {
            
            for (let error of res.body.data) {
  
              switch(error.name) {
  
                case 'password':
                  setCurrentPasswordError(error.message);
                  break;
  
                case 'new_password':
                  setNewPasswordError(error.message);
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

    }, 
    [data, customer.id, customerToken, fetchStatus, dialog]
  );

  return [onSubmit, dialog, formError, formSuccess, newPasswordError, currentPasswordError];
}


export function useCustomerWithdrawalAccountUpdate() {

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

  const [data, setData] = useState(null);

  const [dialog, setDialog] = useState(false);

  const [formError, setFormError] = useState(null);

  const [formSuccess, setFormSuccess] = useState(null);

  const [bankCodeError, setBankCodeError] = useState('');

  const [nameError, setNameError] = useState('');

  const [numberError, setNumberError] = useState('');

  const [typeError, setTypeError] = useState('');

  const [fetchStatus, setFetchStatus] = useState(FETCH_STATUSES.PENDING);

  const validator = useWithdrawalAccountValidation();
  
  
  const update = useCallback(
    () => {
      const api = new CustomerRepository(customerToken);
      
      api.updateWithdrawalAccount(customer.id, data)
      .then(res=> {

        if (res.status === 200) {

          setFormSuccess(res.body.message);
          
          dispatch({
            type: CUSTOMER.FETCHED, 
            payload: { 
              customer: res.body.data, 
              fetchStatus: FETCH_STATUSES.DONE 
            }
          });

        } else if (res.status === 400) {
          
          for (let error of res.body.data) {

            switch(error.name) {

              case 'bank_code':
                setBankCodeError(error.message);
                break;

              case 'account_name':
                setNameError(error.message);
                break;

              case 'account_number':
                setNumberError(error.message);
                break;

              case 'account_type':
                setTypeError(error.message);
                break;

              default:
            }
          }

        } else {
          throw new Error();
        }

      })
      .catch(()=> {
        setFetchStatus(FETCH_STATUSES.PENDING);
        setFormError('_errors.Something_went_wrong');
      })
      .finally(()=> {
        setFetchStatus(FETCH_STATUSES.PENDING);
      });
    }, 
    [data, customer.id, customerToken, dispatch]
  );

  function onSubmit(
    bankCode, 
    accountName, 
    accountNumber, 
    accountType,
    codeValidity, 
    nameValidity, 
    numberValidity, 
    typeValidity
  ) {

    setFormError(null);
    setFormSuccess(null);
    
    const [
      error, 
      codeError, 
      nameError, 
      numberError, 
      typeError
    ] = validator(codeValidity, nameValidity, numberValidity, typeValidity);

    setBankCodeError(codeError);
    setNameError(nameError);
    setNumberError(numberError);
    setTypeError(typeError);
    
    if (!window.navigator.onLine) {
      setFormError('_errors.No_netowrk_connection');
    } else if (!error) {
      setDialog(true);
      setData({
        bank_code: bankCode, 
        account_name: accountName, 
        account_number: accountNumber, 
        account_type: accountType,
      });
      setFetchStatus(FETCH_STATUSES.LOADING);
    }
  }

  useEffect(
    ()=> {
      if (fetchStatus === FETCH_STATUSES.LOADING) {
        update();
      } else if (dialog !== false) {
        setDialog(false);
      }
    }, 
    [fetchStatus, dialog, update]
  );

  return [onSubmit, dialog, formError, formSuccess, bankCodeError, nameError, numberError, typeError];
}




