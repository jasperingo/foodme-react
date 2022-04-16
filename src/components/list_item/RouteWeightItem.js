
import React from 'react';
import { editIcon } from '../../assets/icons';
import { useMoneyFormatter } from '../../hooks/viewHook';
import ProfileLink from '../profile/ProfileLink';

export default function RouteWeightItem({ isDelieryFirm, weight: { id, minimium, maximium, fee } }) {

  const moneyFormat = useMoneyFormatter();

  return (
    <li>
      <div className="mb-2 shadow rounded p-2 flex gap-2 items-center">
        <div className="flex-grow">
          <div className="text-color-primary">{minimium } - {maximium} kg</div>
          <div className="font-bold">{ moneyFormat(fee) }</div>
        </div>
        {
          isDelieryFirm &&
          <ProfileLink href={`/delivery-route-weight/${id}/update`} title="_extra.Edit" icon={editIcon} />
        }
      </div>
    </li>
  );
}
