
import React from 'react';
import ProfileButton from './ProfileButton';
import ProfileLink from './ProfileLink';


export default function ProfileHeaderText({ text, links=[], buttons=[] }) {

  const actions = links.concat(buttons);

  return (
    <div className="my-4 flex items-center flex-wrap gap-4">
      <h3 className="flex-grow font-bold text-3xl">{ text }</h3> 
      <ul className="flex flex-wrap gap-2 mt-2">
        {
          actions.map((item, i)=> (
            item.href ? 
              <ProfileLink 
                key={`profile-link-${i}`} 
                href={item.href} 
                title={item.title} 
                icon={item.icon} 
                /> 
              :
              <ProfileButton 
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
