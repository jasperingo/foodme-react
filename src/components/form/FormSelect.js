
import React, { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import FormLabel from './FormLabel';

const FormSelect = forwardRef(function ({ ID, label, error, value = '', options = [], required, onChange }, ref) {

  const { t } = useTranslation();

  const borderColor = !error ? 'border-yellow-500' : 'border-red-500';
  
  return (
    <div className="mb-4">
      <FormLabel ID={ID} label={label} required={required} />
      <select 
        ref={ ref }
        id={ ID }
        onChange={ onChange }
        defaultValue={ value }
        className={ `inline-block w-full border bg-color focus:outline-none rounded p-2 ${borderColor}` } 
        required={ required }
        >
        <option value="">{ `--${t(label)}${!required ? ` (${t('_extra.optional')})` : ''}--` }</option>
        {
          options.map((item, i)=> <option key={i} value={item.key}>{ item.value }</option>)
        }
      </select>

      <div className="text-red-500 text-sm">{ t(error) }</div>
    </div>
  );
});


export default FormSelect;


