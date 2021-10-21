
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useListRender, useMoneyFormat } from '../context/AppHooks';
import EmptyList from '../components/EmptyList';
import QuantityChooser from '../components/QuantityChooser';
import CartEmptyIcon from '../icons/CartEmptyIcon';
import DeleteIcon from '../icons/DeleteIcon';
import { useAppContext } from '../context/AppContext';
import { CART, FETCH_STATUSES } from '../context/AppActions';
import AlertDialog from '../components/AlertDialog';


function CartItem({ cartItem }) {

  const { t } = useTranslation();

  const { cartDispatch } = useAppContext();

  const [dialog, setDialog] = useState(null);

  function onQuantityButtonClicked(value) {
    cartDispatch({
      type: CART.ITEM_QUANTITY_CHANGED,
      payload: {
        item: cartItem,
        value
      }
    });
  }
  
  function onRemoveClicked() {

    setDialog({
      body: '_cart._confirm_item_removal',
      positiveButton: {
        text: '_extra.Yes',
        action() {
          cartDispatch({
            type: CART.ITEM_REMOVED,
            payload: cartItem
          });
          setDialog(null);
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
    <li>
      <div className="mb-5">
        <div className="flex">
          <img 
            src={`/photos/products/${cartItem.product.photo}`} 
            alt={'ja'} 
            className="w-20 h-20 border rounded block md:w-full md:h-40" 
            />
          <div className="flex-grow pl-2">
            <h4 className="mb-1">{ cartItem.product.title }</h4>
            <div className="font-bold mb-1">{ useMoneyFormat(cartItem.amount) }</div>
            <div className="text-sm text-blue-500">
              <span>Delivery: </span>
              <span className="">{ useMoneyFormat(cartItem.delivery_fee) }</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2 py-2">
          <QuantityChooser 
            quantity={cartItem.quantity}
            unit={cartItem.unit} 
            onQuantityChanged={onQuantityButtonClicked}
            />
          <button onClick={onRemoveClicked}>
            <DeleteIcon classList="fill-current text-color-primary" />
            <span className="sr-only">{ t('_cart.Remove_cart_item') }</span>
          </button>
        </div>
      </div>
      { dialog && 
        <AlertDialog 
          body={dialog.body} 
          positiveButton={dialog.positiveButton} 
          negativeButton={dialog.negativeButton} 
          /> 
      }
    </li>
  );
}

function CheckOut() {

  const { t } = useTranslation();

  const { cart: {cartItems} } = useAppContext();

  return (
    <div>
      <div className="flex items-center mb-2">
        <strong className="font-normal text-sm flex-grow">{ t('_extra.Total') }: </strong>
        <span className="font-bold text-lg">{ useMoneyFormat(cartItems.reduce((sum, i)=> i!==null ? sum+i.amount : sum, 0)) }</span>
      </div>
      <button className="w-full py-3 rounded btn-color-primary" onClick={()=> alert('Checking out...')}>{ t('_cart.Check_out') }</button>
    </div>
  );
}

export default function Cart() {

  const { t } = useTranslation();

  const { cart: {
      cartItems,
      cartItemsFetchStatus
    } 
  } = useAppContext();

  return (
    <section>

      <div className="container-x">
        <form className="py-3 flex gap-2" onSubmit={(e)=> e.preventDefault()}>
          <input 
            type="text" 
            placeholder={ t('_cart.Enter_cart_code')}
            className="p-2 flex-grow rounded outline-none border border-yellow-500 bg-color" 
            />
          <button className="p-2 rounded btn-color-primary">{ t('_search.Search') }</button>
        </form>
      </div>

      <div className="container-x">
        <ul className="list-x">
          { 
            useListRender(
              cartItems, 
              cartItemsFetchStatus,
              (item, i)=> (
                <CartItem 
                  key={`cart-item-${i}`} 
                  cartItem={item} 
                  />
              ),
              null, 
              null,
              (k)=> (
                <li key={k}>
                  <EmptyList text="_empty.Your_cart_is_empty" Icon={CartEmptyIcon} />
                </li>
              )
            )
          }
        </ul>
        { cartItemsFetchStatus === FETCH_STATUSES.DONE && <CheckOut /> }
      </div>
    </section>
  );
}


