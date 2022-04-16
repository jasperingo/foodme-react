
import React from 'react';
import { useTranslation } from 'react-i18next';
import { checkIcon, dateIcon, editIcon, emailIcon, locationIcon, messageIcon, phoneIcon, reviewIcon } from '../../assets/icons';
import { useDateFormatter, useWorkingHoursDay } from '../../hooks/viewHook';
import Tab from '../Tab';
import ProfileDetails from './ProfileDetails';
import ProfileDetailsText from './ProfileDetailsText';
import ProfileHeader from './ProfileHeader';

export default function DeliveryFirmProfile(
  { 
    navLinks,
    isAdmin,
    deliveryFirm: {
      id,
      user: {
        id: uid,
        photo, 
        name,  
        phone_number, 
        email, 
        addresses,
        working_hours,
        status,
        created_at
      },
      review_summary
    }
  }
) {

  const { t } = useTranslation();

  const workingDayText = useWorkingHoursDay();

  const dateFormat = useDateFormatter();

  const workingHourFormatOpts = { time: true, addDate: true };

  const details = [
    {
      icon: phoneIcon,
      data: phone_number
    }
  ];

  if (addresses.length > 0) {
    details.push({
      icon: locationIcon,
      data: `${addresses[0].street}, ${addresses[0].city}, ${addresses[0].state}`
    });
  }

  if (review_summary) {
    details.push({
      icon: reviewIcon,
      data: review_summary.average.toFixed(1)
    });
  }

  if (isAdmin) {
    details.push(
      {
        icon: emailIcon,
        data: email
      },
      {
        icon: checkIcon,
        data: status
      },
      {
        icon: dateIcon,
        data: dateFormat(created_at)
      }
    );
  }

  const links = [
    {
      href: `/messages/${uid}`,
      title: '_message.Message',
      icon: messageIcon
    }
  ];

  if (isAdmin) {
    links.push({
      href: `/delivery-firm/${id}/update`,
      title: '_extra.Edit',
      icon: editIcon
    });
  }

  return (
    <div>
      
      <ProfileHeader 
        photo={photo.href}
        name={name} 
        links={links} 
        />

      <ProfileDetails 
        details={details}
        />
        
      {
        working_hours.length !== 0 &&
        <div>
          <h4 className="font-bold">{ t('_user.Working_hours') }</h4>
          <ProfileDetailsText
            details={
              working_hours.map(i=> ({
                title: workingDayText(i.day),
                body: `${dateFormat(i.opening, workingHourFormatOpts)} - ${dateFormat(i.closing, workingHourFormatOpts)}`
              }))
              }
            />
        </div>
      }

      <Tab keyPrefix="delivery-firm-tab" items={navLinks} />

    </div>
  );
}
