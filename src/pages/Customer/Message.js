
import React from 'react';
import { useTranslation } from 'react-i18next';
import SendIcon from '../../icons/SendIcon';

export default function Message() {

  const { t } = useTranslation();

  return (
    <section className="flex-grow relative" style={{
      minHeight: '500px'
    }}>
      <div className="container-x py-20">
      
        <form onSubmit={(e)=> e.preventDefault()} className="w-full flex gap-2 absolute bottom-0 left-0">
          <textarea className="h-10 rounded-3xl px-4 py-2 bg-color-gray outline-none flex-grow" placeholder={ t('_message.Say_something') }></textarea>
          <button className="w-10 h-10 rounded-full btn-color-primary inline-flex justify-center items-center">
            <span class="sr-only">{ t('_message.Send') }</span>
            <SendIcon className="text" />
          </button>
        </form>
      </div>
    </section>
  );
}



