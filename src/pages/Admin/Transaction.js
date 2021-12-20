
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import TransactionApi from '../../api/TransactionApi';
import Loading from '../../components/Loading';
import ProfileDetailsText from '../../components/ProfileDetailsText';
import Reload from '../../components/Reload';
import UserMiniLink from '../../components/UserMiniLink';
import { FETCH_STATUSES, getTransactionFetchStatusAction, TRANSACTION } from '../../context/AppActions';
import { useAppContext } from '../../context/AppContext';
import { useDataRender, useDateFormat, useMoneyFormat, useTransactionStatus, useTransactionType } from '../../context/AppHooks';


function UserDLItem({ href, photo, name, title }) {

  const { t } = useTranslation();
  
  return (
    <div className="mb-2">
      <dt className="font-bold text-sm mb-1">{ t(title) }</dt>
      <dd>
        <UserMiniLink 
          href={href}
          photo={photo}
          name={name}
          />
        </dd>
    </div>
  );
}

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

  return (
    <div>
      <div className="my-4 md:flex md:items-center">
        <h3 className="flex-grow font-bold text-2xl">{ useMoneyFormat(amount) }</h3> 
        <ul className="flex gap-2 mt-2">
          <li>
            <button className="btn-color-red px-2 py-1 rounded">Cancel</button>
          </li>
        </ul>
      </div>

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

      <dl>

        <UserDLItem
          href={`/order/${order.id}`}
          photo={`/photos/about-delivery.jpg`}
          name={`#${order.number}`}
          title="_order.Order"
          />

        <UserDLItem
          href={`/customer/${customer.id}`}
          photo={`/photos/customer/${customer.photo}`}
          name={`${customer.first_name} ${customer.last_name}`}
          title="_user.Customer"
          />

        <UserDLItem
          href={`/store/${store.id}`}
          photo={`/photos/store/${store.photo}`}
          name={store.name}
          title="_store.Store"
          />

        <UserDLItem
          href={`/delivery-firm/${delivery_firm.id}`}
          photo={`/photos/delivery-firm/${delivery_firm.photo}`}
          name={delivery_firm.name}
          title="_delivery.Delivery_firm"
          />

      </dl>
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
      api.getByAdmin(tID, transactionsDispatch);
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
