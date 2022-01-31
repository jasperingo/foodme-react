
import Icon from '@mdi/react';
import React from 'react'
import { useTranslation } from 'react-i18next';
import { addIcon, minusIcon } from '../assets/icons';

function QuantityChangeButton({ text, icon, negative, onButtonClicked }) {

  const { t } = useTranslation();

  return (
    <button onClick={()=> onButtonClicked(negative ? -1 : 1)}>
      <Icon path={icon} className="w-6 h-6 text-color-primary" />
      <span className="sr-only">{ t(text) }</span>
    </button>
  );
}

export default function QuantityChooser({ quantity, onQuantityChanged }) {
  return (
    <div className="flex gap-2 items-center">
      <QuantityChangeButton
        negative={true}
        icon={minusIcon} 
        text="_product.Decrease_quantity" 
        onButtonClicked={onQuantityChanged}
        />
      <span className="inline-block px-2 shadow">{ quantity }</span>
      <QuantityChangeButton 
        negative={false}
        icon={addIcon}
        text="_product.Increase_quantity"  
        onButtonClicked={onQuantityChanged}
        />
    </div>
  );
}
