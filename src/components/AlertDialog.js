
import React from 'react';
import { useTranslation } from 'react-i18next';

function DialogButton({ text, negative, action }) {

  const { t } = useTranslation();

  return (
    <button 
      onClick={action}
      className={`flex-grow py-2 hover:bg-color-gray-h ${negative && 'border-r text-red-500'}`}
      >
      { t(text) }
    </button>
  );
}

export default function AlertDialog({ body, positiveButton, negativeButton }) {

  const { t } = useTranslation();

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-25">
      <div className="fixed top-1/3 w-3/4 bg-color rounded border" style={{left: '12.5%'}}>
        <div className="p-4">{ t(body) }</div>
        <div className="flex border-t">
          { negativeButton && <DialogButton text={negativeButton.text} negative={true} action={negativeButton.action} /> }
          { positiveButton && <DialogButton text={positiveButton.text} negative={false} action={positiveButton.action} /> }
        </div>
      </div>
    </div>
  );
}

