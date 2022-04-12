import { useMemo, useState } from "react";
import DeliveryFirmRepository from "../../repositories/DeliveryFirmRepository";
import { useDeliveryFirmCreateValidation } from "./deliveryFirmValidationHook";

export function useDeliveryFirmCreate() {

  const [loading, setLoading] = useState(false);

  const [formSuccess, setFormSuccess] = useState(null);

  const [formError, setFormError] = useState(null);

  const [nameError, setNameError] = useState('');

  const [emailError, setEmailError] = useState('');

  const [phoneError, setPhoneError] = useState('');
  
  const [adminEmailError, setAdminEmailError] = useState('');

  const [adminPasswordError, setAdminPasswordError] = useState('');

  const validator = useDeliveryFirmCreateValidation();

  const api = useMemo(function() { return new DeliveryFirmRepository(); }, []);

  async function onSubmit(name, email, phone, adminEmail, adminPassword, validity) {

    if (loading) return;
    
    if (!window.navigator.onLine) {
      setFormError('_errors.No_netowrk_connection');
      return;
    }

    setFormError(null);
    setFormSuccess(null);

    const [error, nameError, emailError, phoneError, adminEmailError, adminPasswordError] = validator(validity);

    setNameError(nameError);
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
    emailError, 
    phoneError, 
    adminEmailError, 
    adminPasswordError
  ];
}
