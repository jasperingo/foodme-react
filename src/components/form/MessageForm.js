
import Icon from '@mdi/react';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { sendIcon } from '../../assets/icons';

export default function MessageForm({ onSend }) {

  const { t } = useTranslation();

  const [text, setText] = useState('');

  return (
    <form 
      onSubmit={(e)=> { 
        e.preventDefault();
        if (text.trim() !== '') {
          onSend(text);
          setText('');
        }
      }} 
      className="w-full flex gap-2 px-4 bg-color border-t py-3"
      >
      <textarea 
        style={{minHeight: '40px'}}
        value={text}
        onChange={(e)=> setText(e.target.value)}
        placeholder={ t('_message.Say_something') }
        className="h-10 rounded-3xl px-4 py-2 bg-color-gray outline-none flex-grow max-h-60" 
      ></textarea>
      <button className="w-10 h-10 rounded-full btn-color-primary inline-flex justify-center items-center">
        <span className="sr-only">{ t('_message.Send') }</span>
        <Icon path={sendIcon} className="w-6 h-6" />
      </button>
    </form>
  );
}
