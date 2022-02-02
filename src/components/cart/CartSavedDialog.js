
import Icon from '@mdi/react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { copyIcon } from '../../assets/icons';
import { useCopyText } from '../../hooks/viewHook';
import AlertDialogButton from '../dialog/AlertDialogButton';
import Dialog from '../dialog/Dialog';

export default function CartSavedDialog({ dialog: { code, onDone } }) {

  const { t } = useTranslation();

  const [copied, setCopied] = useState(false);

  const copy = useCopyText();

  function copyCode() {
    copy(code);
    setCopied(true);
  }

  return (
    <Dialog>
      <div className="text-center">
        <div className="p-2">
          <div className="text-green-500 font-bold text-lg mb-2">{ t('_cart.Cart_saved') }</div>
          <div className="flex gap-2 items-center border rounded">
            <div className="flex-grow">{ code }</div>
            <button className="btn-color-primary p-2 rounded" onClick={copyCode}>
              <Icon path={copyIcon} className="w-5 h-5" />
            </button>
          </div>
          { copied && <div className="text-sm bg-color-gray px-2 py-1 mt-2 rounded-full">{ t('_extra.Copied') }!</div> }
        </div>
        <div className="flex">
          <AlertDialogButton btn={{ action: onDone, text: '_extra.Done' }} /> 
        </div>
      </div>
    </Dialog>
  );
}
