
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useListRender, useMoneyFormat } from '../../context/AppHooks';
import EmptyList from '../../components/EmptyList';
import CartEmptyIcon from '../../icons/CartEmptyIcon';
import { useAppContext } from '../../context/AppContext';
import { FETCH_STATUSES } from '../../context/AppActions';
import CartItem from '../../components/CartItem';

function CheckOut() {

  const { t } = useTranslation();

  const { cart: {cartItems} } = useAppContext();

  return (
    <div className="lg:w-80 lg:py-10 lg:px-4 lg:shadow lg:rounded">
      <div className="flex items-center mb-2">
        <strong className="font-normal text-sm flex-grow">{ t('_extra.Total') }: </strong>
        <span className="font-bold text-lg">{ useMoneyFormat(cartItems.reduce((sum, i)=> i!==null ? sum+i.amount : sum, 0)) }</span>
      </div>
      <button className="w-full py-3 my-2 rounded btn-color-primary" onClick={()=> alert('Checking out...')}>{ t('_cart.Check_out') }</button>
      <button 
        className="w-full py-3 my-2 rounded btn-color-blue" 
        onClick={()=> alert('Saving cart...')}
        >
        { t('_extra.Save') }
      </button>
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
          { cartItemsFetchStatus === FETCH_STATUSES.DONE && <CheckOut /> }
        </div>
      </div>
    </section>
  );
}


