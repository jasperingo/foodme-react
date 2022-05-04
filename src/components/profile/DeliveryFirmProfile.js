
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Tab from '../Tab';
import ProfileDetails from './ProfileDetails';
import ProfileHeader from './ProfileHeader';
import { useCopyText, useDateFormatter, useShare, useWorkingHourActive } from '../../hooks/viewHook';
import { checkIcon, dateIcon, editIcon, emailIcon, locationIcon, messageIcon, phoneIcon, reviewIcon, shareIcon, timeIcon } from '../../assets/icons';
import AlertDialog from '../dialog/AlertDialog';

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
        data: status
      },
      {
        icon: dateIcon,
        data: dateFormat(created_at)
      }
    );
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
          shareUrl(`delivery-firm/${id}`);
        } else {
          copyText(`${urlToShare}delivery-firm/${id}`);
          setDialog({
            body: '_delivery._delivery_firm_url_copied',
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

      <ProfileDetails details={details} />

      <Tab keyPrefix="delivery-firm-tab" items={navLinks} />
      
      { dialog && <AlertDialog dialog={dialog} /> }

    </div>
  );
}
