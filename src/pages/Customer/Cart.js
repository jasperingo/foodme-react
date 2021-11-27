
import React from 'react';
import { useListRender } from '../../context/AppHooks';
import EmptyList from '../../components/EmptyList';
import { useAppContext } from '../../context/AppContext';
import { FETCH_STATUSES } from '../../context/AppActions';
import CartItem from '../../components/CartItem';
import CartCodeForm from '../../components/CartCodeForm';
import CartCheckOutOrSave from '../../components/CartCheckOutOrSave';
import CustomerApp from '../../apps/CustomerApp';
import { cartIcon } from '../../assets/icons';


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
                    <EmptyList text="_empty.Your_cart_is_empty" icon={cartIcon} />
                  </li>
                )
              )
            }
          </ul>
          { cartItemsFetchStatus === FETCH_STATUSES.DONE && <CartCheckOutOrSave appType={CustomerApp.TYPE} /> }
        </div>
      </div>
    </section>
  );
}


