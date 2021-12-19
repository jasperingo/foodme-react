
import React from 'react';
import ProfileLink from './ProfileLink';

export default function ProfileHeader({ photo, name, links=[] }) {
  return (
    <div className="flex items-center my-4">
      <img 
        src={ photo } 
        alt={ name } 
        className="w-10 h-10 md:w-16 md:h-16 border rounded-full" 
        />
      <h4 className="flex-grow font-bold ml-2 md:text-xl">{ name }</h4> 
      <ul className="flex gap-2">
        {
          links.map((item, i)=> (
            <ProfileLink key={`profile-${i}`} href={item.href} title={item.title} icon={item.icon} />
          ))
        }
      </ul>
  </div>
  );
}
