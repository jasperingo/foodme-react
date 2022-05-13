
import React, { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const scrollOpts = { behavior: 'smooth' };

export default function FormMessage({ error, success }) {

  const { t } = useTranslation();

  const errorRef = useRef(null);

  const successRef = useRef(null);

  useEffect(
    function() {
      if (success) {
        successRef.current.scrollIntoView(scrollOpts);
      }

      if (error) {
        errorRef.current.scrollIntoView(scrollOpts);
      }
    },
    [success, error]
  );

  if (success)
    return (
      <div 
        ref={successRef} 
        className="bg-green-500 mb-4 p-2 text-white rounded text-sm"
      >
        { t(success) }
      </div>
    );

  if (error)
    return (
      <div 
        ref={errorRef} 
        className="bg-red-500 mb-4 p-2 text-white rounded text-sm"
      >
        { t(error) }
      </div>
    );

  return null;
}
