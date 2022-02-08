import { useEffect, useState } from "react";
import { STORE } from "../../context/actions/storeActions";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import StoreRepository from "../../repositories/StoreRepository";
import { useAppContext } from "../contextHook";
import { useSaveStoreToken } from "./saveStoreTokenHook";

export function useStoreCreate() {

  const { 
    store: { storeDispatch } 
  } = useAppContext();

  const saveToken = useSaveStoreToken();

  const [data, setData] = useState(null);

  const [dialog, setDialog] = useState(false);

  const [formError, setFormError] = useState(null);

  const [nameError, setNameError] = useState('');

  const [categoryError, setCategoryError] = useState('');

  const [emailError, setEmailError] = useState('');

  const [phoneError, setPhoneError] = useState('');
  
  const [adminEmailError, setAdminEmailError] = useState('');

  const [adminPasswordError, setAdminPasswordError] = useState('');

  const [fetchStatus, setFetchStatus] = useState(FETCH_STATUSES.PENDING);

  function onSubmit(
    name, 
    category, 
    email, 
    phone, 
    adminEmail,
    adminPassword, 
    nameValidity, 
    categoryValidity, 
    emailValidity, 
    phoneValidity, 
    adminEmailValidity, 
    adminPasswordValidity
  ) {

    let error = false;

    setFormError(null);
    
    if (!nameValidity.valid) {
      error = true;
      setNameError('_errors.This_field_is_required');
    } else {
      setNameError('');
    }

    if (!categoryValidity.valid) {
      error = true;
      setCategoryError('_errors.This_field_is_required');
    } else {
      setCategoryError('');
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

    if (!adminEmailValidity.valid) {
      error = true;
      setAdminEmailError('_errors.This_field_is_required');
    } else {
      setAdminEmailError('');
    }

    if (!adminPasswordValidity.valid) {

      error = true;
      
      if (adminPasswordValidity.tooShort) 
        setAdminPasswordError('_errors.Password_must_be_a_minimium_of_5_characters');
      else 
        setAdminPasswordError('_errors.This_field_is_required');

    } else {
      setAdminPasswordError('');
    }
    
    if (!error) {
      setDialog(true);
      setData({
        name,
        email,
        phone_number: phone,
        sub_category_id: category,
        administrator_email: adminEmail,
        administrator_password: adminPassword,
        administrator_password_confirmation: adminPassword
      });
      setFetchStatus(FETCH_STATUSES.LOADING);
    }
  }


  useEffect(()=> {

    if (fetchStatus === FETCH_STATUSES.LOADING) {
      
      const api = new StoreRepository();

      api.create(data)
      .then(res=> {

        if (res.status === 201) {

          saveToken(
            res.body.data.store.id, 
            res.body.data.api_token.token,
            res.body.data.store.administrators[0].id
          );
          
          storeDispatch({
            type: STORE.AUTHED, 
            payload: { 
              store: res.body.data.store, 
              token: res.body.data.api_token.token, 
              adminID: res.body.data.store.administrators[0].id,
              fetchStatus: FETCH_STATUSES.DONE 
            }
          });

        } else if (res.status === 400) {
          
          for (let error of res.body.data) {

            switch(error.name) {

              case 'name':
                setNameError(error.message);
                break;

              case 'sub_cateogry_id':
                setCategoryError(error.message);
                break;

              case 'email':
                setEmailError(error.message);
                break;

              case 'phone_number':
                setPhoneError(error.message);
                break;

              case 'administrator_email':
                setAdminEmailError(error.message);
                break;

              case 'administrator_password':
              case 'administrator_password_confirmation':
                setAdminPasswordError(error.message);
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

  }, [data, fetchStatus, dialog, storeDispatch, saveToken]);


  return [onSubmit, dialog, formError, nameError, categoryError, emailError, phoneError, adminEmailError, adminPasswordError];
}
