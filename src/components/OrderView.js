
import React from 'react';
import { useTranslation } from 'react-i18next';
import AdminApp from '../apps/AdminApp';
import { useDateFormat, useMoneyFormat, useOrderStatus } from '../context/AppHooks';
import H4Heading from './H4Heading';
import OrderItemItem from './OrderItemItem';
import ProfileDetailsText from './ProfileDetailsText';
import ProfileHeaderText from './ProfileHeaderText';
import UserDescList from './UserDescList';

export default function OrderView({ order, appType }) {

  const { t } = useTranslation();

  const [theStatus] = useOrderStatus(order.status);

  const usersLinks = [];

  if (order.customer) {
    usersLinks.push({
      href: appType === AdminApp.TYPE ? `/customer/${order.customer.id}` : `/messages/${order.customer.id}`,
      photo: `/photos/customer/${order.customer.photo}`,
      name: `${order.customer.first_name} ${order.customer.last_name}`,
      title: '_order.Ordered_by'
    });
  }

  if (order.store) {
    usersLinks.push({
      href: appType === AdminApp.TYPE ? `/customer/${order.store.id}` : `/messages/${order.store.id}`,
      photo: `/photos/store/${order.store.photo}`,
      name: order.store.name,
      title: '_order.Ordered_from'
    });
  }

  if (order.delivery_firm) {
    usersLinks.push({
      href: appType === AdminApp.TYPE ? `/delivery-firm/${order.delivery_firm.id}` : `/messages/${order.delivery_firm.id}`,
      photo: `/photos/delivery-firm/${order.delivery_firm.photo}`,
      name: order.delivery_firm.name,
      title: '_order.Delivered_by'
    });
  }

  return (
    <>
      <div className="py-2 border-b">
        <div className="container-x">

          <ProfileHeaderText
            text={`#${order.number}`}
            />

          <ProfileDetailsText
            details={[
              {
                title: '_extra.Status',
                body: t(theStatus)
              },
              {
                title: '_extra.Items',
                body: t('_order.item__Num', { count: order.number_of_items })
              },
              {
                title: '_extra.Total',
                body: useMoneyFormat(order.total)
              },
              {
                title: '_order.Items_total',
                body: useMoneyFormat(order.items_total)
              },
              {
                title: '_delivery.Delivery_fee',
                body: useMoneyFormat(order.delivery_fee)
              },
              {
                title: '_delivery.Delivery_fee',
                body: useMoneyFormat(order.delivery_fee)
              },
              {
                title: '_delivery.Delivery_method',
                body: order.delivery_method
              },
              {
                title: '_delivery.Delivery_address',
                body: `${order.delivery_address.street}, ${order.delivery_address.city}, ${order.delivery_address.state}`
              },
              {
                title: '_order.Placed_on',
                body: useDateFormat(order.created_at)
              }
            ]}
            />

          <UserDescList users={usersLinks} />

        </div>
      </div>
      
      <div className="py-2 border-b">
        <div className="container-x">
          <H4Heading color="text-color-gray" text={ t('_order.Order_items') } />
          <ul className="list-2-x">
            {
              order.items.map((item, i)=> <OrderItemItem key={`order-item-${item.id}`} item={item} />)
            }
          </ul>
        </div>
      </div>
    </>
  );
}
