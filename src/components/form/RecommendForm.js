
import React, { useRef } from 'react';
import LoadingDialog from '../dialog/LoadingDialog';
import FormButton from './FormButton';
import FormMessage from './FormMessage';
import FormSelect from './FormSelect';

export default function RecommendForm({ recommended, onSubmit, dialog, formError, formSuccess, recommendedError }) {

  const recommendedInput = useRef(null);

  function updateProfile(e) {
    e.preventDefault();
    onSubmit(recommendedInput.current.value, recommendedInput.current.validity);
  }
  
  return (
    <form method="POST" action="" className="form-1-x" onSubmit={updateProfile} noValidate>

      <FormMessage 
        error={formError} 
        success={formSuccess} 
        />

      <FormSelect 
        ref={ recommendedInput }
        error={ recommendedError }
        ID="recommended-input" 
        label="_extra.Recommended" 
        required={true}
        value={recommended}
        options={[
          { key: 'true', value: 'Yes' },
          { key: 'false', value: 'No' }
        ]}
        />
      
      <FormButton text="_extra.Submit" />

      { dialog && <LoadingDialog /> }

    </form>
  );
}
