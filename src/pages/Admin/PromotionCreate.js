
import React, { useRef } from 'react';
import FormButton from '../../components/form/FormButton';
import FormField from '../../components/form/FormField';
import FormMessage from '../../components/form/FormMessage';
import FormPhotoField from '../../components/form/FormPhotoField';
import { useHeader } from '../../hooks/headerHook';

export default function PromotionCreate() {

  useHeader({ 
    title: 'Add Promotion - DailyNeeds',
    headerTitle: '_promotion.Add_promotion'
  });

  const titleInput = useRef(null);

  const linkInput = useRef(null);
  
  const linkTypeInput = useRef(null);

  const amountInput = useRef(null);

  const durationInput = useRef(null);
  
  function onFormSubmit(e) {
    e.preventDefault();
    alert('form submitted');
  }

  return (
    <section>
      <div className="container-x">
        <form method="POST" action="" onSubmit={onFormSubmit} className="form-1-x" noValidate>

          <FormMessage 
            // error={formError} 
            // success={formSuccess} 
            /> 

          <FormPhotoField 
            alt="Add promotion" 
            src="/photos/default.jpg"
            // onChoose={onPhotoChoose}
            // uploaded={photoUploaded}
            />

          <FormField 
            ref={ titleInput }
            // error={ nameError }
            ID="title-input" 
            label="_extra.Title" 
            required={true}
            />

          <FormField 
            ref={ linkInput }
            // error={ nameError }
            type="url"
            ID="link-input" 
            label="_extra.Link" 
            required={true}
            />

          <FormField 
            ref={ linkTypeInput }
            // error={ nameError }
            ID="link-type-input" 
            label="_extra.Link_type" 
            required={true}
            />

          <FormField 
            ref={ amountInput }
            // error={ nameError }
            type="number"
            step="0.01"
            ID="amount-input" 
            label="_extra.Amount" 
            required={true}
            />

          <FormField 
            ref={ durationInput }
            // error={ nameError }
            type="number"
            ID="duration-input" 
            label="_extra.Duration" 
            required={true}
            />

          <FormButton text="_extra.Submit" />

          {/* { dialog && <LoadingDialog dialog={dialog} /> } */}

        </form>
      </div>
    </section>
  );
}
