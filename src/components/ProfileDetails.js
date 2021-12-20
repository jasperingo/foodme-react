
import Icon from '@mdi/react';
import React from 'react';


function Detail({ icon, data }) {
  return (
    <li className="inline-flex">
      <div className="bg-color-gray text-color flex items-center px-2 py-1 rounded mr-2 mb-2">
        <Icon path={icon} className="inline-block w-5 h-5 " />
        <span className="inline-block ml-1 text-sm">{ data }</span>
      </div>
    </li>
  );
}

export default function ProfileDetails({ details = [] }) {

  return (
    <ul className="py-2">
      {
        details.map((item, index)=> (
          <Detail key={`profile-${index}`} icon={item.icon} data={item.data} />
        ))
      }
    </ul>
  )
}
