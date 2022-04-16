
import Icon from '@mdi/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { routeIcon } from '../../assets/icons';
import { useMoneyFormatter } from '../../hooks/viewHook';

export default function DeliveryRouteItem(
  { 
    route: {
      id,
      name,
      route_weights: [ weight ]
    }
  }
) {

  const { t } = useTranslation();

  const moneyFormat = useMoneyFormatter();

  return (
    <Link 
      to={`/delivery-route/${id}`} 
      className="block mb-4 py-2 rounded md:px-2 md:shadow hover:bg-color-gray-h"
      >
      <div className="flex gap-2">
        <Icon path={routeIcon} className="w-10 h-10 text-color-primary" />
        <div>
          
          <div className="mb-1">{ name }</div>

          {
            weight?.fee ?
            <div className="font-bold mb-1">{ moneyFormat(weight.fee) }</div> :
            <div className="italic mb-1 text-red-500">{ t('_extra.No_price') }</div>
          }

        </div>
      </div>
    </Link>
  );
}
