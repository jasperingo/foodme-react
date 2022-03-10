
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import AlertDialog from '../../components/dialog/AlertDialog';
import LoadingDialog from '../../components/dialog/LoadingDialog';
import CartItem from '../../components/list_item/CartItem';
import { useAppContext } from '../../hooks/contextHook';
import { useHeader } from '../../hooks/headerHook';
import { useOrderCreate } from '../../hooks/order/orderCreateHook';
import { useMoneyFormatter } from '../../hooks/viewHook';
import Order from '../../models/Order';

function SummaryItem({ text, value }) {

  const moneyFormat = useMoneyFormatter();

  return (
    <div className="flex flex-wrap items-center p-2 border-b">
      <dt className="flex-grow">{ text }</dt>
      <dd className="font-bold">{ moneyFormat(value) }</dd>
    </div>
  );
}

export default function CartSummary() {

  useHeader({ 
    title: `Cart Summary - Dailyneeds`,
    headerTitle: '_cart.Cart_summary',
    topNavPaths: ['/cart']
  });

  const { t } = useTranslation();

  const history = useHistory();

  const [orderSend, orderSuccess, orderIsLoading, orderError, orderId] = useOrderCreate();
  
  const { 
    cart: {
      cart: {
        cart,
        cartItems
      } 
    }
  } = useAppContext();

  const [dialog, setDialog] = useState(null);

  useEffect(
    ()=> {
      if (orderSuccess)
        history.push(`/cart/done/${orderId}`);

      if (orderError) 
        setDialog({
          body: orderError,
          negativeButton: {
            text: '_extra.Done',
            action() {
              setDialog(null);
            }
          },
        });
    },
    [history, orderSuccess, orderError, orderId]
  );


  if (cartItems.length === 0) {
    return <Redirect to="/cart" />
  }

  const discountTotal = cart.discount_total;

  const deliveryTotal = cart.delivery_total ?? 0;

  const total = cartItems.reduce((sum, i)=> sum + (i.product_variant.price * i.quantity), 0);

  const totalPlusDeliveryTotal = deliveryTotal + total;

  function payOnDelivery() {
    setDialog({
      body: '_order._place_order_confirm',
      positiveButton: {
        text: '_extra.Yes',
        action() {
          setDialog(null);
          orderSend(Order.PAYMENT_METHOD_CASH);
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

  return (
    <section>
      <div className="container-x">
         
        <ul className="my-2 lg:grid lg:grid-cols-2 gap-4">
          { 
            cartItems.map((item, i)=> (
              <CartItem
                key={`cart-item-${i}`} 
                cartItem={item} 
                notEditable={true}
                />
            ))
          }
        </ul>

        <dl className="mb-2">
          <SummaryItem text={t('_extra.Sub_total')} value={total} />
          {
            cart.delivery_total !== undefined && 
            <SummaryItem text={t('_delivery.Delivery_fee')} value={deliveryTotal} />
          }
          <SummaryItem text={t('_discount.Discount')} value={discountTotal} />
          <SummaryItem text={t('_extra.Total')} value={discountTotal > totalPlusDeliveryTotal ? 0 : totalPlusDeliveryTotal - discountTotal} />
        </dl>

        <ul>
          <li>
            <button 
              onClick={payOnDelivery}
              className="btn-color-primary w-full p-2 rounded my-2" 
              >
              { t('_transaction.Pay_on_delivery') }
            </button>
          </li>
          <li>
            <button className="btn-color-blue w-full p-2 rounded my-2">{ t('_transaction.Pay_with_paystack') }</button>
          </li>
        </ul>
        
        { dialog && <AlertDialog dialog={dialog} /> }
        
        { orderIsLoading && <LoadingDialog /> }
      </div>
    </section>
  );
}
