
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTransactionStatus, useTransactionType } from '../../hooks/transaction/transactionViewHook';
import { useDateFormat, useMoneyFormat } from '../../hooks/viewHook';
import ProfileDetailsText from './ProfileDetailsText';
import ProfileHeaderText from './ProfileHeaderText';
import UserDescList from '../UserDescList';
import User from '../../models/User';
import Transaction from '../../models/Transaction';
import LoadingDialog from '../dialog/LoadingDialog';
import AlertDialog from '../dialog/AlertDialog';

export default function TransactionProfile(
  { 
    canCancel, 
    canProcessAndDecline, 
    transaction: { 
      id, 
      reference, 
      status, 
      type, 
      amount, 
      created_at, 
      user, 
      order 
    },
    onUpdateStatusSubmit,
    updateStatusLoading,
    updateStatusFormSuccess,
    updateStatusFormError,
    resetUpdateStatus
  }
) {

  const { t } = useTranslation();

  const [dialog, setDialog] = useState(null);

  const [theStatus] = useTransactionStatus(status);

  useEffect(
    function() {
      if (updateStatusFormSuccess !== null || updateStatusFormError !== null) {
        setDialog({
          body: updateStatusFormSuccess || updateStatusFormError,
          positiveButton: {
            text: '_extra.Done',
            action() {
              setDialog(null);
              resetUpdateStatus();
            }
          }
        });
      }
    },
    [updateStatusFormSuccess, updateStatusFormError, resetUpdateStatus]
  );
  
  function onCancelClicked() {
    setDialog({
      body: '_transaction._confirm_cancel_transaction',
      positiveButton: {
        text: '_extra.Yes',
        action() {
          setDialog(null);
          onUpdateStatusSubmit(Transaction.STATUS_CANCELLED);
        }
      },
      negativeButton: {
        text: '_extra.No',
        action() {
          setDialog(null);
        }
      },
    });
  }

  function onProcessClicked() {
    console.log('Process...')
  }

  function onDeclineClicked() {
    setDialog({
      body: '_transaction._confirm_decline_transaction',
      positiveButton: {
        text: '_extra.Yes',
        action() {
          setDialog(null);
          onUpdateStatusSubmit(Transaction.STATUS_DECLINED);
        }
      },
      negativeButton: {
        text: '_extra.No',
        action() {
          setDialog(null);
        }
      },
    });
  }

  const btns = [];

  if (
    canCancel && status === Transaction.STATUS_PENDING && 
    (type === Transaction.TYPE_WITHDRAWAL || type === Transaction.TYPE_REFUND)
  ) {
    btns.push({
      text: '_extra.Cancel',
      color: 'btn-color-red',
      action: onCancelClicked
    });
  }
  
  if (
    canProcessAndDecline && status === Transaction.STATUS_PENDING && 
    (type === Transaction.TYPE_WITHDRAWAL || type === Transaction.TYPE_REFUND)
  ) {
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

  const links = [];

  switch(user.type) {

    case User.TYPE_CUSTOMER: 
      links.push({
        href: `/customer/${user.customer.id}`,
        photo: user.photo.href,
        name: user.name,
        title: '_user.Customer'
      });
      break;

    case User.TYPE_STORE: 
      links.push({
        href: `/store/${user.store.id}`,
        photo: user.photo.href,
        name: user.name,
        title: '_store.Store'
      });
      break;

    case User.TYPE_DELIVERY_FIRM: 
      links.push({
        href: `/delievery-firm/${user.delivery_firm.id}`,
        photo: user.photo.href,
        name: user.name,
        title: '_delivery.Delivery_firm'
      });
      break;

    default:
  }

  if (order !== null) {
    links.push({
      href: `/order/${order.id}`,
      name: `#${order.number}`,
      title: '_order.Order'
    });
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
        users={links} 
        />

      { dialog && <AlertDialog dialog={dialog} /> }

      { updateStatusLoading && <LoadingDialog /> }
    </div>
  );
}
