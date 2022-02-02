
import React from 'react';
import EmptyList from '../../components/EmptyList';
//import CartCodeForm from '../../components/CartCodeForm';
import CartCheckOutOrSave from '../../components/cart/CartCheckOutOrSave';
import { cartIcon } from '../../assets/icons';
import { useAppContext } from '../../hooks/contextHook';
import { FETCH_STATUSES } from '../../repositories/Fetch';
import CartItem from '../../components/list_item/CartItem';
import { useHeader } from '../../hooks/headerHook';


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
          { cartItemsFetchStatus === FETCH_STATUSES.DONE && <CartCheckOutOrSave /> }
        </div>
      </div>
    </section>
  );
}


