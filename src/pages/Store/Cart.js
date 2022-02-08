
import React from 'react';
import { cartIcon } from '../../assets/icons';
import CartCheckOutOrSave from '../../components/cart/CartCheckOutOrSave';
import EmptyList from '../../components/EmptyList';
import CartItem from '../../components/list_item/CartItem';
import { useAppContext } from '../../hooks/contextHook';
import { useHeader } from '../../hooks/headerHook';
import { FETCH_STATUSES } from '../../repositories/Fetch';

export default function Cart() {

  useHeader({ 
    title: `Cart - Dailyneeds`,
    headerTitle: '_cart.Cart',
    topNavPaths: ['/cart']
  });

  const { 
    cart: {
      cart: {
        cartItems,
        cartItemsFetchStatus
      } 
    }
  } = useAppContext();

  return (
    <section>

      {/* <CartCodeForm /> */}

      <div className="container-x">
        <div className="lg:flex lg:gap-4 lg:items-start">
          <ul className="py-2 lg:flex-grow">
            { 
              cartItems.map((item, i)=> (
                <CartItem
                  key={`cart-item-${i}`} 
                  cartItem={item} 
                  />
              ))
            }
            {
              cartItemsFetchStatus === FETCH_STATUSES.EMPTY && 
              <EmptyList text="_empty.Your_cart_is_empty" icon={cartIcon} />
            }
          </ul>
          { cartItemsFetchStatus === FETCH_STATUSES.DONE && <CartCheckOutOrSave saveOnly={true} /> }
        </div>
      </div>
    </section>
  );
}


