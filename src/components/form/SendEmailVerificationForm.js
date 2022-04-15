
import React, { useState } from 'react';
import AlertDialog from '../dialog/AlertDialog';
import LoadingDialog from '../dialog/LoadingDialog';
import FormButton from './FormButton';
import FormMessage from './FormMessage';

export default function SendEmailVerificationForm({ email, onSubmit, loading, formError, formSuccess }) {

  const [confirmDialog, setConfirmDialog] = useState(null);

  function onDeleteSubmit(e) {
    e.preventDefault();

    setConfirmDialog({
      body: '_user.Send_email_verification_confirm',
      positiveButton: {
        text: '_extra.Yes',
        action() {
          onSubmit(email);
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

      <FormButton text="_user.Send_email_verification" />

      { loading && <LoadingDialog /> }
      { confirmDialog && <AlertDialog dialog={confirmDialog} /> }

    </form>
  );
}
