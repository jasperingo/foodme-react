
import React from 'react';
import { editIcon } from '../../assets/icons';
import ProfileLink from '../profile/ProfileLink';

export default function RouteLocationItem({ isDelieryFirm, location: { id, state, city } }) {

  return (
    <li>
      <div className="mb-2 shadow rounded p-2 flex gap-2 items-center">
        <div className="font-bold flex-grow">{ city } - { state }</div>
        {
          isDelieryFirm &&
          <ProfileLink href={`/delivery-route-location/${id}/update`} title="_extra.Edit" icon={editIcon} />
        }
      </div>
    </li>
  );
}
