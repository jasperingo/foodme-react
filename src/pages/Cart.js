import React from 'react';
import { Link } from 'react-router-dom';
import { cartIcon } from '../assets/icons';
import EmptyList from '../components/EmptyList';
import { useAppContext } from '../hooks/contextHook';
import CartItem from '../components/list_item/CartItem';
import { useHeader } from '../hooks/headerHook';
import { useMoneyFormatter } from '../hooks/viewHook';
import { useTranslation } from 'react-i18next';

export default function Cart() {

  useHeader({ 
    title: `Cart - Dailyneeds`,
    headerTitle: '_cart.Cart',
    topNavPaths: ['/cart']
  });

  const { 
    cart: {
      cart: {
        cartItems
      } 
    }
  } = useAppContext();

  const { t } = useTranslation();

  const moneyFormat = useMoneyFormatter();

  return (
    <section>

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
          {  cartItems.length > 0 && 
            (
              <div className="lg:my-2 lg:w-80 lg:py-10 lg:px-4 lg:shadow lg:rounded">
                <div className="flex items-center mb-2">
                  <span className="text-sm flex-grow">{ t('_extra.Total') }: </span>
                  <span className="font-bold text-lg">
                    { 
                      moneyFormat(
                        cartItems.reduce((sum, i)=> sum + (i.product_variant.price * i.quantity), 0)
                      ) 
                    }
                  </span>
                </div>
                
                <Link 
                  to="/cart/delivery-method"
                  className="block w-full py-3 my-2 rounded btn-color-primary text-center"
                  >
                  { t('_cart.Check_out') }
                </Link>
              </div>
            )
          }
        </div>
      </div>
    </section>
  );
}
