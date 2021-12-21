
import Icon from '@mdi/react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import SavedCartApi from '../api/SavedCartApi';
import CustomerApp from '../apps/CustomerApp';
import { copyIcon } from '../assets/icons';
import { useAppContext } from '../context/AppContext';
import { useCopyText, useMoneyFormat } from '../context/AppHooks';
import AlertDialog, { LOADING_DIALOG } from './AlertDialog';
import FormTextArea from './FormTextArea';

function CartSaved({ code }) {

  const { t } = useTranslation();

  const [copied, setCopied] = useState(false);

  const copy = useCopyText();

  function copyCode() {
    copy(code);
    setCopied(true);
  }

  return (
    <div className="text-center">
    <div className="text-green-500 font-bold text-lg mb-2">{ t('_cart.Cart_saved') }</div>
    <div className="flex gap-2 items-center border rounded mb-2">
      <div className="flex-grow">{ code }</div>
      <button className="btn-color-primary p-2 rounded" onClick={copyCode}>
        <Icon path={copyIcon} className="w-5 h-5" />
      </button>
    </div>
    { copied && <div className="text-sm bg-color-gray px-2 py-1 rounded-full">{ t('_extra.Copied') }!</div> }
  </div>
  );
}

export default function CartCheckOutOrSave({ appType }) {
  
  const { t } = useTranslation();

  const history = useHistory();

  const { 
    user: { user },
    cart: { cartItems } 
  } = useAppContext();

  const [dialog, setDialog] = useState(null);

  const saveApi = new SavedCartApi();

  function saveCart() {

    if (user === null) {
      history.push('/login');
      return;
    }

    setDialog(LOADING_DIALOG);

    saveApi.add(cartItems)
      .then(res=> {
        setDialog({
          body: {
            layout() {
              return <CartSaved code={res.data.code} />;
            }
          },
          positiveButton: {
            text: '_extra.Done',
            action() {
              setDialog(null);
            }
          }
        });
      })
      .catch(err=> {
        setDialog({
          body: '_errors.Cart_could_not_be_saved',
          negativeButton: {
            text: '_extra.Cancel',
            action() {
              setDialog(null);
            }
          }
        });
      });
    
  }

  return (
    <div className="lg:w-80 lg:py-10 lg:px-4 lg:shadow lg:rounded">
      <div className="flex items-center mb-2">
        <strong className="font-normal text-sm flex-grow">{ t('_extra.Total') }: </strong>
        <span className="font-bold text-lg">{ useMoneyFormat(cartItems.reduce((sum, i)=> i!==null ? sum+i.amount : sum, 0)) }</span>
      </div>

      {
        appType === CustomerApp.TYPE &&
        <FormTextArea 
          ID="order-note-input"
          label="_order.Order_note"
          />
      }
    
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
        onClick={saveCart}
        >
        { t('_extra.Save') }
      </button>
      
      { dialog && <AlertDialog dialog={dialog} /> }
    </div>
  );
}
