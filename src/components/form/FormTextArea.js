
import React, { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import FormLabel from './FormLabel';

const FormTextArea = forwardRef(function({ ID, label, value, error, required, minLength, maxLength }, ref) {

  const { t } = useTranslation();

  const borderColor = !error ? 'border-yellow-500' : 'border-red-500';

  return (
    <div className="mb-4">
      <FormLabel ID={ID} label={label} required={required} />
      <textarea 
        ref={ ref }
        id={ ID }
        defaultValue={ value }
        style={{minHeight: '80px'}}
        placeholder={ `${t(label)} ${!required ? `(${t('_extra.optional')})` : ''}` }
        className={ `inline-block w-full border bg-color focus:outline-none rounded p-2 ${borderColor}` } 
        required={ required }
        minLength={ minLength }
        maxLength={ maxLength }
        >
      </textarea>
      <div className="text-red-500 text-sm">{ t(error) }</div>
    </div>
  );
});

export default FormTextArea;
