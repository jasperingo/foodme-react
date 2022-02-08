
import Icon from '@mdi/react';
import React, { useState, forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { visibilityIcon, visibilityOffIcon } from '../../assets/icons';

const FormField = forwardRef(function ({ ID, label, type, error, value = '', required, minLength, maxLength, step, min, max, tip }, ref) {

  const { t } = useTranslation();

  const [visible, setVisible] = useState(false);

  const borderColor = !error ? 'border-yellow-500' : 'border-red-500';

  const padding = type === 'password' ? 'p-2 pr-12' : 'p-2';

  function toggleVisibility() {
    setVisible(!visible);
  }

  return (
    <div className="mb-4">
      <label htmlFor={ID} className="sr-only">{ t(label) }</label>
      <input 
        ref={ ref }
        id={ ID }
        defaultValue={ value }
        placeholder={ `${t(label)} ${!required ? `(${t('_extra.optional')})` : ''}` }
        type={ type === 'password' && visible ? 'text' : (type || 'text') }
        className={ `inline-block w-full border bg-color focus:outline-none rounded ${borderColor} ${padding}` } 
        required={ required }
        minLength={ minLength }
        maxLength={ maxLength }
        step={ step }
        min={ min }
        max={ max }
        />
        {
          type === "password" && <button type="button" className="-ml-8 hover:bg-color-gray-h" onClick={toggleVisibility}>
            <Icon path={visible ? visibilityOffIcon : visibilityIcon} className="w-5 h-5 inline-block" />
          </button>
        }
        <div className="text-red-500 text-sm">{ t(error) }</div>
        <div className="text-color-gray text-sm mt-1">{ t(tip) }</div>
    </div>
  );
});


export default FormField;
