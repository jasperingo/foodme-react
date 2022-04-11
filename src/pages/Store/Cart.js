
import React from 'react';
import { cartIcon } from '../../assets/icons';
import CartCheckOutOrSave from '../../components/cart/CartCheckOutOrSave';
import CartCodeForm from '../../components/cart/CartCodeForm';
import EmptyList from '../../components/EmptyList';
import CartItem from '../../components/list_item/CartItem';
import { useAppContext } from '../../hooks/contextHook';
import { useHeader } from '../../hooks/headerHook';

export default function Cart() {

  useHeader({ 
    title: `Cart - Dailyneeds`,
    headerTitle: '_cart.Cart',
    topNavPaths: ['/cart']
  });

  const { 
    store: { 
      store: {
        storeToken
      }
    },
    cart: {
      cart: {
        cartItems
      } 
    }
  } = useAppContext();

  return (
    <section>

      <CartCodeForm />

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
               cartItems.length === 0 &&  
              <EmptyList text="_empty.Your_cart_is_empty" icon={cartIcon} />
            }
          </ul>
          {  cartItems.length > 0 &&  <CartCheckOutOrSave userToken={storeToken} saveOnly={true} /> }
        </div>
      </div>
    </section>
  );
}


