
import React from 'react';
import { useTranslation } from 'react-i18next';
import Dialog from './Dialog';


function DialogButton({ btn }) {

  const { t } = useTranslation();

  return (
    <button 
      onClick={btn.action}
      className={`flex-grow py-2 border-t hover:bg-color-gray-h ${btn.color}`}
      >
      { t(btn.text) }
    </button>
  );
}

export default function AlertDialog({ dialog }) {
  
  const { t } = useTranslation();

  return (
    <Dialog>
      <div className="p-4">{ t(dialog.body) }</div>
      <div className="flex">
        { dialog.negativeButton && <DialogButton btn={dialog.negativeButton} /> }
        { dialog.positiveButton && <DialogButton btn={dialog.positiveButton} /> }
      </div>
    </Dialog>
  );
}

