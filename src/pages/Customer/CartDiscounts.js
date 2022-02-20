
import React from 'react';
import { Redirect } from 'react-router-dom';
import { useAppContext } from '../../hooks/contextHook';
import { useHeader } from '../../hooks/headerHook';
import { useMoneyFormat } from '../../hooks/viewHook';

function ProductWithDiscount() {

  return (
    <li>
      <div className="flex lg:flex-grow">
        <img 
          src="/photos/about-resturant.jpg" 
          alt="jack"
          className="w-20 h-20 border rounded block" 
          />
        <div className="flex-grow pl-2">
          <div className="mb-1">Spoilt beans</div>
          <div className="font-bold mb-1">{ useMoneyFormat(90) }</div>
        </div>
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

        <ul>
          <ProductWithDiscount />
        </ul>

      </div>

    </section>
  );
}
