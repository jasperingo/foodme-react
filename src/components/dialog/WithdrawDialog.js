
import React, { useRef } from 'react';
import FormField from '../form/FormField';
import FormMessage from '../form/FormMessage';
import AlertDialogDualButton from './AlertDialogDualButton';
import Dialog from './Dialog';
import LoadingDialog from './LoadingDialog';

export default function WithdrawDialog({ amount, formError, formSuccess, dialog, sendIt, closeIt }) {
  
  const amountInput = useRef(null);

  function onFormSubmit(e) {
    e.preventDefault()
    sendIt(amountInput.current.value, amountInput.current.validity);
  }

  return (
    dialog ?
    <LoadingDialog />
    :
    <Dialog>
      <form method="POST" action="" onSubmit={onFormSubmit} className="p-4 pt-8" noValidate>

        <FormMessage error={formError} success={formSuccess} />
        
        <FormField 
          ref={amountInput}
          ID="amount-input"
          label="_transaction.Amount"
          type="number"
          step="0.01"
          min={1000}
          max={amount}
          required={true}
          />

        <AlertDialogDualButton
          onBad={closeIt}
          onGood={onFormSubmit}
          />

      </form>
    </Dialog>
  );
}
