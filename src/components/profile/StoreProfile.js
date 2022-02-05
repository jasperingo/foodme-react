
import React from 'react';
import { useTranslation } from 'react-i18next';
import { categoryIcon, checkIcon, editIcon, emailIcon, locationIcon, messageIcon, phoneIcon, reviewIcon } from '../../assets/icons';
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
        photo, 
        name,  
        phone_number, 
        email, 
        addresses,
        working_hours,
        status
      }, 
      sub_category,
      review_summary
    } 
  }
) {

  const { t } = useTranslation();

  const details = [
    {
      icon: locationIcon,
      data: addresses.length === 0 ? t('_user.No_address') : `${addresses[0].street}, ${addresses[0].city}, ${addresses[0].state}`
    },
    {
      icon: phoneIcon,
      data: phone_number
    },
    {
      icon: categoryIcon,
      data: `${sub_category.name}, ${sub_category.category.name}`
    },
    {
      icon: reviewIcon,
      data: review_summary.average.toFixed(1)
    }
  ];

  if (isAdmin) {
    details.push(
      {
        icon: emailIcon,
        data: email
      },
      {
        icon: checkIcon,
        data: status
      }
    );
  }

  const links = [
    {
      href: `/messages/${id}`,
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
                title: i.day,
                body: `${i.opening} - ${i.closing}`
              }))
              }
            />
        </div>
      }

      <Tab keyPrefix="store-tab" items={navLinks} />

    </div>
  );
}
