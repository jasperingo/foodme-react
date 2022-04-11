import { useMemo, useState } from "react";
import StoreRepository from "../../repositories/StoreRepository";
import { useStoreCreateValidation } from "./storeValidationHook";

export function useStoreCreate() {

  const [loading, setLoading] = useState(false);

  const [formError, setFormError] = useState(null);

  const [formSuccess, setFormSuccess] = useState(null);

  const [nameError, setNameError] = useState('');

  const [categoryError, setCategoryError] = useState('');

  const [emailError, setEmailError] = useState('');

  const [phoneError, setPhoneError] = useState('');
  
  const [adminEmailError, setAdminEmailError] = useState('');

  const [adminPasswordError, setAdminPasswordError] = useState('');

  const validator = useStoreCreateValidation();

  const api = useMemo(function() { return new StoreRepository(); }, []);

  async function onSubmit(name, category, email, phone, adminEmail, adminPassword, validity) {

    if (loading) return;
    
    if (!window.navigator.onLine) {
      setFormError('_errors.No_netowrk_connection');
      return;
    }

    setFormError(null);
    setFormSuccess(null);

    const [error, nameError, categoryError, emailError, phoneError, adminEmailError, adminPasswordError] = validator(validity);

    setNameError(nameError);
    setCategoryError(categoryError);
    setEmailError(emailError);
    setPhoneError(phoneError);
    setAdminEmailError(adminEmailError);
    setAdminPasswordError(adminPasswordError);
    
    if (error) return;

    setLoading(true);

    try {

      const res = await api.create({
        name,
        email,
        phone_number: phone,
        sub_category_id: category,
        administrator_email: adminEmail,
        administrator_password: adminPassword,
        administrator_password_confirmation: adminPassword
      });
      
      if (res.status === 201) {

        setFormSuccess(res.body.message);

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

    } catch {
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
    nameError, 
    categoryError, 
    emailError, 
    phoneError, 
    adminEmailError, 
    adminPasswordError
  ];
}
