
import Icon from '@mdi/react';
import React, { useState, useEffect, useCallback } from 'react';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import API from '../api/API';
import { minusIcon } from '../assets/icons';
import { FETCH_STATUSES } from '../context/AppActions';
import AlertDialog, { LOADING_TEXT_DIALOG } from './AlertDialog';

export default function PhotoChooser({ api, apiID, src, text = '_extra.Add_photo', status, required, onSuccess, onError }) {

  const { t } = useTranslation();

  const photoInput = useRef(null);

  const [photo, setPhoto] = useState(src);

  const [choosen, setChoosen] = useState(false);

  const [dialog, setDialog] = useState(null);

  const reset = useCallback(() => {
    setPhoto(src);
    setChoosen(false);
    photoInput.current.value = null;
  }, [src]);

  function photoChoosen() {
    
    let reader = new FileReader();

    reader.onload = function (e) {
      setChoosen(true);
      setPhoto(e.target.result);
    }

    reader.readAsDataURL(photoInput.current.files[0]);
  }

  useEffect(()=> {
    
    if (status === FETCH_STATUSES.LOADING && photoInput.current.files[0]) {

      setDialog(LOADING_TEXT_DIALOG(t('_extra.Uploading_photo')));

      const form = new FormData();
      form.append('photo', photoInput.current.files[0]);

      api.contentType = API.FILE_CONTENT_TYPE;

      api.updatePhoto(apiID, form)
        .then(res=> {
          reset();
          onSuccess(res);
        })
        .catch(onError);

    } else if (status === FETCH_STATUSES.LOADING && photoInput.current.files[0] === undefined) {
      onSuccess(null);
    } else if (dialog !== null) {
      setDialog(null);
    }
  }, [t, reset, status, api, apiID, dialog, onSuccess, onError]);

  return (
    <div className="text-center mb-4">
      <div className="my-4 relative">
        { 
          choosen && <button type="button" className="absolute top-0 ml-8" title={t('_extra.Remove_photo')} onClick={reset}>
            <Icon path={minusIcon} className="w-6 h-6 text-red-500" />
            <span className="sr-only">{ t('_extra.Remove_photo') }</span>
          </button> 
        }
        <img src={photo} alt="product" width="100" height="100" className="w-32 h-32 rounded-full mx-auto border" />
      </div>
      <div className="relative">
        <input ref={ photoInput } id="photo-input" type="file" className="p-2 w-full" accept="image/*" required={required} onChange={photoChoosen} />
        <label htmlFor="photo-input" type="button" className="btn-color-primary p-2 rounded absolute left-0 top-0 w-full">{ t(text) }</label>
      </div>
      { dialog && <AlertDialog dialog={dialog} /> }
    </div>
  );
}


