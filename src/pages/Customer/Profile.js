
import React from 'react';
import FormButton from '../../components/FormButton';
import FormField from '../../components/FormField';

export default function Profile() {


  function updateProfile(e) {
    e.preventDefault();
  }

  function updatePassword(e) {
    e.preventDefault();
  }

  return (
    <section className="flex-grow">
      
      <div className="container-x">

        <form method="POST" action="" className="form-1-x" onSubmit={updateProfile}>

          <FormField ID="fn-input" label="First_name" />

          <FormField ID="ln-input" label="Last_name" />

          <FormField
            ID="email-input" 
            label="Email" 
            />

          <FormButton text="_extra.Submit" />

        </form>

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

      </div>

    </section>
  );
}
