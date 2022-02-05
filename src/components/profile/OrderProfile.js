
import React from 'react';
import { useTranslation } from 'react-i18next';
import H4Heading from '../H4Heading';
import ProfileDetailsText from './ProfileDetailsText';
import ProfileHeaderText from './ProfileHeaderText';
import UserDescList from '../UserDescList';
import { useOrderStatus } from '../../hooks/order/orderViewHook';
import { useDateFormat, useMoneyFormat } from '../../hooks/viewHook';
import OrderItemItem from '../list_item/OrderItemItem';

export default function OrderProfile({ order, isCustomer }) {
  
  const { t } = useTranslation();

  const [theStatus] = useOrderStatus(order.status);

  const usersLinks = [
    {
      href: !isCustomer ? `/customer/${order.customer.id}` : `/profile`,
      photo: order.customer.user.photo.href,
      name: `${order.customer.user.name}`,
      title: '_order.Ordered_by'
    },
    {
      href: `/store/${order.store.id}`,
      photo: order.store.user.photo.href,
      name: order.store.user.name,
      title: '_order.Ordered_from'
    }
  ];

  if (order.delivery_firm) {
    usersLinks.push({
      href: `/delivery-firm/${order.delivery_firm.id}`,
      photo: order.delivery_firm.user.photo.href,
      name: order.delivery_firm.user.name,
      title: '_order.Delivered_by'
    });
  }

  function onCancelClicked() {
    console.log('Cancel...')
  }

  function onAcceptClicked() {
    console.log('Accept...')
  }

  function onDeclineClicked() {
    console.log('Decline...')
  }

  return (
    <>
      <div className="py-2 border-b">
        <div className="container-x">

          <ProfileHeaderText
            text={`#${order.number}`}
            buttons={[
              {
                text: '_extra.Accept',
                color: 'btn-color-primary',
                action: onAcceptClicked
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
                title: '_order.Placed_on',
                body: useDateFormat(order.created_at)
              },
              {
                title: '_extra.Status',
                body: t(theStatus)
              },
              {
                title: '_extra.Sub_total',
                body: useMoneyFormat(order.sub_total)
              },
              {
                title: '_extra.Delivery_total',
                body: useMoneyFormat(order.delivery_total)
              },
              {
                title: '_extra.Discount_total',
                body: useMoneyFormat(order.discount_total)
              },
              {
                title: '_extra.Total',
                body: useMoneyFormat(order.total)
              },
              {
                title: '_delivery.Delivery_method',
                body: order.delivery_method
              },
              // {
              //   title: '_delivery.Delivery_address',
              //   body: `${order.delivery_address.street}, ${order.delivery_address.city}, ${order.delivery_address.state}`
              // }
            ]}
            />

          <UserDescList users={usersLinks} />

        </div>
      </div>
      
      <div className="py-2 border-b">
        <div className="container-x">
          <H4Heading color="text-color-gray" text="_order.Order_items" />
          <ul className="list-3-x">
            {
              order.order_items.map((item)=> <OrderItemItem key={`order-item-${item.id}`} item={item} />)
            }
          </ul>
        </div>
      </div>
    </>
  );
}
