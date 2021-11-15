
import React from 'react';
import FormButton from '../../components/FormButton';
import FormField from '../../components/FormField';

export default function ProductAdd() {

  function onFormSubmit(e) {
    e.preventDefault();
  }

  return (
    <section>
      <div className="container-x">
        
        <form method="POST" action="" onSubmit={onFormSubmit} className="form-1-x">

          <FormField ID="title-input" label="_extra.Title" />

          <FormField ID="subtitle-input" label="_extra.Sub_title" />

          <FormField ID="description-input" label="_extra.Description" />

          <FormField ID="quantity-input" label="_extra.Quantity" type="number" />

          <FormField ID="price-input" label="_extra.Price" type="number" />

          <FormButton text="_extra.Submit" />

        </form>

      </div>
    </section>
  );
}
