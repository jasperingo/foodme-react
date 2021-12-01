
import React, { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';

const FormSelect = forwardRef(function ({ ID, label, error, value = '', options = [], required }, ref) {

  const { t } = useTranslation();

  const borderColor = !error ? 'border-yellow-500' : 'border-red-500';

  return (
    <div className="mb-4">
      <label htmlFor={ID} className="sr-only">{ t(label) }</label>
      <select 
        ref={ ref }
        id={ ID }
        defaultValue={ value }
        className={ `inline-block w-full border bg-color focus:outline-none rounded font-bold p-2 ${borderColor}` } 
        required={ required }
        >
        <option disabled value="">{ `${t(label)} ${!required ? `(${t('_extra.optional')})` : ''}` }</option>
        {
          options.map((item, i)=> <option key={i} value={item}>{ item }</option>)
        }
      </select>

      <div className="text-red-500 text-sm">{ t(error) }</div>
    </div>
  );
});


export default FormSelect;


