
import React from 'react';
import { useTranslation } from 'react-i18next';
import { editIcon } from '../../assets/icons';
import { useDateFormatter } from '../../hooks/viewHook';
import UserDescList from '../UserDescList';
import ProfileDetailsText from './ProfileDetailsText';
import ProfileHeaderText from './ProfileHeaderText';

export default function DeliveryRouteProfile(
  {
    isDelieryFirm,
    deliveryRoute: {
      id,
      name,
      door_delivery,
      created_at,
      delivery_firm
    }
  }
) {

  const { t } = useTranslation();

  const dateFormat = useDateFormatter();

  return (
    <div className="container-x">

      <ProfileHeaderText 
        text={name } 
        links={
          isDelieryFirm ? 
          [
            {
              href: `/delivery-route/${id}/update`,
              title: '_extra.Edit',
              icon: editIcon
            }
          ]: 
          []
        }
        />

      <ProfileDetailsText 
        details={[
          { 
            title: '_delivery.Door_delivery', 
            body: door_delivery ? t('_extra.Yes') : t('_extra.No') 
          },
          { 
            title: '_extra.Date', 
            body: dateFormat(created_at) 
          }
        ]} 
        />

      {
        !isDelieryFirm &&
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
      }
      
    </div>
  );
}
