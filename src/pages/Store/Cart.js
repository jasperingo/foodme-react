
import React from 'react';
import StoreApp from '../../apps/StoreApp';
import CartCheckOutOrSave from '../../components/CartCheckOutOrSave';
import CartCodeForm from '../../components/CartCodeForm';
import CartItem from '../../components/CartItem';
import EmptyList from '../../components/EmptyList';
import { FETCH_STATUSES } from '../../context/AppActions';
import { useAppContext } from '../../context/AppContext';
import { useListRender } from '../../context/AppHooks';
import CartEmptyIcon from '../../icons/CartEmptyIcon';

export default function Cart() {

  const { cart: {
      cartItems,
      cartItemsFetchStatus
    } 
  } = useAppContext();

  return (
    <section>

      <CartCodeForm />

      <div className="container-x">
        <div className="lg:flex lg:gap-4 lg:items-start">
          <ul className="py-2 lg:flex-grow">
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
          { cartItemsFetchStatus === FETCH_STATUSES.DONE && <CartCheckOutOrSave appType={StoreApp.TYPE} /> }
        </div>
      </div>
    </section>
  );
}


