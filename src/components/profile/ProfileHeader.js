
import React from 'react';
import ProfileButton from './ProfileButton';
import ProfileLink from './ProfileLink';

export default function ProfileHeader({ photo, name, links=[], buttons=[] }) {

  const actions = links.concat(buttons);

  return (
    <div className="flex items-center my-4 gap-2">
      <img 
        src={ photo } 
        alt={ name } 
        className="w-10 h-10 md:w-16 md:h-16 border rounded-full" 
        />
      <h3 className="flex-grow font-bold md:text-xl">{ name }</h3> 
      <ul className="flex flex-wrap gap-2">
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
