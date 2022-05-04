
import React from 'react';
import { Link } from 'react-router-dom';
import ProfileButton from './ProfileButton';
import ProfileLink from './ProfileLink';

export default function ProfileHeader({ photo, name, category, links=[], buttons=[] }) {

  const actions = links.concat(buttons);

  return (
    <div className="flex items-center my-4 gap-2">
      <img 
        src={ photo } 
        alt={ name } 
        className="w-12 h-12 md:w-16 md:h-16 border rounded-full" 
        />
      <div className="flex-grow ">
        <h3 className="font-bold md:text-xl">{ name }</h3> 
        {
          category && <Link to={`/category/${category.id}`} className="text-sm">{category.name}</Link>
        }
      </div>
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
                icon={item.icon}
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
