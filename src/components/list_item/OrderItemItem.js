
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { useOrderItemDeliveredAtUpdate } from '../../hooks/order/orderItemDeliveredAtUpdateHook';
import { useOrderItemProcessedAt } from '../../hooks/order/orderItemProcessedAtUpdateHook';
import { useOrderItemTransportedAtUpdate } from '../../hooks/order/orderItemTransportedAtUpdateHook';
import { useDateFormat, useMoneyFormat } from '../../hooks/viewHook';
import Order from '../../models/Order';
import AlertDialog from '../dialog/AlertDialog';
import Dialog from '../dialog/Dialog';
import LoadingDialog from '../dialog/LoadingDialog';

function TrackDialogItem({ date, text }) {

  const { t } = useTranslation();

  const amount = useDateFormat(date);

  return (
    <li className="flex mb-2 gap-2 border rounded p-2"> 
      <span className="text-color-primary">{ t(text) }:</span> 
      <time dateTime={date}>{ date ? amount : t('_extra.Pending') }</time> 
    </li>
  );
}

function TrackDialog({ processedAt, transportedAt, deliveredAt, createdAt, onCloseClick }) {

  const { t } = useTranslation();

  return (
    <Dialog>
      <ol className="p-2">
        <TrackDialogItem date={createdAt} text="_order.Ordered" />
        <TrackDialogItem date={processedAt} text="_extra.Processed" />
        <TrackDialogItem date={transportedAt} text="_extra.Transported" />
        <TrackDialogItem date={deliveredAt} text="_extra.Delivered" />
        <li>
          <button 
            onClick={onCloseClick}
            className="block w-full border-t p-2 hover:bg-color-gray-h"
            >
            { t('_extra.Done') }
          </button>
        </li>
      </ol>
    </Dialog>
  );
}

export default function OrderItemItem(
  { 
    item: { 
      id,
      quantity, 
      amount, 
      processed_at,
      transported_at,
      delivered_at,
      created_at,
      product_variant: { 
        name, 
        product: { photo, title } 
      } 
    },
    orderStatus,
    deliveryMethod,
    isCustomer, 
    isStore, 
    isDeliveryFirm
  }
) {

  const { t } = useTranslation();

  const [dialog, setDialog] = useState(false);

  const [trackDialog, setTrackDialog] = useState(false);

  const [
    processedAtSend, 
    processedAtSuccess, 
    processedAtIsLoading, 
    processedAtError
  ] = useOrderItemProcessedAt();

  const [
    transportedAtSend, 
    transportedAtSuccess, 
    transportedAtIsLoading, 
    transportedAtError
  ] = useOrderItemTransportedAtUpdate();

  const [
    deliveredAtSend, 
    deliveredAtSuccess, 
    deliveredAtIsLoading, 
    deliveredAtError
  ] = useOrderItemDeliveredAtUpdate();
  
  useEffect(
    ()=> {
      if (processedAtSuccess)
        setDialog({
          body: '_order._order_item_processing',
          positiveButton: {
            text: '_extra.Done',
            action() {
              setDialog(null);
            }
          },
        });

      if (processedAtError) 
        setDialog({
          body: processedAtError,
          negativeButton: {
            text: '_extra.Done',
            action() {
              setDialog(null);
            }
          },
        });
    },
    [processedAtSuccess, processedAtError]
  );

  useEffect(
    ()=> {
      if (transportedAtSuccess)
        setDialog({
          body: '_order._order_item_transporting',
          positiveButton: {
            text: '_extra.Done',
            action() {
              setDialog(null);
            }
          },
        });

      if (transportedAtError) 
        setDialog({
          body: transportedAtError,
          negativeButton: {
            text: '_extra.Done',
            action() {
              setDialog(null);
            }
          },
        });
    },
    [transportedAtSuccess, transportedAtError]
  );

  useEffect(
    ()=> {
      if (deliveredAtSuccess)
        setDialog({
          body: '_order._order_item_delivered',
          positiveButton: {
            text: '_extra.Done',
            action() {
              setDialog(null);
            }
          },
        });

      if (deliveredAtError) 
        setDialog({
          body: deliveredAtError,
          negativeButton: {
            text: '_extra.Done',
            action() {
              setDialog(null);
            }
          },
        });
    },
    [deliveredAtSuccess, deliveredAtError]
  );

  return (
    <li>
      <div className="mb-5 md:shadow">
        <div className="flex md:block md:pb-2">
          <img 
            src={photo.href}
            alt={title} 
            className="w-20 border rounded block md:w-full md:h-full" 
            />
          <div className="flex-grow pl-2">
            <div className="mb-1">{ title }</div>
            <div className="mb-1 text-color-gray">{ t('_extra.Variation') }: { name }</div>
            <div className="text-color-primary font-bold mb-1">{ useMoneyFormat(amount) }</div>
            <div className="mb-2">QTY: { quantity }</div>
            <div className="flex gap-2">
              <button onClick={()=> setTrackDialog(true)} className="btn-color-primary px-2 rounded">
                { t('_order.Track_order') }
              </button>

              {
                (isStore && processed_at === null && orderStatus === Order.STATUS_PROCESSING) &&
                <button onClick={()=> processedAtSend(id)} className="btn-color-primary px-2 rounded">
                  { t('_extra.Processed') }
                </button>
              }

              {
                (isDeliveryFirm && transported_at === null && processed_at !== null) &&
                <button onClick={()=> transportedAtSend(id)} className="btn-color-primary px-2 rounded">
                  { t('_extra.Transported') }
                </button>
              }

              {
                (isCustomer && 
                  (
                    (deliveryMethod === Order.DELIVERY_METHOD_STORE && processed_at !== null) ||
                    (deliveryMethod === Order.DELIVERY_METHOD_DOOR && transported_at !== null)
                  ) && 
                  delivered_at === null) &&
                <button onClick={()=> deliveredAtSend(id)} className="btn-color-primary px-2 rounded">
                  { t('_extra.Delivered') }
                </button>
              }
            </div>
          </div>
        </div>
      </div>

      {
        (processedAtIsLoading || transportedAtIsLoading || deliveredAtIsLoading) && <LoadingDialog />
      }

      {
        dialog && <AlertDialog dialog={dialog} />
      }

      { 
        trackDialog && 
        <TrackDialog 
          processedAt={processed_at}
          transportedAt={transported_at}
          deliveredAt={delivered_at}
          createdAt={created_at}
          onCloseClick={()=> setTrackDialog(false)}
          /> 
      }
    </li>
  );
}

