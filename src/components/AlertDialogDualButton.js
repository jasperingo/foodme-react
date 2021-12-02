
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function AlertDialogDualButton({ onGood, onBad, badText = '_extra.Cancel', goodText = '_extra.Submit' }) {

  const { t } = useTranslation();

  return (
    <div className="flex gap-4 justify-end">
      <button className="text-yellow-500 font-bold p-2 hover:bg-color-gray-h" type="button" onClick={onBad}>
        { t(badText) }
      </button>
      <button className="text-yellow-500 font-bold p-2 hover:bg-color-gray-h" type="button" onClick={onGood}>
        { t(goodText) }
      </button>
    </div>
  );
}
