import { useEffect, useState } from "react";
import AdminRepository from "../../repositories/AdminRepository";
import { FETCH_STATUSES } from "../../repositories/Fetch";
import { useAppContext } from "../contextHook";
import { useUpdatePasswordValidation } from "../validation/passwordValidationHook";

export function useAdminPasswordUpdate() {

  const { 
    admin: {
      admin: {
        admin,
        adminToken
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

  const validator = useUpdatePasswordValidation();

  function onSubmit(
    currentPassword,
    newPassword,
    currentPasswordValidity,
    newPasswordValidity
  ) {

    setFormError('');
    setFormSuccess('');

    const [
      error, 
      currentPasswordError, 
      newPasswordError
    ] = validator(currentPasswordValidity, newPasswordValidity);

    setNewPasswordError(newPasswordError);
    setCurrentPasswordError(currentPasswordError);

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

        const api = new AdminRepository(adminToken);

        api.updatePassword(admin.id, data)
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
    [data, admin.id, adminToken, fetchStatus, dialog]
  );

  return [onSubmit, dialog, formError, formSuccess, newPasswordError, currentPasswordError];
}
