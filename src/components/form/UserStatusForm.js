
import React, { useRef } from 'react';
import LoadingDialog from '../dialog/LoadingDialog';
import FormButton from './FormButton';
import FormMessage from './FormMessage';
import FormSelect from './FormSelect';

export default function UserStatusForm({ status, onSubmit, dialog, formError, formSuccess }) {

  const statusInput = useRef(null);

  function updateProfile(e) {
    e.preventDefault();
    onSubmit(statusInput.current.value, statusInput.current.validity);
  }
  
  return (
    <form method="POST" action="" className="form-1-x" onSubmit={updateProfile} noValidate>

      <FormMessage 
        error={formError} 
        success={formSuccess} 
        />

      <FormSelect 
        ref={ statusInput }
        ID="status-input" 
        label="_extra.Status" 
        required={true}
        value={status}
        options={[
          { key: 'active', value: 'Active' },
          { key: 'deactivated', value: 'Deactivated' }
        ]}
        />
      
      <FormButton text="_extra.Submit" />

      { dialog && <LoadingDialog /> }

    </form>
  );
}
