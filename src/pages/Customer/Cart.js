
import React from 'react';
import EmptyList from '../../components/EmptyList';
import CartCheckOutOrSave from '../../components/cart/CartCheckOutOrSave';
import { cartIcon } from '../../assets/icons';
import { useAppContext } from '../../hooks/contextHook';
import CartItem from '../../components/list_item/CartItem';
import { useHeader } from '../../hooks/headerHook';
import CartCodeForm from '../../components/cart/CartCodeForm';

export default function Cart() {

  useHeader({ 
    title: `Cart - Dailyneeds`,
    headerTitle: '_cart.Cart',
    topNavPaths: ['/cart']
  });

  const { 
    customer: { 
      customer: {
        customer: {
          customerToken
        }
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
          {  cartItems.length > 0 && <CartCheckOutOrSave userToken={customerToken} /> }
        </div>
      </div>
    </section>
  );
}
