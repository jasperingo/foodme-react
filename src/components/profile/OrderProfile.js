
import React from 'react';
import { useTranslation } from 'react-i18next';
import H4Heading from '../H4Heading';
import ProfileDetailsText from './ProfileDetailsText';
import ProfileHeaderText from './ProfileHeaderText';
import UserDescList from '../UserDescList';
import { useOrderStatus } from '../../hooks/order/orderViewHook';
import { useDateFormat, useMoneyFormat } from '../../hooks/viewHook';
import OrderItemItem from '../list_item/OrderItemItem';
import Order from '../../models/Order';

export default function OrderProfile({ order, isCustomer, isStore, isDeliveryFirm }) {
  
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
      href: !isStore ? `/store/${order.store.id}` : '/profile',
      photo: order.store.user.photo.href,
      name: order.store.user.name,
      title: '_order.Ordered_from'
    }
  ];

  if (order.delivery_firm) {
    usersLinks.push({
      href: !isDeliveryFirm ? `/delivery-firm/${order.delivery_firm.id}` : '/profile',
      photo: order.delivery_firm.user.photo.href,
      name: order.delivery_firm.user.name,
      title: '_order.Delivered_by'
    });
  }
  
  const buttons = [];

  if (isCustomer && order.status === Order.STATUS_PENDING) {
    buttons.push({
      text: '_extra.Cancel',
      color: 'btn-color-red',
      action: onCancelClicked
    });
  }

  if (
      (isStore && order.store_status === Order.STORE_STATUS_PENDING) || 
      (isDeliveryFirm && order.delivery_firm_status === Order.DELIVERY_FIRM_STATUS_PENDING)
  ) {
    buttons.push(
      {
        text: '_extra.Accept',
        color: 'btn-color-primary',
        action: onAcceptClicked
      },
      {
        text: '_extra.Decline',
        color: 'btn-color-red',
        action: onDeclineClicked
      }
    );
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

  const details = [
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
    {
      title: '_transaction.Payment_method',
      body: order.payment_method
    },
    {
      title: '_transaction.Payment_status',
      body: order.payment_status
    },
    {
      title: '_store.Store_status',
      body: order.store_status
    }
  ];
  
  if (order.delivery_firm_status) {
    details.push({
      title: '_delivery.Delivery_firm_status',
      body: order.delivery_firm_status
    });
  }

  if (order.refund_status) {
    details.push({
      title: '_transaction.Refund_status',
      body: order.refund_status
    });
  }

  if (order.address) {
    details.push({
      title: '_delivery.Delivery_address',
      body: `${order.address.street}, ${order.address.city}, ${order.address.state}`
    });
  }

  if (order.note) {
    details.push({
      title: '_order.Order_note',
      body: order.note
    });
  }

  return (
    <>
      <div className="py-2 border-b">
        <div className="container-x">

          <ProfileHeaderText
            text={`#${order.number}`}
            buttons={buttons}
            />

          <ProfileDetailsText
            details={details}
            />

          <UserDescList users={usersLinks} />

        </div>
      </div>
      
      <div className="py-2 border-b">
        <div className="container-x">
          <H4Heading color="text-color-gray" text="_order.Order_items" />
          <ul className="list-3-x">
            {
              order.order_items.map((item)=> (
                <OrderItemItem 
                  key={`order-item-${item.id}`} 
                  item={item} 
                  isCustomer={isCustomer}
                  isStore={isStore}
                  isDeliveryFirm={isDeliveryFirm}
                  />
              ))
            }
          </ul>
        </div>
      </div>
    </>
  );
}
