
import React, { useRef } from 'react';
import LoadingDialog from '../dialog/LoadingDialog';
import FormButton from './FormButton';
import FormField from './FormField';
import FormMessage from './FormMessage';
import FormSelect from './FormSelect';

export default function UpdateWithdrawalAccountForm(
  { 
    banks, 
    account, 
    onSubmit, 
    dialog, 
    formError, 
    formSuccess, 
    bankCodeError, 
    nameError, 
    numberError, 
    typeError 
  }
) {

  const bankNameInput = useRef(null);

  const nameInput = useRef(null);

  const numberInput = useRef(null);

  const typeInput = useRef(null);

  function onFormSubmit(e) {
    e.preventDefault();
    onSubmit(
      bankNameInput.current.value,
      nameInput.current.value,
      numberInput.current.value,
      typeInput.current.value,
      bankNameInput.current.validity,
      nameInput.current.validity,
      numberInput.current.validity,
      typeInput.current.validity
    );
  }

  return (
    <form method="POST" action="" className="form-1-x" onSubmit={onFormSubmit} noValidate>

      <FormMessage 
        error={formError} 
        success={formSuccess} 
        /> 

      <FormSelect
        ref={ bankNameInput }
        error={ bankCodeError }
        ID="bank-name-input" 
        label="_transaction.Bank_name" 
        required={true}
        value={ banks.find(i=> i.name === account.bank_name)?.code }
        options={banks.map(i=> ({ key: i.code, value: i.name }))}
        />

      <FormField 
        ref={ nameInput }
        error={ nameError }
        ID="bank-account-name-input" 
        label="_transaction.Account_name" 
        required={true}
        value={ account.account_name }
        />
      
      <FormField 
        ref={ numberInput }
        error={ numberError }
        ID="bank-account-number-input" 
        label="_transaction.Account_number" 
        type="tel"
        required={true}
        minLength={10}
        maxLength={10}
        value={ account.account_number }
        />

      <FormSelect 
        ref={ typeInput }
        error={ typeError }
        ID="bank-account-type-input" 
        label="_transaction.Account_type" 
        required={true}
        value={ account.account_type }
        options={[
          { key: 'savings', value: 'Savings' },
          { key: 'current', value: 'Current' }
        ]}
        />

      <FormButton text="_extra.Submit" />

      { dialog && <LoadingDialog /> }

    </form>
  );
}

