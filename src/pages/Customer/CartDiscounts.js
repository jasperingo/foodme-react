
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Redirect } from 'react-router-dom';
import { useAppContext } from '../../hooks/contextHook';
import { useHeader } from '../../hooks/headerHook';
import { useMoneyFormat } from '../../hooks/viewHook';

function DiscountChooser() {

  const { t } = useTranslation();

  return (
    <li className="mb-2">
      <div className="flex gap-2">
        <div>Black friday</div>
        <div className="text-sm p-1 font-bold">{ useMoneyFormat(37) }% off</div>
        <button className="btn-color-primary px-2 rounded">{ t('_extra.Select') }</button>
      </div>
    </li>
  );
}

function ProductWithDiscount() {

  return (
    <li>
      <div className="md:p-2 md:shadow md:rounded">
        <div className="flex gap-2">
          <img 
            src="/photos/about-resturant.jpg" 
            alt="jack"
            className="w-12 h-12 border rounded block" 
            />
          <div className="flex-grow">
            <div className="mb-1">Spoilt beans</div>
            <div className="mb-1">{ useMoneyFormat(90) }</div>
          </div>
        </div>
        <ul>
          <DiscountChooser />
          <DiscountChooser />
        </ul>
      </div>
    </li>
  );
}

export default function CartDiscounts() {

  useHeader({ 
    title: `Discounts (Cart) - Dailyneeds`,
    headerTitle: '_discount.Product_discounts',
    topNavPaths: ['/cart']
  });

  const { 
    cart: {
      //cartDispatch,
      cart: {
        cartItems
      } 
    }
  } = useAppContext();

  //const history = useHistory();


  
  if (cartItems.length === 0) {
    return <Redirect to="/cart" />
  }

  
  return (
    <section>

      <div className="container-x">

        <ul className="my-4">
          <ProductWithDiscount />
        </ul>

      </div>

    </section>
  );
}
