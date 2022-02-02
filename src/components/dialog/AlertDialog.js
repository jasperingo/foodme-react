
import React from 'react';
import { useTranslation } from 'react-i18next';
import AlertDialogButton from './AlertDialogButton';
import Dialog from './Dialog';

export default function AlertDialog({ dialog }) {
  
  const { t } = useTranslation();

  return (
    <Dialog>
      <div className="p-4">{ t(dialog.body) }</div>
      <div className="flex">
        { dialog.negativeButton && <AlertDialogButton btn={dialog.negativeButton} /> }
        { dialog.positiveButton && <AlertDialogButton btn={dialog.positiveButton} /> }
      </div>
    </Dialog>
  );
}

