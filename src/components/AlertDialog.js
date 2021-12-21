
import React from 'react';
import { useTranslation } from 'react-i18next';
import Loading from './Loading';


export const LOADING_DIALOG = {
  body: {
    layout() {
      return <Loading />
    }
  }
};

export const LOADING_TEXT_DIALOG = (text)=> {
  return { 
    body: {
      layout() {
        return (
          <div>
            <div className="text-center">{ text }</div>
            <Loading />
          </div>
        );
      }
    }
  }
};

function DialogButton({ btn, negative }) {

  const { t } = useTranslation();

  return (
    <button 
      onClick={btn.action}
      className={`flex-grow py-2 border-t hover:bg-color-gray-h ${negative && 'border-r text-red-500'}`}
      >
      { t(btn.text) }
    </button>
  );
}

function AlertLayout({ dialog }) {

  const { t } = useTranslation();

  return (
    <>
      <div className="p-4">{ dialog.body.layout ? dialog.body.layout() : t(dialog.body) }</div>
      <div className="flex">
        { dialog.negativeButton && <DialogButton btn={dialog.negativeButton} negative={true} /> }
        { dialog.positiveButton && <DialogButton btn={dialog.positiveButton} negative={false} /> }
      </div>
    </>
  );
}

export default function AlertDialog({ dialog }) {
  
  return (
    <div className="fixed flex items-center justify-center z-50 top-0 left-0 w-full h-full bg-black bg-opacity-25 dark:bg-white">
      <div className="w-3/4 bg-color rounded md:w-1/2 lg:w-1/3">
        { dialog.layout ? dialog.layout() : <AlertLayout dialog={dialog} /> }
      </div>
    </div>
  );
}

