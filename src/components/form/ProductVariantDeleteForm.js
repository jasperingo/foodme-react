
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import AlertDialog from '../dialog/AlertDialog';
import LoadingDialog from '../dialog/LoadingDialog';
import FormButton from './FormButton';
import FormMessage from './FormMessage';

export default function ProductVariantDeleteForm({ onSubmit, dialog, formError, formSuccess, product }) {

  const history = useHistory();

  const [confirmDialog, setConfirmDialog] = useState(null);

  function onDeleteSubmit(e) {
    e.preventDefault();

    setConfirmDialog({
      body: '_product._product_variant_delete_confirm',
      positiveButton: {
        text: '_extra.Yes',
        action() {
          onSubmit();
          setConfirmDialog(null);
        }
      },
      negativeButton: {
        text: '_extra.No',
        action() {
          setConfirmDialog(null);
        }
      }
    });
  }
  
  useEffect(
    ()=> {
      if (formSuccess) {
        history.push(`/product/${product}`);
      }
    }, 
    [formSuccess, product, history]
  );

  return (
    <form method="POST" action="" className="form-1-x" onSubmit={onDeleteSubmit}>

      <FormMessage 
        error={formError} 
        success={formSuccess} 
        />

      <FormButton text="_extra.Delete" color='btn-color-red' />

      { dialog && <LoadingDialog /> }

      { confirmDialog && <AlertDialog dialog={confirmDialog} /> }

    </form>
  );

}
