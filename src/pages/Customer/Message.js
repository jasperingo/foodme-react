
import Icon from '@mdi/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { checkIcon, sendIcon } from '../../assets/icons';


function MessageItem({ from, content, date, status }) {

  return (
    <li className={`px-2 py-4 flex ${from===0 && 'justify-end'}`}>
      <div className={`p-2 rounded-lg border ${from===0 ? 'border-yellow-500' : 'border-black'}`} style={{maxWidth: '80%'}}>
        <div>{ content }</div>
        <div className="flex justify-end gap-2">
          <Icon path={checkIcon} className="w-5 h-5 text-blue-500" />
          <span className="text-color-gray">{ date }</span>
        </div>
      </div>
    </li>
  );
}

export default function Message() {

  const { t } = useTranslation();

  return (
    <section className="flex-grow">
      <div className="bg-color-primary p-2 flex items-center gap-2">
        <img src="/photos/user.jpg" alt="Gift" width="50" height="50" className="w-12 h-12 rounded-full" />
        <div className="text-xl text-white">Jobs market place</div>
      </div>

      <div className="container-x">
        <ul>
          <MessageItem 
            from={1}
            content="Lorem ipsum dolor sit amet, consectetur adipisicing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam."
            date="20 June 2021"
            />
          <MessageItem 
            from={0}
            content="Lorem ipsum dolor sit amet, consectetur adipisicing elit?"
            date="20 June 2021"
            />
        </ul>
      </div>

      <form 
        onSubmit={(e)=> e.preventDefault()} 
        className="w-full px-4 bg-color flex gap-2 fixed z-10 border-t bottom-0 left-0 py-3"
        >
        <textarea 
          style={{minHeight: '40px'}}
          placeholder={ t('_message.Say_something') }
          className="h-10 rounded-3xl px-4 py-2 bg-color-gray outline-none flex-grow max-h-60" 
        ></textarea>
        <button className="w-10 h-10 rounded-full btn-color-primary inline-flex justify-center items-center">
          <span className="sr-only">{ t('_message.Send') }</span>
          <Icon path={sendIcon} className="w-6 h-6" />
        </button>
      </form>
    </section>
  );
}



