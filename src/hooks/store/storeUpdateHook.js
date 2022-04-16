import { useMemo, useState } from "react";
import { STORE } from "../../context/actions/storeActions";
import StoreRepository from "../../repositories/StoreRepository";
import { useAppContext } from "../contextHook";
import { useStoreUpdateValidation } from "./storeValidationHook";

export function useStoreUpdate() {

  const { 
    store: { 
      storeDispatch,
      store: {
        store,
        storeToken
      } 
    } 
  } = useAppContext();

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  const [formError, setFormError] = useState(null);

  const [formSuccess, setFormSuccess] = useState(null);

  const [nameError, setNameError] = useState('');

  const [categoryError, setCategoryError] = useState('');

  const [emailError, setEmailError] = useState('');

  const [phoneError, setPhoneError] = useState('');

  const validator = useStoreUpdateValidation();

  const api = useMemo(function() { return new StoreRepository(storeToken); }, [storeToken]);

  async function onSubmit(name, category, email, phone_number, validity) {

    if (loading) return;
    
    if (!window.navigator.onLine) {
      setFormError('_errors.No_netowrk_connection');
      return;
    }

    setFormError(null);
    setFormSuccess(null);

    const [error, nameError, categoryError, emailError, phoneError] = validator(validity);
    
    setNameError(nameError);
    setCategoryError(categoryError);
    setEmailError(emailError);
    setPhoneError(phoneError);
    
    if (error) return;

    setLoading(true);

    try { 
      const res = await api.update(store.id, {
        name, 
        email, 
        phone_number,
        sub_category_id: category, 
      });

      if (res.status === 200) {

        setFormSuccess(res.body.message);
        
        storeDispatch({
          type: STORE.FETCHED, 
          payload: { 
            id: String(store.id),
            store: res.body.data
          }
        });

        setSuccess(true);

      } else if (res.status === 400) {
        
        for (let error of res.body.data) {

          switch(error.name) {

            case 'name':
              setNameError(error.message);
              break;

            case 'sub_category_id':
              setCategoryError(error.message);
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

    } catch {
      setFormError('_errors.Something_went_wrong');
    } finally {
      setLoading(false);
    }
  }
  
  return [
    onSubmit, 
    store, 
    loading, 
    success,
    setSuccess,
    formError, 
    formSuccess, 
    nameError, 
    categoryError, 
    emailError, 
    phoneError
  ];
}
