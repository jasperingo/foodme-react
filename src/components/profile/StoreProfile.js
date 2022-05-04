
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Tab from '../Tab';
import AlertDialog from '../dialog/AlertDialog';
import ProfileDetails from './ProfileDetails';
import ProfileHeader from './ProfileHeader';
import { useCopyText, useDateFormatter, useShare, useUserStatusText, useWorkingHourActive } from '../../hooks/viewHook';
import { checkIcon, dateIcon, editIcon, emailIcon, locationIcon, messageIcon, phoneIcon, recommendedIcon, reviewIcon, shareIcon, timeIcon } from '../../assets/icons';

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

  const userStatus = useUserStatusText();

  const dateFormat = useDateFormatter();

  const copyText = useCopyText();

  const activeWorkingHour = useWorkingHourActive();

  const [shareUrl, canShareUrl, urlToShare] = useShare();

  const [dialog, setDialog] = useState(null);


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
        data: t(userStatus(status)),
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

  details.push({
    icon: timeIcon,
    data: t(activeWorkingHour(working_hours)),
  });

  const links = [
    {
      icon: shareIcon,
      text: '_extra.Share',
      color: 'btn-color-primary p-2',
      action: function() {
        if (canShareUrl) {
          shareUrl(`store/${id}`);
        } else {
          copyText(`${urlToShare}store/${id}`);
          setDialog({
            body: '_store._store_url_copied',
            positiveButton: {
              text: '_extra.Done',
              action() {
                setDialog(null);
              }
            },
          });
        }
      }
    },
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
        category={{
          id: sub_category.category.id,
          name: `${sub_category.name}, ${sub_category.category.name}`,
        }}
        />

      <ProfileDetails details={details} />

      <Tab keyPrefix="store-tab" items={navLinks} />

      { dialog && <AlertDialog dialog={dialog} /> }

    </div>
  );
}
