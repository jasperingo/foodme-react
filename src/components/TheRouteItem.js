
import Icon from '@mdi/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { leftRightIcon } from '../assets/icons';
import { useMoneyFormat } from '../context/AppHooks';

function Location({ location, index }) {
  return (
    <>
      { index > 0 && <Icon path={leftRightIcon} className="w-4 h-4" /> }
      <div>{ location }</div>
    </>
  )
}

export default function TheRouteItem({ route }) {

  const maxAmount = useMoneyFormat(route.max_price || -1);

  return (
    <li>
      <Link to={`route/${route.id}`} className="block mb-4 py-2 rounded md:px-2 md:shadow hover:bg-color-gray-h">
        <div className="flex gap-2 items-center mb-1">
          {
            route.locations.map((item, i)=> <Location key={`route-location-${i}`} location={item} index={i} />)
          }
        </div>
        <div className="font-bold text-color-primary">
          { useMoneyFormat(route.min_price) } 
          { route.max_price && ' - ' } 
          { route.max_price && maxAmount } 
        </div>
      </Link>
    </li>
  );
}
