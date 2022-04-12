
import React, { useState } from 'react';
import AlertDialog from '../dialog/AlertDialog';
import LoadingDialog from '../dialog/LoadingDialog';
import FormButton from './FormButton';
import FormMessage from './FormMessage';

export default function DeleteForm({ confirmMessage, onSubmit, dialog, formError, formSuccess }) {

  const [confirmDialog, setConfirmDialog] = useState(null);

  function onDeleteSubmit(e) {
    e.preventDefault();

    setConfirmDialog({
      body: confirmMessage,
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
