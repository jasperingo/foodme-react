
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDateFormat, useMoneyFormat } from '../../hooks/viewHook';
import Order from '../../models/Order';
import Dialog from '../dialog/Dialog';

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
    isCustomer, 
    isStore, 
    isDeliveryFirm
  }
) {

  const { t } = useTranslation();

  const [dialog, setDialog] = useState(false);

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
              <button onClick={()=> setDialog(true)} className="btn-color-primary px-2 rounded">
                { t('_order.Track_order') }
              </button>

              {
                (isStore && orderStatus === Order.STATUS_PROCESSING) &&
                <button onClick={()=> console.log('Processing')} className="btn-color-primary px-2 rounded">
                  { t('_extra.Processed') }
                </button>
              }

              {
                (isDeliveryFirm && processed_at !== null) &&
                <button onClick={()=> console.log('Transporting')} className="btn-color-primary px-2 rounded">
                  { t('_extra.Transported') }
                </button>
              }

              {
                (isCustomer && delivered_at !== null) &&
                <button onClick={()=> console.log('Delivered')} className="btn-color-primary px-2 rounded">
                  { t('_extra.Delivered') }
                </button>
              }
            </div>
          </div>
        </div>
      </div>
      { 
        dialog && 
        <TrackDialog 
          processedAt={processed_at}
          transportedAt={transported_at}
          deliveredAt={delivered_at}
          createdAt={created_at}
          onCloseClick={()=> setDialog(false)}
          /> 
      }
    </li>
  );
}

