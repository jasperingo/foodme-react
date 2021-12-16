
import React from 'react';
import FormButton from './FormButton';
import FormField from './FormField';

export default function PromotionForm({ type, promotion }) {

  function onFormSubmit(e) {
    e.preventDefault();

  }

  return (
    <form method="POST" action="" onSubmit={onFormSubmit} className="form-1-x">

      <FormField 
        ID="title-input" 
        label="_extra.Title"
        required={true}
        value={ promotion.title }
        />
      
      <FormField
        ID="amount-input"
        label="_extra.Amount"
        required={true}
        value={ promotion.deduction_amount }
        />
      
      <FormField
        ID="percent-input"
        label="_extra.Percent"
        required={true}
        value={ promotion.deduction_percent }
        />

      <FormField
        ID="start-date-input"
        label="_extra.Start"
        required={true}
        value={ promotion.start_time }
        />

      <FormField
        ID="end-date-input"
        label="_extra.End"
        required={true}
        value={ promotion.stop_time }
        />

      <FormButton text="_extra.Submit" />

    </form>
  );
}

PromotionForm.ADD = 'add';
PromotionForm.UPDATE = 'update';

