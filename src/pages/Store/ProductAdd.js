
import React, { useRef } from 'react';
import FormButton from '../../components/FormButton';
import FormField from '../../components/FormField';
import FormSelect from '../../components/FormSelect';
import FormTextArea from '../../components/FormTextArea';
import PhotoChooser from '../../components/PhotoChooser';

export default function ProductAdd() {

  const photoInput = useRef(null);

  function onFormSubmit(e) {
    e.preventDefault();
  }

  return (
    <section>
      <div className="container-x">
        
        <form method="POST" action="" onSubmit={onFormSubmit} className="form-1-x">

          <PhotoChooser 
            ref={photoInput} 
            src="/photos/products/p1.jpg" 
            />

          <FormField 
            ID="title-input" 
            label="_extra.Title" 
            required={true}
            />

          <FormField 
            ID="subtitle-input" 
            label="_extra.Sub_title" 
            required={true}
            />

          <FormSelect 
            ID="category-input" 
            label="_extra.Category" 
            required={true}
            />
          
          <FormSelect 
            ID="category-input" 
            label="_extra.Sub_category" 
            required={true}
            />

          <FormField 
            ID="quantity-input" 
            label="_extra.Quantity" 
            type="number" 
            required={true}
            />

          <FormField 
            ID="price-input" 
            label="_extra.Price" 
            type="number" 
            step="0.01"
            required={true}
            />

          <FormSelect 
            ID="unit-input" 
            label="_extra.Unit" 
            required={true}
            />

          <FormTextArea 
            ID="description-input" 
            label="_extra.Description" 
            required={true}
            />

          <FormButton text="_extra.Submit" />

        </form>

      </div>
    </section>
  );
}
