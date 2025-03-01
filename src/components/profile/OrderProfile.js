
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import H4Heading from '../H4Heading';
import ProfileDetailsText from './ProfileDetailsText';
import ProfileHeaderText from './ProfileHeaderText';
import UserDescList from '../UserDescList';
import { useOrderStatus } from '../../hooks/order/orderViewHook';
import { useDateFormatter, useMoneyFormatter } from '../../hooks/viewHook';
import OrderItemItem from '../list_item/OrderItemItem';
import Order from '../../models/Order';
import AlertDialog from '../dialog/AlertDialog';
import LoadingDialog from '../dialog/LoadingDialog';
import PayWithPaystack from '../PayWithPaystack';
import { useOrderStatusUpdate } from '../../hooks/order/orderStatusUpdateHook';
import { useStoreStatusUpdate } from '../../hooks/order/orderStoreStatusUpdateHook';
import { useDeliveryFirmStatusUpdate } from '../../hooks/order/orderDeliveryFirmStatusUpdateHook';
import { useOrderPaymentTransactionFetch } from '../../hooks/order/orderPaymentTransactionFetchHook';
import { useRefundTransactionCreate } from '../../hooks/transaction/refundTransactionCreateHook';

export default function OrderProfile({ order, isCustomer, isStore, isDeliveryFirm, userToken }) {
  
  const { t } = useTranslation();

  const dateFormat = useDateFormatter(); 
  
  const moneyFormat = useMoneyFormatter();

  const [theStatus] = useOrderStatus(order.status);

  const [dialog, setDialog] = useState(null);

  const [showPay, setShowPay] = useState(false);

  const [
    cancelSend, 
    cancelSuccess, 
    cancelisLoading, 
    cancelError
  ] = useOrderStatusUpdate();

  const [
    storeStatusSend, 
    storeStatusSuccess, 
    storeStatusIsLoading, 
    storeStatusError, 
    storeStatusSuccessMessage
  ] = useStoreStatusUpdate();

  const [
    deliveryFirmStatusSend, 
    deliveryFirmStatusSuccess, 
    deliveryFirmStatusIsLoading, 
    deliveryFirmStatusError, 
    deliveryFirmStatusSuccessMessage
  ] = useDeliveryFirmStatusUpdate();

  const [
    transactionSend,
    transaction,
    transactionLoading,
    transactionSuccess,
    transactionError
  ] = useOrderPaymentTransactionFetch(userToken);

  const [
    refundSend,
    refundLoading,
    refundSuccess,
    refundError
  ] = useRefundTransactionCreate(userToken);

  useEffect(
    function() {
      if (cancelSuccess)
        setDialog({
          body: '_order._order_cancelled',
          positiveButton: {
            text: '_extra.Done',
            action() {
              setDialog(null);
            }
          },
        });

      if (cancelError) 
        setDialog({
          body: cancelError,
          negativeButton: {
            text: '_extra.Done',
            action() {
              setDialog(null);
            }
          },
        });
    },
    [cancelSuccess, cancelError]
  );

  useEffect(
    function() {
      if (storeStatusSuccess)
        setDialog({
          body: storeStatusSuccessMessage,
          positiveButton: {
            text: '_extra.Done',
            action() {
              setDialog(null);
            }
          },
        });

      if (storeStatusError) 
        setDialog({
          body: storeStatusError,
          negativeButton: {
            text: '_extra.Done',
            action() {
              setDialog(null);
            }
          },
        });
    },
    [storeStatusSuccess, storeStatusError, storeStatusSuccessMessage]
  );

  useEffect(
    function() {
      if (deliveryFirmStatusSuccess)
        setDialog({
          body: deliveryFirmStatusSuccessMessage,
          positiveButton: {
            text: '_extra.Done',
            action() {
              setDialog(null);
            }
          },
        });

      if (deliveryFirmStatusError) 
        setDialog({
          body: deliveryFirmStatusError,
          negativeButton: {
            text: '_extra.Done',
            action() {
              setDialog(null);
            }
          },
        });
    },
    [deliveryFirmStatusSuccess, deliveryFirmStatusError, deliveryFirmStatusSuccessMessage]
  );
  
  useEffect(
    function() {
      if (transactionSuccess)
        setShowPay(true);

      if (transactionError) 
        setDialog({
          body: transactionError,
          negativeButton: {
            text: '_extra.Done',
            action() {
              setDialog(null);
            }
          },
        });
    },
    [transactionSuccess, transactionError]
  );

  useEffect(
    function() {
      if (refundSuccess)
        setDialog({
          body: '_transaction._refund_request_sent',
          positiveButton: {
            text: '_extra.Done',
            action() {
              setDialog(null);
            }
          },
        });

      if (refundError) 
        setDialog({
          body: refundError,
          negativeButton: {
            text: '_extra.Done',
            action() {
              setDialog(null);
            }
          },
        });
    },
    [refundSuccess, refundError]
  );

  const usersLinks = [];

  if (!isCustomer) {
    usersLinks.push({
      href:  `/customer/${order.customer.id}`,
      photo: order.customer.user.photo.href,
      name: `${order.customer.user.name}`,
      title: '_order.Ordered_by'
    });
  }

  if (!isStore) {
    usersLinks.push({
      href: `/store/${order.store.id}`,
      photo: order.store.user.photo.href,
      name: order.store.user.name,
      title: '_order.Ordered_from'
    });
  }

  if (order.delivery_firm && !isDeliveryFirm) {
    usersLinks.push({
      href: `/delivery-firm/${order.delivery_firm.id}`,
      photo: order.delivery_firm.user.photo.href,
      name: order.delivery_firm.user.name,
      title: '_order.Delivered_by'
    });
  }
  
  const buttons = [];

  if (
    (isStore || isDeliveryFirm) && 
    order.status !== Order.STATUS_CANCELLED &&
    order.status !== Order.STATUS_DECLINED &&
    order.payment_status !== Order.PAYMENT_STATUS_APPROVED
  ) {
    buttons.push({
      text: '_transaction.Pay_with_paystack',
      color: 'btn-color-blue',
      action() {
        if (transaction === null) 
          transactionSend(order);
        else 
          setShowPay(true);
      }
    });
  }

  if (
    isCustomer && 
    order.status === Order.STATUS_CANCELLED &&
    order.payment_status === Order.PAYMENT_STATUS_APPROVED && 
    order.refund_status !== Order.REFUND_STATUS_APPROVED && 
    order.refund_status !== Order.REFUND_STATUS_PENDING
  ) {
    buttons.push({
      text: '_transaction.Request_refund',
      color: 'btn-color-primary',
      action() {
        refundSend(order.id);
      }
    });
  }

  if (isCustomer && order.status === Order.STATUS_PENDING) {
    buttons.push({
      text: '_extra.Cancel',
      color: 'btn-color-red',
      action: onCancelClicked
    });
  }
  
  if (
      order.status === Order.STATUS_PENDING && 
      (
        (isStore && order.store_status === Order.STORE_STATUS_PENDING) || 
        (isDeliveryFirm && order.delivery_firm_status === Order.DELIVERY_FIRM_STATUS_PENDING)
      )
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
    setDialog({
      body: '_order._cancel_order_confirm',
      positiveButton: {
        text: '_extra.Yes',
        action() {
          setDialog(null);
          cancelSend(Order.STATUS_CANCELLED);
        }
      },
      negativeButton: {
        text: '_extra.No',
        action() {
          setDialog(null);
        }
      }
    });
  }

  function onAcceptClicked() {
    if (isStore) storeStatusSend(Order.STORE_STATUS_ACCEPTED);
    else if (isDeliveryFirm) deliveryFirmStatusSend(Order.DELIVERY_FIRM_STATUS_ACCEPTED);
  }

  function onDeclineClicked() {
    setDialog({
      body: '_order._decline_order_confirm',
      positiveButton: {
        text: '_extra.Yes',
        action() {
          setDialog(null);
          if (isStore) storeStatusSend(Order.STORE_STATUS_DECLINED);
          else if (isDeliveryFirm) deliveryFirmStatusSend(Order.DELIVERY_FIRM_STATUS_DECLINED);
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

  const details = [
    {
      title: '_order.Placed_on',
      body: dateFormat(order.created_at)
    },
    {
      title: '_extra.Status',
      body: t(theStatus)
    },
    {
      title: '_extra.Sub_total',
      body: moneyFormat(order.sub_total)
    },
    {
      title: '_extra.Delivery_total',
      body: moneyFormat(order.delivery_total)
    },
    {
      title: '_extra.Discount_total',
      body: moneyFormat(order.discount_total)
    },
    {
      title: '_extra.Total',
      body: moneyFormat(order.total)
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
      title: '_store.Store_status',
      body: order.store_status
    }
  ];

  if (order.payment_status) {
    details.push({
      title: '_transaction.Payment_status',
      body: order.payment_status
    });
  }
  
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
      
      <div className="py-2">
        <div className="container-x">
          <H4Heading color="text-color-gray" text="_order.Order_items" />
          <ul className="list-3-x">
            {
              order.order_items.map((item)=> (
                <OrderItemItem 
                  key={`order-item-${item.id}`} 
                  item={item} 
                  isStore={isStore}
                  isCustomer={isCustomer}
                  isDeliveryFirm={isDeliveryFirm}
                  orderStatus={order.status}
                  deliveryMethod={order.delivery_method}
                  />
              ))
            }
          </ul>
        </div>
      </div>

      { dialog && <AlertDialog dialog={dialog} /> }

      { 
        showPay &&
        <PayWithPaystack 
          amount={transaction.amount}
          email={transaction.user.email}
          reference={transaction.reference}
          onClose={()=> setShowPay(false)}
          onDone={()=> {
            setShowPay(false);
            setDialog({
              body: '_transaction._payment_being_confirmed',
              negativeButton: {
                text: '_extra.Done',
                action() {
                  setDialog(null);
                }
              }
            });
          }}
          />
      }
        
      { 
        (
          cancelisLoading || 
          storeStatusIsLoading ||
          deliveryFirmStatusIsLoading || 
          transactionLoading || 
          refundLoading
        ) && 
        <LoadingDialog /> 
      }
    </>
  );
}
