import { useMemo, useState } from "react";
import { ADMIN } from "../../context/actions/adminActions";
import AdminRepository from "../../repositories/AdminRepository";
import { useAppContext } from "../contextHook";
import { useCustomerUpdateValidation } from "../customer/customerValidationHook";

export function useAdminUpdate() {

  const { 
    admin: { 
      adminDispatch,
      admin: {
        admin,
        adminToken
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

  const validator = useCustomerUpdateValidation();

  const api = useMemo(function() { return new AdminRepository(adminToken); }, [adminToken]);
  
  async function onSubmit(firstName, lastName, email, phone_number, validity) {

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
    ] = validator(validity);
    
    setFirstNameError(firstNameError);
    setLastNameError(lastNameError);
    setEmailError(emailError);
    setPhoneError(phoneError);
    
    if (error) return;

    setLoading(true);

    try {

      const res = await api.update(admin.id, {
        email,
        phone_number,
        last_name: lastName,
        first_name: firstName,
      });

      if (res.status === 200) {

        setFormSuccess(res.body.message);
        
        adminDispatch({
          type: ADMIN.FETCHED, 
          payload: { admin: res.body.data }
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

    } catch {
      setFormError('_errors.Something_went_wrong');
    } finally {
      setLoading(false);
    }
  }
  
  return [
    onSubmit, 
    admin, 
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
