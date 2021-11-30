
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function PhotoChooser({ src, text = '_extra.Add_photo' }) {

  const { t } = useTranslation();

  return (
    <div className="text-center mb-4">
      <img src={src} alt="product" width="100" height="100" className="w-32 h-32 rounded-full mx-auto my-4" />
      <div className="relative">
        <input id="photo-input" type="file" className="p-2 w-full" accept="image/*" />
        <label htmlFor="photo-input" type="button" className="btn-color-primary p-2 rounded absolute left-0 top-0 w-full">{ t(text) }</label>
      </div>
    </div>
  );
}
