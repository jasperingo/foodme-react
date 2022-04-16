
import React from 'react';
import { useTranslation } from 'react-i18next';
import { categoryIcon, checkIcon, dateIcon, editIcon, emailIcon, locationIcon, messageIcon, phoneIcon, recommendedIcon, reviewIcon } from '../../assets/icons';
import { useDateFormatter, useWorkingHoursDay } from '../../hooks/viewHook';
import Tab from '../Tab';
import ProfileDetails from './ProfileDetails';
import ProfileDetailsText from './ProfileDetailsText';
import ProfileHeader from './ProfileHeader';

export default function StoreProfile(
  { 
    navLinks,
    isAdmin,
    store: { 
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
      sub_category,
      recommended,
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
      icon: categoryIcon,
      data: `${sub_category.name}, ${sub_category.category.name}`
    },
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

  if (recommended) {
    details.push({
      icon: recommendedIcon,
      data: t('_extra.Recommended')
    });
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
      href: `/store/${id}/update`,
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

      <Tab keyPrefix="store-tab" items={navLinks} />

    </div>
  );
}
