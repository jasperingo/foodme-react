
import React from 'react';
import { useTranslation } from 'react-i18next';
import EmptyList from '../components/EmptyList';
import CartEmptyIcon from '../icons/CartEmptyIcon';

export default function Cart() {

  const { t } = useTranslation();
  
  return (
    <section>

      <div className="container-x">
        <form className="py-3 flex gap-2" onSubmit={(e)=> e.preventDefault()}>
          <input 
            type="text" 
            placeholder={ t('_cart.Enter_cart_code')}
            className="p-2 flex-grow rounded outline-none border border-yellow-500" 
            />
          <button className="p-2 rounded btn-color-primary">{ t('_search.Search') }</button>
        </form>
      </div>

      <div className="container-x">
        <div className="lg:mx-auto lg:w-1/2">
          <EmptyList text="_empty.Your_cart_is_empty" Icon={CartEmptyIcon} />
        </div>
      </div>
    </section>
  );
}

