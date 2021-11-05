
import React from 'react';
import FormButton from '../../components/FormButton';
import FormField from '../../components/FormField';

export default function Address() {

  function onFormSubmit(e) {
    e.preventDefault();
  }

  return (
    <section>
      <div className="container-x">

        <form method="POST" action="" className="form-1-x" onSubmit={onFormSubmit}>

          <FormField ID="address-title-input" label="_extra.Title" />

          <FormField ID="address-street-input" label="_user.Street" />

          <FormField ID="address-city-input" label="_user.City" />

          <FormField ID="address-state-input" label="_user.State" />

          <FormButton text="_extra.Submit" />

        </form>



      </div>
    </section>
  );
}
