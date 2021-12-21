
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import TransactionApi from '../api/TransactionApi';
import { FETCH_STATUSES, getWalletFetchStatusAction, WALLET } from '../context/AppActions';
import { useAppContext } from '../context/AppContext';
import { useDataRender, useMoneyFormat } from '../context/AppHooks';
import AlertDialog, { LOADING_DIALOG } from './AlertDialog';
import AlertDialogDualButton from './AlertDialogDualButton';
import FormField from './FormField';
import FormMessage from './FormMessage';
import Loading from './Loading';
import Reload from './Reload';

function WithdrawDialog({ amount, sendIt, closeIt, value='', error='' }) {

  const amountInput = useRef(null);

  const [formError, setFormError] = useState(error);

  function onFormSubmit(e) {
    e.preventDefault()
    validateWithdraw();
  }

  function validateWithdraw() {
    
    if (!amountInput.current.validity.valid) {
      if (amountInput.current.validity.rangeUnderflow) {
        setFormError('_errors._Minimium_withdrawal');
      } else if (amountInput.current.validity.rangeOverflow) {
        setFormError('_errors._Maximium_withdrawal');
      } else {
        setFormError('_errors.This_field_is_required');
      }
    } else {
      setFormError('');
      sendIt(amountInput.current.value);
    }

  }

  return (
    <form method="POST" action="" onSubmit={onFormSubmit} className="pt-8" noValidate>

      { formError && <FormMessage text={formError} /> }
      
      <FormField 
        ref={amountInput}
        ID="amount-input"
        label="_transaction.Amount"
        type="number"
        step="0.01"
        min={1000}
        max={amount}
        value={value}
        required={true}
        />

      <AlertDialogDualButton
        onBad={closeIt}
        onGood={validateWithdraw}
        />

    </form>
  );
}

function Amount({ amount, onWithdrawclicked }) {

  const { t } = useTranslation();
  
  return (
    <>
      <h3 className="text-3xl md:flex-grow">{ useMoneyFormat(amount) }</h3>
      <div className="mt-2">
        <button className="btn-color-primary rounded-full p-2" onClick={onWithdrawclicked}>{ t('_transaction.Withdraw') }</button>
      </div>
    </>
  )
}

export default function WalletAmount({ appType }) {

  const { 
    user: { user }, 
    transactions: {
      wallet: {
        wallet,
        walletFetchStatus
      },
    }, 
    transactionsDispatch 
  } = useAppContext();

  const [dialog, setDialog] = useState(null);

  const api = new TransactionApi(user.api_token);
  
  useEffect(()=>{
    if (walletFetchStatus === FETCH_STATUSES.LOADING) {
      api.getWallet(user.id, transactionsDispatch);
    }
  });

  function refetchWallet() {
    if (walletFetchStatus !== FETCH_STATUSES.LOADING) 
      transactionsDispatch(getWalletFetchStatusAction(FETCH_STATUSES.LOADING));
  }

  function withdrawFunds(amount) {
    setDialog(LOADING_DIALOG);
    api.withdraw({ amount })
      .then(res=> {
        setDialog({
          body: '_transaction.Your_withdrawal_is_being_processed',
          positiveButton: {
            text: '_extra.Done',
            action() {
              setDialog(null);
            }
          }
        });
        transactionsDispatch({
          type: WALLET.FETCHED,
          payload: { amount: (wallet-amount) }
        });
      })
      .catch(err=> {
        setDialog({
          body: '_errors.Your_withdrawal_could_not_be_processed',
          negativeButton: {
            text: '_extra.Done',
            action() {
              setDialog(null);
            }
          }
        });
      });
  }

  function getAmountToWithdraw() {

    setDialog({
      body: {
        layout() {
          return <WithdrawDialog amount={wallet} closeIt={()=> setDialog(null)} sendIt={withdrawFunds} />
        }
      }
    });
  }

  return (
    <div className="my-4 rounded py-4 px-2 bg-color-gray md:px-4 md:flex md:items-center">
      { 
        useDataRender(
          wallet, 
          walletFetchStatus,
          ()=> <Amount amount={wallet} onWithdrawclicked={getAmountToWithdraw} />,
          (k)=> <div className="container-x"> <Loading /> </div>, 
          (k)=> <div className="container-x"> <Reload action={refetchWallet} /> </div>,
        )
      }
      { dialog && <AlertDialog dialog={dialog} /> }
    </div>
  );
}
