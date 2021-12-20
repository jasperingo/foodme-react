
import React from 'react';
import { useTranslation } from 'react-i18next';

function Button({ text, color, action }) {
  const { t } = useTranslation()
  return (
    <li>
      <button className={`${color} px-2 py-1 rounded`} onClick={action}>{ t(text) }</button>
    </li>
  );
}

export default function ProfileHeaderText({ text, buttons=[] }) {
  return (
    <div className="my-4 md:flex md:items-center">
      <h3 className="flex-grow font-bold text-3xl">{ text }</h3> 
      <ul className="flex gap-2 mt-2">
        {
          buttons.map((item, i)=> (
            <Button 
              text={item.text}
              color={item.color}
              action={item.action}
              key={`profile-button-${i}`}
              />
          ))
        }
      </ul>
    </div>
  );
}
