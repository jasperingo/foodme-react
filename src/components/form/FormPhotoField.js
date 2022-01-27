
import Icon from '@mdi/react';
import React, { useState, useCallback, useEffect } from 'react';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { minusIcon } from '../../assets/icons';

export default function FormPhotoField({ src, alt, text = '_extra.Add_photo', onChoose, uploaded, required }) {

  const { t } = useTranslation();

  const photoInput = useRef(null);

  const [photo, setPhoto] = useState(src);

  const [choosen, setChoosen] = useState(false);

  const reset = useCallback(
    () => {
      setPhoto(src);
      onChoose(null);
      setChoosen(false);
      photoInput.current.value = null;
    }, 
    [onChoose, src]
  );

  function photoChoosen() {
    
    const reader = new FileReader();

    reader.onload = function (e) {
      setChoosen(true);
      setPhoto(e.target.result);
      onChoose(photoInput.current.files[0]);
    }

    reader.readAsDataURL(photoInput.current.files[0]);
  }

  useEffect(
    ()=> {
      if (uploaded === true) reset();
    },
    [uploaded, reset]
  );

  return (
    <div className="text-center mb-4">
      <div className="my-4 relative">
        { 
          choosen && <button type="button" className="absolute top-0 ml-8" title={t('_extra.Remove_photo')} onClick={reset}>
            <Icon path={minusIcon} className="w-6 h-6 text-red-500" />
            <span className="sr-only">{ t('_extra.Remove_photo') }</span>
          </button> 
        }
        <img src={photo} alt={alt} width="100" height="100" className="w-32 h-32 rounded-full mx-auto border" />
      </div>
      <div className="relative">
        <input ref={ photoInput } id="photo-input" type="file" className="p-2 w-full" accept="image/*" required={required} onChange={photoChoosen} />
        <label htmlFor="photo-input" type="button" className="btn-color-primary p-2 rounded absolute left-0 top-0 w-full">{ t(text) }</label>
      </div>

    </div>
  );
}


