
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import LoadingDialog from '../dialog/LoadingDialog';
import AlertDialog from '../dialog/AlertDialog';
import FormButton from './FormButton';
import FormMessage from './FormMessage';

export default function AddressDeleteForm({ onSubmit, dialog, formError, formSuccess }) {

  const history = useHistory();

  const [confirmDialog, setConfirmDialog] = useState(null);

  function onDeleteSubmit(e) {
    e.preventDefault();

    setConfirmDialog({
      body: '_user._address_delete_confirm',
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
        history.push('/addresses');
      }
    }, 
    [formSuccess, history]
  );

  return (
    <form method="POST" action="" className="form-1-x" onSubmit={onDeleteSubmit}>

      <FormMessage 
        error={formError} 
        success={formSuccess} 
        />

      <FormButton text="_user.Delete_address" color='btn-color-red' />

      { dialog && <LoadingDialog /> }
      { confirmDialog && <AlertDialog dialog={confirmDialog} /> }

    </form>
  );
}
