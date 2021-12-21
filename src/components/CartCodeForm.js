
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import SavedCartApi from '../api/SavedCartApi';
import { CART } from '../context/AppActions';
import { useAppContext } from '../context/AppContext';
import AlertDialog, { LOADING_DIALOG } from './AlertDialog';

export default function CartCodeForm() {

  const { t } = useTranslation();

  const { 
    cartDispatch
  } = useAppContext();

  const input = useRef(null);

  const [dialog, setDialog] = useState(null);

  const api = new SavedCartApi();

  function onFormSubmit(e) {
    e.preventDefault();

    if (input.current.validity.valid) {
      setDialog(LOADING_DIALOG);
      api.get(input.current.value)
        .then((res)=> {
          cartDispatch({
            type: CART.DUMPED,
            payload: res.data
          });
          setDialog(null);
        })
        .catch(()=> {
          setDialog({
            body: '_errors.Something_went_wrong',
            negativeButton: {
              text: '_extra.Cancel',
              action() {
                setDialog(null);
              }
            }
          });
        });
    }
  }

  return (
    <div className="container-x">
      <form className="py-3 flex gap-2" action="" method="GET" onSubmit={onFormSubmit} noValidate>
        <label className="sr-only">{ t('_cart.Enter_cart_code')}</label>
        <input 
          ref={ input }
          type="text" 
          required={true}
          placeholder={ t('_cart.Enter_cart_code')}
          className="p-2 flex-grow rounded outline-none border border-yellow-500 bg-color" 
          />
        <button className="p-2 rounded btn-color-primary">{ t('_search.Search') }</button>
      </form>
      { dialog && <AlertDialog dialog={dialog} /> }
    </div>
  );
}
