
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import TransactionApi from '../api/TransactionApi';
import Loading from '../components/Loading';
import ProfileDetailsText from '../components/ProfileDetailsText';
import ProfileHeaderText from '../components/ProfileHeaderText';
import Reload from '../components/Reload';
import UserDescList from '../components/UserDescList';
import { FETCH_STATUSES, getTransactionFetchStatusAction, TRANSACTION } from '../context/AppActions';
import { useAppContext } from '../context/AppContext';
import { useDataRender, useDateFormat, useMoneyFormat, useTransactionStatus, useTransactionType } from '../context/AppHooks';


function Profile() {

  const { t } = useTranslation();

  const { 
    transactions: {
      transaction: {
        transaction: { amount, reference_code, type, created_at, status, customer, store, delivery_firm, order }
      }
    },
  } = useAppContext();

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

  return (
    <div>

      <ProfileHeaderText
        text={useMoneyFormat(amount)}
        buttons={[
          {
            text: '_extra.Process',
            color: 'btn-color-primary',
            action: onProcessClicked
          },
          {
            text: '_extra.Cancel',
            color: 'btn-color-red',
            action: onCancelClicked
          },
          {
            text: '_extra.Decline',
            color: 'btn-color-red',
            action: onDeclineClicked
          }
        ]}
        />

      <ProfileDetailsText
        details={[
          {
            title: '_transaction.Reference_code',
            body: `#${reference_code}`
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
            photo: `/photos/about-delivery.jpg`,
            name: `#${order.number}`,
            title: '_order.Order'
          },
          {
            href: `/customer/${customer.id}`,
            photo: `/photos/customer/${customer.photo}`,
            name: `${customer.first_name} ${customer.last_name}`,
            title: '_user.Customer'
          },
          {
            href: `/store/${store.id}`,
            photo: `/photos/store/${store.photo}`,
            name: store.name,
            title: '_store.Store'
          },
          {
            href: `/delivery-firm/${delivery_firm.id}`,
            photo: `/photos/delivery-firm/${delivery_firm.photo}`,
            name: delivery_firm.name,
            title: '_delivery.Delivery_firm'
          }
        ]} 
        />
    </div>
  );
}

export default function Transaction() {

  const tID = useParams().ID;

  const { 
    user: { user }, 
    transactions: {
      transaction: {
        transaction,
        transactionFetchStatus
      }
    }, 
    transactionsDispatch 
  } = useAppContext();

  useEffect(()=>{
    if (transaction !== null && tID !== transaction.reference_code) {
      transactionsDispatch({ type: TRANSACTION.UNFETCH });
    } else if (transactionFetchStatus === FETCH_STATUSES.LOADING) {
      const api = new TransactionApi(user.api_token);
      api.get(tID, transactionsDispatch);
    }
  });

  function refetchTransaction() {
    if (transactionFetchStatus !== FETCH_STATUSES.LOADING) 
      transactionsDispatch(getTransactionFetchStatusAction(FETCH_STATUSES.LOADING));
  }

  return (
    <section>
      <div className="container-x">
        { 
          useDataRender(
            transaction,
            transactionFetchStatus,
            ()=> <Profile />,
            ()=> <Loading />, 
            ()=> <Reload action={refetchTransaction} />,
          )
        }
      </div>
    </section>
  );
}
