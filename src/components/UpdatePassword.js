
import React from 'react';
import FormButton from './FormButton';
import FormField from './FormField';

export default function UpdatePassword({ onUpdatePassword }) {

  function updatePassword(e) {
    e.preventDefault();
  }

  return (
    <form method="POST" action="" className="form-1-x" onSubmit={updatePassword}>

      <FormField  
        ID="current-password-input" 
        label="_user.Current_password" 
        />

      <FormField 
        ID="new-password-input" 
        label="_user.New_password" 
        />

      <FormButton text="_user.Change_password" />

    </form>
  )
}
