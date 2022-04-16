
import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import AlertDialog from '../../components/dialog/AlertDialog';
import LoadingDialog from '../../components/dialog/LoadingDialog';
import FormTextArea from '../../components/form/FormTextArea';
import CartItem from '../../components/list_item/CartItem';
import PayWithPaystack from '../../components/PayWithPaystack';
import { useAppContext } from '../../hooks/contextHook';
import { useHeader } from '../../hooks/headerHook';
import { useOrderCreate } from '../../hooks/order/orderCreateHook';
import { useOrderPaymentTransactionFetch } from '../../hooks/order/orderPaymentTransactionFetchHook';
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

  const { 
    cart: {
      cart: {
        cart,
        cartItems
      } 
    },
    customer: {
      customer: {
        customer: {
          customerToken
        }
      } 
    } 
  } = useAppContext();

  const [
    orderSend, 
    orderSuccess,
    orderIsLoading, 
    orderError, 
    order,
    resetCreateOrder
  ] = useOrderCreate();

  const [
    transactionSend,
    transaction,
    transactionLoading,
    transactionSuccess,
    transactionError
  ] = useOrderPaymentTransactionFetch(customerToken);

  const orderNoteInput = useRef(null);

  const [dialog, setDialog] = useState(null);

  useEffect(
    function() {
      if (orderSuccess && order.payment_method === Order.PAYMENT_METHOD_CASH)
        history.push(`/cart/done/${order.id}`);
      else if (orderSuccess && order.payment_method === Order.PAYMENT_METHOD_CASHLESS && !transactionSuccess)
        transactionSend(order);
      else if (orderSuccess && order.payment_method === Order.PAYMENT_METHOD_CASHLESS && transactionError)
        history.push(`/cart/done/${order.id}`);
      else if (orderError && dialog === null) 
        setDialog({
          body: orderError,
          negativeButton: {
            text: '_extra.Done',
            action() {
              setDialog(null);
              resetCreateOrder();
            }
          },
        });
    },
    [history, orderSuccess, orderError, order, dialog, resetCreateOrder, transactionSuccess, transactionError, transactionSend]
  );

  if (cartItems.length === 0) {
    return <Redirect to="/" />
  }

  const discountTotal = cart.discount_total;

  const deliveryTotal = cart.delivery_total ?? 0;

  const total = cartItems.reduce((sum, i)=> sum + (i.product_variant.price * i.quantity), 0);

  const totalPlusDeliveryTotal = deliveryTotal + total;

  function placeOrder(paymentMethod) {
    setDialog({
      body: '_order._place_order_confirm',
      positiveButton: {
        text: '_extra.Yes',
        action() {
          setDialog(null);
          orderSend(paymentMethod, orderNoteInput.current.value);
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

        <dl className="mb-4">
          <SummaryItem text={t('_extra.Sub_total')} value={total} />
          {
            cart.delivery_total !== undefined && 
            <SummaryItem text={t('_delivery.Delivery_fee')} value={deliveryTotal} />
          }
          <SummaryItem text={t('_discount.Discount')} value={discountTotal} />
          <SummaryItem text={t('_extra.Total')} value={discountTotal > totalPlusDeliveryTotal ? 0 : totalPlusDeliveryTotal - discountTotal} />
        </dl>

        <FormTextArea ref={orderNoteInput} ID="order-note-input" label="_order.Order_note" />
        
        <ul>
          <li>
            <button 
              onClick={()=> placeOrder(Order.PAYMENT_METHOD_CASH)}
              className="btn-color-primary w-full p-2 rounded my-2" 
              >
              { t('_transaction.Pay_on_delivery') }
            </button>
          </li>
          <li>
            <button 
              onClick={()=> placeOrder(Order.PAYMENT_METHOD_CASHLESS)}
              className="btn-color-blue w-full p-2 rounded my-2"
              >
              { t('_transaction.Pay_with_paystack') }
            </button>
          </li>
        </ul>
        
        { dialog && <AlertDialog dialog={dialog} /> }
        
        { (orderIsLoading || transactionLoading) && <LoadingDialog /> }

        { 
          transactionSuccess && 
          <PayWithPaystack 
            amount={transaction.amount}
            email={transaction.user.email}
            reference={transaction.reference}
            onClose={()=> history.push(`/cart/done/${order.id}`)}
            onDone={()=> history.push(`/cart/done/${order.id}`)}
            />
        }
      </div>
    </section>
  );
}
