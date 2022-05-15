
import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import LoadingDialog from '../../components/dialog/LoadingDialog';
import FormButton from '../../components/form/FormButton';
import FormField from '../../components/form/FormField';
import FormMessage from '../../components/form/FormMessage';
import FormPhotoField from '../../components/form/FormPhotoField';
import { useHeader } from '../../hooks/headerHook';
import { usePromotionCreate } from '../../hooks/promotion/promotionCreateHook';
import { usePromotionPhotoUpdate } from '../../hooks/promotion/promotionPhotoUpdateHook';

export default function PromotionCreate() {

  useHeader({ 
    title: 'Add Promotion - DailyNeeds',
    headerTitle: '_promotion.Add_promotion'
  });

  const titleInput = useRef(null);

  const linkInput = useRef(null);
  
  const callToActionInput = useRef(null);

  const amountInput = useRef(null);

  const durationInput = useRef(null);

  const history = useHistory();

  const [
    onSubmit,
    id, 
    loading, 
    formError,
    titleError, 
    linkError, 
    callToActionError,
    amountError,
    durationError
  ] = usePromotionCreate();

  const [
    submit,
    photo,
    setPhoto,
    photoLoading,
    photoUploaded,
    photoFormError
  ] = usePromotionPhotoUpdate();

  useEffect(
    function() {
      if (id > 0 && photo !== null && !photoUploaded && photoFormError === null)
        submit(id);
      else if (id > 0) 
        history.push(`/promotion/${id}`);
    }, 
    [id, photo, photoUploaded, photoFormError, history, submit]
  );
  
  function onFormSubmit(e) {
    e.preventDefault();
    onSubmit(
      titleInput.current.value,
      linkInput.current.value,
      callToActionInput.current.value,
      amountInput.current.value,
      durationInput.current.value,

      {
        titleValidity: titleInput.current.validity,
        linkValidity: linkInput.current.validity,
        callToActionValidity: callToActionInput.current.validity,
        amountValidity: amountInput.current.validity,
        durationValidity: durationInput.current.validity
      }
    );
  }

  return (
    <section>
      <div className="container-x">
        <form method="POST" action="" onSubmit={onFormSubmit} className="form-1-x" noValidate>

          <FormMessage error={formError || photoFormError} /> 

          <FormPhotoField 
            alt="Add promotion" 
            src="/photos/default.jpg"
            onChoose={setPhoto}
            uploaded={photoUploaded}
            />

          <FormField 
            ref={ titleInput }
            error={ titleError }
            ID="title-input" 
            label="_extra.Title" 
            required={true}
            />

          <FormField 
            ref={ linkInput }
            error={ linkError }
            type="url"
            ID="link-input" 
            label="_extra.Link" 
            required={true}
            />

          <FormField 
            ref={ callToActionInput }
            error={ callToActionError }
            ID="call-to-action-input" 
            label="_extra.Call_to_action" 
            required={true}
            />

          <FormField 
            ref={ amountInput }
            error={ amountError }
            type="number"
            step="0.01"
            ID="amount-input" 
            label="_extra.Amount" 
            required={true}
            />

          <FormField 
            ref={ durationInput }
            error={ durationError }
            type="number"
            ID="duration-input" 
            label="_extra.Duration__days" 
            required={true}
            />

          <FormButton text="_extra.Submit" />

          { (loading || photoLoading) && <LoadingDialog /> }

        </form>
      </div>
    </section>
  );
}
