
import React from 'react';
import { useTranslation } from 'react-i18next';
import { editIcon } from '../../assets/icons';
import { useMoneyFormat, useRenderListFooter } from '../../hooks/viewHook';
import { FETCH_STATUSES } from '../../repositories/Fetch';
import AddButton from '../AddButton';
import EmptyList from '../EmptyList';
import H4Heading from '../H4Heading';
import SingleList from '../list/SingleList';
import UserDescList from '../UserDescList';
import ProfileDetailsText from './ProfileDetailsText';
import ProfileHeaderText from './ProfileHeaderText';
import ProfileLink from './ProfileLink';

function RouteDuration({ isDelieryFirm, duration: { id, minimium, maximium, unit, fee } }) {

  return (
    <li>
      <div className="mb-2 shadow rounded p-2 flex gap-2 items-center">
        <div className="flex-grow">
          <div className="text-color-primary">{minimium } - {maximium} {unit}</div>
          <div className="font-bold">{ useMoneyFormat(fee) }</div>
        </div>
        {
          isDelieryFirm &&
          <ProfileLink href={`/delivery-route-duration/${id}/update`} title="_extra.Edit" icon={editIcon} />
        }
      </div>
    </li>
  );
}

function RouteWeight({ isDelieryFirm, duration: { id, minimium, maximium, fee } }) {

  return (
    <li>
      <div className="mb-2 shadow rounded p-2 flex gap-2 items-center">
        <div className="flex-grow">
          <div className="text-color-primary">{minimium } - {maximium} kg</div>
          <div className="font-bold">{ useMoneyFormat(fee) }</div>
        </div>
        {
          isDelieryFirm &&
          <ProfileLink href={`/delivery-route-weight/${id}/update`} title="_extra.Edit" icon={editIcon} />
        }
      </div>
    </li>
  );
}

export default function DeliveryRouteProfile(
  {
    isDelieryFirm,
    deliveryRoute: {
      id,
      state,
      city,
      door_delivery,
      origin_route,
      destination_route,
      delivery_route_weights,
      delivery_route_durations,
      delivery_firm
    }
  }
) {

  const { t } = useTranslation();

  const details = [];

  if (state) {
    details.push({ 
      title: '_delivery.Door_delivery', 
      body: door_delivery ? t('_extra.Yes') : t('_extra.No') 
    });
  }

  if (origin_route) {
    details.push(
      { 
        title: '_delivery.Origin_route_door_delivery', 
        body: origin_route.door_delivery ? t('_extra.Yes') : t('_extra.No') 
      },
      { 
        title: '_delivery.Destination_route_door_delivery', 
        body: destination_route.door_delivery ? t('_extra.Yes') : t('_extra.No') 
      }
    );
  }

  return (
    <div className="container-x">

      <ProfileHeaderText 
        text={
          state ? 
          `${city}, ${state}` : 
          `${origin_route.city}, ${origin_route.state} - ${destination_route.city}, ${destination_route.state}` 
        } 
        links={
          isDelieryFirm ? 
          [
            {
              href: state ? `/delivery-route/${id}/update` : `/delivery-route/link/${id}/update`,
              title: '_extra.Edit',
              icon: editIcon
            }
          ]: 
          []
        }
        />

      <ProfileDetailsText
        details={details}
        />

      {
        !isDelieryFirm &&
        <UserDescList 
          users={[
            {
              href: isDelieryFirm ? '/profile' : `/delivery-firm/${delivery_firm.id}`,
              photo: delivery_firm.user.photo.href,
              name: delivery_firm.user.name,
              title: '_delivery.Delivery_firm'
            }
          ]} 
          />
        }

      <div>
        <H4Heading text="_delivery.Delivery_durations" />

        <AddButton text="_delivery.Add_delivery_duration" href={`/delivery-route-duration/create?delivery_route=${id}`} />

        <SingleList
          data={delivery_route_durations}
          className="list-3-x"
          renderDataItem={(item)=> (
            <RouteDuration key={`route-duration-${item.id}`} duration={item} isDelieryFirm={isDelieryFirm} />
          )}
          footer={useRenderListFooter(
            delivery_route_durations.length === 0 ? FETCH_STATUSES.EMPTY : FETCH_STATUSES.DONE,
            ()=> null, 
            ()=> null,
            ()=> <li key="route-duration-footer"> <EmptyList text="_empty.No_delivery_duration" /> </li>
          )}
          />
      </div>
      
      <div>
        <H4Heading text="_delivery.Delivery_weights" />
        
        <AddButton text="_delivery.Add_delivery_weight" href={`/delivery-route-weight/create?delivery_route=${id}`} />

        <SingleList
          data={delivery_route_weights}
          className="list-3-x"
          renderDataItem={(item)=> (
            <RouteWeight key={`route-weight-${item.id}`} duration={item} isDelieryFirm={isDelieryFirm} />
          )}
          footer={useRenderListFooter(
            delivery_route_weights.length === 0 ? FETCH_STATUSES.EMPTY : FETCH_STATUSES.DONE,
            ()=> null, 
            ()=> null,
            ()=> <li key="route-weight-footer"> <EmptyList text="_empty.No_delivery_weight" /> </li>
          )}
          />
      </div>

    </div>
  );
}
