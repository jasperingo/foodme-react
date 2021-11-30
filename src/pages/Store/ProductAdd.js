
import React from 'react';
import FormButton from '../../components/FormButton';
import FormField from '../../components/FormField';
import PhotoChooser from '../../components/PhotoChooser';

export default function ProductAdd() {

  function onFormSubmit(e) {
    e.preventDefault();
  }

  return (
    <section>
      <div className="container-x">
        
        <form method="POST" action="" onSubmit={onFormSubmit} className="form-1-x">

          <PhotoChooser src="/photos/products/p1.jpg" />

          <FormField ID="title-input" label="_extra.Title" />

          <FormField ID="subtitle-input" label="_extra.Sub_title" />

          <FormField 
            ID="category-input" 
            label="_extra.Category" 
            />
          
          <FormField 
            ID="category-input" 
            label="_extra.Sub_category" 
            />

          <FormField ID="description-input" label="_extra.Description" />

          <FormField ID="quantity-input" label="_extra.Quantity" type="number" />

          <FormField ID="price-input" label="_extra.Price" type="number" />

          <FormField 
            ID="unit-input" 
            label="_extra.Unit" 
            />

          <FormButton text="_extra.Submit" />

        </form>

      </div>
    </section>
  );
}
