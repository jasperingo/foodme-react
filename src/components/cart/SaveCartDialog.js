

import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AlertDialogDualButton from '../dialog/AlertDialogDualButton';
import Dialog from '../dialog/Dialog';
import FormField from '../form/FormField';

export default function SaveCartDialog({ onSubmitClicked, onCancelClicked }) {

  const { t } = useTranslation();

  const msgInput = useRef(null);

  const [msgError, setMsgError] = useState('');

  function onRateSubmit() {

    if (!msgInput.current.validity.valid) {
      setMsgError('_errors.This_field_is_required');
    } else {
      setMsgError('');
      onSubmitClicked(msgInput.current.value);
    }
  }
  
  return (
    <Dialog>
      <div className="p-4">
        <form onSubmit={(e)=> e.preventDefault()} className="mt-5">
          <FormField 
            ref={msgInput}
            error={msgError}
            ID="review-message-input"
            label={t('_extra.Title')}
            required={true}
            />
          <AlertDialogDualButton 
            onBad={onCancelClicked}
            onGood={onRateSubmit}
            />
        </form>
      </div>
    </Dialog>
  );
}
