
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMoneyFormat } from '../hooks/viewHook';
import WithdrawDialog from './dialog/WithdrawDialog';

export default function WalletAmount({ amount, onSubmitWithdraw, withdrawDialog, withdrawFormError, withdrawFormSuccess }) {

  const { t } = useTranslation();

  const [dialog, setDialog] = useState(false);

  return (
    <div className="my-4 rounded py-4 px-2 bg-color-gray md:px-4 md:flex md:items-center">
      <h3 className="text-3xl md:flex-grow">{ useMoneyFormat(amount ?? 0) }</h3>
      <div className="mt-2">
        <button className="btn-color-primary rounded-full p-2" onClick={()=> setDialog(true)}>{ t('_transaction.Withdraw') }</button>
      </div>

      { 
        dialog && 
        <WithdrawDialog 
          amount={amount} 
          sendIt={onSubmitWithdraw} 
          dialog={withdrawDialog} 
          closeIt={()=> setDialog(false)} 
          formError={withdrawFormError}
          formSuccess={withdrawFormSuccess}
          /> 
        }
    </div>
  );
}
