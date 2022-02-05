
import React from 'react';
import { useMoneyFormatter } from '../../hooks/viewHook';
import EmptyList from '../EmptyList';
import H4Heading from '../H4Heading';
import UserDescList from '../UserDescList';
import ProfileDetailsText from './ProfileDetailsText';
import ProfileHeaderText from './ProfileHeaderText';

export default function DeliveryRouteProfile(
  {
    deliveryRoute: {
      id,
      state,
      city,
      origin_route,
      destination_route,
      delivery_route_weights,
      delivery_route_durations,
      delivery_firm
    }
  }
) {

  const moneyFormat = useMoneyFormatter();

  return (
    <div className="container-x">

      <ProfileHeaderText 
        text={state ? `${city}, ${state}` : `${origin_route.city}, ${origin_route.state} - ${destination_route.city}, ${destination_route.state}`} 
        />

      <UserDescList 
        users={[
          {
            href: `/delivery-firm/${delivery_firm.id}`,
            photo: delivery_firm.user.photo.href,
            name: delivery_firm.user.name,
            title: '_delivery.Delivery_firm'
          }
        ]} 
        />

      <div>
        <H4Heading text="_delivery.Delivery_durations" />
        <ProfileDetailsText
          details={delivery_route_durations.map(i=> 
            ({ title: `${i.minimium} - ${i.maximium} ${i.unit}s`, body: moneyFormat(i.fee) })
          )}
          />
        {
          delivery_route_durations.length === 0 &&
          <EmptyList text="_empty.No_delivery_duration" />
        }
      </div>

      <div>
        <H4Heading text="_delivery.Delivery_weights" />
        <ProfileDetailsText
          details={delivery_route_weights.map(i=> 
            ({ title: `${i.minimium} - ${i.maximium} kg`, body: moneyFormat(i.fee) })
          )}
          />
        {
          delivery_route_weights.length === 0 &&
          <EmptyList text="_empty.No_delivery_weight" />
        }
      </div>

    </div>
  );
}
