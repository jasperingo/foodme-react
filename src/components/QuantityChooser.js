
import React from 'react'
import { useTranslation } from 'react-i18next';
import AddRoundIcon from '../icons/AddRoundIcon';
import RemoveRoundIcon from '../icons/RemoveRoundIcon';

function QuantityChangeButton({ text, Icon, negative, onButtonClicked }) {

  const { t } = useTranslation();

  return (
    <button onClick={()=> onButtonClicked(negative ? -1 : 1)}>
      <Icon classList="fill-current text-color-primary" />
      <span className="sr-only">{ t(text) }</span>
    </button>
  );
}

export default function QuantityChooser({ quantity, unit, onQuantityChanged }) {
  return (
    <div className="flex gap-2 items-center flex-grow">
      <QuantityChangeButton
        negative={true}
        Icon={RemoveRoundIcon} 
        text="_product.Decrease_quantity" 
        onButtonClicked={onQuantityChanged}
        />
      <span className="inline-block px-2 shadow">{ quantity }</span>
      <QuantityChangeButton 
        negative={false}
        Icon={AddRoundIcon}
        text="_product.Increase_quantity"  
        onButtonClicked={onQuantityChanged}
        />
      <div>{ unit }</div>
    </div>
  );
}
