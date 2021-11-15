
import React from 'react';
import { useTranslation } from 'react-i18next';
import CustomerApp from '../apps/CustomerApp';
import { useAppContext } from '../context/AppContext';
import { useMoneyFormat } from '../context/AppHooks';

export default function CartCheckOutOrSave({ appType }) {
  
  const { t } = useTranslation();

  const { cart: {cartItems} } = useAppContext();

  return (
    <div className="lg:w-80 lg:py-10 lg:px-4 lg:shadow lg:rounded">
      <div className="flex items-center mb-2">
        <strong className="font-normal text-sm flex-grow">{ t('_extra.Total') }: </strong>
        <span className="font-bold text-lg">{ useMoneyFormat(cartItems.reduce((sum, i)=> i!==null ? sum+i.amount : sum, 0)) }</span>
      </div>
    
      {
        appType === CustomerApp.TYPE && 
        <button 
          className="w-full py-3 my-2 rounded btn-color-primary" 
          onClick={()=> alert('Checking out...')}
          >
          { t('_cart.Check_out') }
        </button>
      }

      <button 
        className="w-full py-3 my-2 rounded btn-color-blue" 
        onClick={()=> alert('Saving cart...')}
        >
        { t('_extra.Save') }
      </button>
    </div>
  );
}
