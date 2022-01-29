
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTransactionStatus, useTransactionType } from '../../hooks/transaction/transactionViewHook';
import { useDateFormat, useMoneyFormat } from '../../hooks/viewHook';
import ProfileDetailsText from './ProfileDetailsText';
import ProfileHeaderText from './ProfileHeaderText';
import UserDescList from '../UserDescList';

export default function TransactionProfile(
  { 
    canCancel, 
    canProcessAndDecline, 
    transaction: { 
      id, 
      application, 
      reference, 
      status, 
      type, 
      amount, 
      created_at, 
      user, 
      order 
    } 
  }
) {

  const { t } = useTranslation();

  const [theStatus] = useTransactionStatus(status);

  function onCancelClicked() {
    console.log('Cancel...')
  }

  function onProcessClicked() {
    console.log('Process...')
  }

  function onDeclineClicked() {
    console.log('Decline...')
  }

  const btns = [];

  if (canCancel) {
    btns.push({
      text: '_extra.Cancel',
      color: 'btn-color-red',
      action: onCancelClicked
    });
  }

  if (canProcessAndDecline) {
    btns.push(
      {
        text: '_extra.Process',
        color: 'btn-color-primary',
        action: onProcessClicked
      },
      {
        text: '_extra.Decline',
        color: 'btn-color-red',
        action: onDeclineClicked
      }
    )
  }

  return (
    <div>

      <ProfileHeaderText
        text={useMoneyFormat(amount)}
        buttons={btns}
        />

      <ProfileDetailsText
        details={[
          {
            title: '_transaction.Reference',
            body: `#${reference}`
          },
          {
            title: '_extra.Type',
            body: t(useTransactionType(type))
          },
          {
            title: '_extra.Date',
            body: useDateFormat(created_at)
          },
          {
            title: '_extra.Status',
            body: t(theStatus)
          }
        ]}
        />

      <UserDescList 
        users={[
          {
            href: `/order/${order.id}`,
            name: `#${order.number}`,
            title: '_order.Order'
          },
          // {
          //   href: `/customer/${customer.id}`,
          //   photo: `/photos/customer/${customer.photo}`,
          //   name: `${customer.first_name} ${customer.last_name}`,
          //   title: '_user.Customer'
          // },
          // {
          //   href: `/store/${store.id}`,
          //   photo: `/photos/store/${store.photo}`,
          //   name: store.name,
          //   title: '_store.Store'
          // },
          // {
          //   href: `/delivery-firm/${delivery_firm.id}`,
          //   photo: `/photos/delivery-firm/${delivery_firm.photo}`,
          //   name: delivery_firm.name,
          //   title: '_delivery.Delivery_firm'
          // }
        ]} 
        />
    </div>
  );
}
