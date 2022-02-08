
import React, { useRef, useState } from 'react';
import FormField from '../form/FormField';
import FormMessage from '../form/FormMessage';
import AlertDialogDualButton from './AlertDialogDualButton';
import Dialog from './Dialog';

export default function WithdrawDialog({ amount, sendIt, closeIt }) {
  
  const amountInput = useRef(null);

  const [formError, setFormError] = useState(null);

  function onFormSubmit(e) {
    e.preventDefault()
    validateWithdraw();
  }

  function validateWithdraw() {
    
    if (!amountInput.current.validity.valid) {
      if (amountInput.current.validity.rangeUnderflow) {
        setFormError('_errors._Minimium_withdrawal');
      } else if (amountInput.current.validity.rangeOverflow) {
        setFormError('_errors._Maximium_withdrawal');
      } else {
        setFormError('_errors.This_field_is_required');
      }
    } else {
      setFormError('');
      sendIt(amountInput.current.value);
    }

  }

  return (
    <Dialog>
      <form method="POST" action="" onSubmit={onFormSubmit} className="p-4 pt-8" noValidate>

        <FormMessage error={formError} />
        
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
          onGood={validateWithdraw}
          />

      </form>
    </Dialog>
  );
}
