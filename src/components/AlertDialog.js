
import React from 'react';
import { useTranslation } from 'react-i18next';

function DialogButton({ btn, negative }) {

  const { t } = useTranslation();

  return (
    <button 
      onClick={btn.action}
      className={`flex-grow py-2 hover:bg-color-gray-h ${negative && 'border-r text-red-500'}`}
      >
      { t(btn.text) }
    </button>
  );
}

export default function AlertDialog({ dialog }) {

  const { t } = useTranslation();

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-25 dark:bg-white">
      <div className="fixed top-1/3 w-3/4 bg-color rounded" style={{left: '12.5%'}}>
        <div className="p-4">{ t(dialog.body) }</div>
        <div className="flex border-t">
          { dialog.negativeButton && <DialogButton btn={dialog.negativeButton} negative={true} /> }
          { dialog.positiveButton && <DialogButton btn={dialog.positiveButton} negative={false} /> }
        </div>
      </div>
    </div>
  );
}

