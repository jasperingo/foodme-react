
import Icon from '@mdi/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { locationIcon } from '../../assets/icons';

export default function DeliveryFirmItem(
  { 
    deliveryFirm: {  
      id,
      user: {
        photo,
        name,
        addresses
      }
    }, 
    href = '/delivery-firm' 
  }
) {
  return (
    <li>
      <Link to={`${href}/${id}`} className="flex gap-2 mb-4 bg-color hover:bg-color-gray-h md:block md:shadow">
        <img src={ photo.href } alt={name} className="w-20 h-20 border rounded block md:w-full md:h-full" />
        <div className="flex-grow md:p-2">
          <div className="font-bold mb-1">{ name }</div>
          {
            addresses[0] && 
            <div className="text-color-gray mb-2 flex items-start gap-1">
              <Icon path={locationIcon} className="inline-block w-5 h-5" />
              <span className="inline-block text-sm">{ `${addresses[0].street}, ${addresses[0].city}, ${addresses[0].state}` }</span>
            </div>
          }
        </div>
      </Link>
    </li>
  );
}
