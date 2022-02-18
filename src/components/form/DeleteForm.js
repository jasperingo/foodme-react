
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AlertDialog from '../dialog/AlertDialog';
import LoadingDialog from '../dialog/LoadingDialog';
import FormButton from './FormButton';
import FormMessage from './FormMessage';

export default function DeleteForm({ confirmMessage, redirect, onSubmit, dialog, formError, formSuccess }) {
  
  const history = useHistory();

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
  
  useEffect(
    ()=> {
      if (formSuccess) {
        history.push(redirect);
      }
    }, 
    [formSuccess, history, redirect]
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
