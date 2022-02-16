import { useEffect, useState } from "react";
import { DELIVERY_FIRM } from "../../context/actions/deliveryFirmActions";
import DeliveryFirmRepository from "../../repositories/DeliveryFirmRepository";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import { useAppContext } from "../contextHook";
import { useSaveDeliveryFirmToken } from "./saveDeliveryFirmTokenHook";

export function useDeliveryFirmCreate() {

  const { 
    deliveryFirm: { deliveryFirmDispatch } 
  } = useAppContext();

  const saveToken = useSaveDeliveryFirmToken();

  const [data, setData] = useState(null);

  const [dialog, setDialog] = useState(false);

  const [formError, setFormError] = useState(null);

  const [nameError, setNameError] = useState('');

  const [emailError, setEmailError] = useState('');

  const [phoneError, setPhoneError] = useState('');
  
  const [adminEmailError, setAdminEmailError] = useState('');

  const [adminPasswordError, setAdminPasswordError] = useState('');

  const [fetchStatus, setFetchStatus] = useState(FETCH_STATUSES.PENDING);

  function onSubmit(
    name, 
    email, 
    phone, 
    adminEmail,
    adminPassword, 

    nameValidity, 
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
        administrator_email: adminEmail,
        administrator_password: adminPassword,
        administrator_password_confirmation: adminPassword
      });
      setFetchStatus(FETCH_STATUSES.LOADING);
    }
  }

  useEffect(()=> {

    if (fetchStatus === FETCH_STATUSES.LOADING) {
      
      const api = new DeliveryFirmRepository();

      api.create(data)
      .then(res=> {

        if (res.status === 201) {

          setFetchStatus(FETCH_STATUSES.PENDING);

          saveToken(
            res.body.data.delivery_firm.id, 
            res.body.data.api_token.token,
            res.body.data.delivery_firm.administrators[0].id
          );
          
          deliveryFirmDispatch({
            type: DELIVERY_FIRM.AUTHED, 
            payload: { 
              token: res.body.data.api_token.token, 
              deliveryFirm: res.body.data.delivery_firm, 
              adminID: res.body.data.delivery_firm.administrators[0].id,
              fetchStatus: FETCH_STATUSES.DONE 
            }
          });

        } else if (res.status === 400) {

          setFetchStatus(FETCH_STATUSES.PENDING);
          
          for (let error of res.body.data) {

            switch(error.name) {

              case 'name':
                setNameError(error.message);
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
        setFetchStatus(FETCH_STATUSES.PENDING);
        setFormError('_errors.Something_went_wrong');
      });

    } else if (dialog !== false) {
      setDialog(false);
    }

  }, [data, fetchStatus, dialog, deliveryFirmDispatch, saveToken]);


  return [onSubmit, dialog, formError, nameError, emailError, phoneError, adminEmailError, adminPasswordError];
}
