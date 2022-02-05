
import Icon from '@mdi/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { leftRightIcon, routeIcon } from '../../assets/icons';
import { useMoneyFormat } from '../../hooks/viewHook';

export default function DeliveryRouteItem(
  { 
    route: {
      id,
      state,
      city,
      route_weights: [ weight ],
      origin_route,
      destination_route
    }
  }
) {

  const { t } = useTranslation();

  const feeView = useMoneyFormat(weight?.fee || 0);

  return (
    <Link 
      to={`/delivery-route/${id}`} 
      className="block mb-4 py-2 rounded md:px-2 md:shadow hover:bg-color-gray-h"
      >
      <div className="flex gap-2">
        <Icon path={routeIcon} className="w-10 h-10 text-color-primary" />
        <div>
          { 
            state && 
            <div className="mb-1">{ city }, { state }</div>
          }
          {
            origin_route && 
            <div className="flex flex-wrap gap-2 items-center mb-1">
              <div>{ origin_route.city }, { origin_route.state }</div>
              <Icon path={leftRightIcon} className="w-4 h-4" />
              <div>{ destination_route.city }, { destination_route.state }</div>
            </div>
          }
          {
            weight?.fee ?
            <div className="font-bold mb-1">{ feeView }</div> :
            <div className="italic mb-1 text-red-500">{ t('_extra.No_price') }</div>
          }
        </div>
      </div>
    </Link>
  );
}
