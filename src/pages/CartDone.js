
import Icon from '@mdi/react';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { checkIcon } from '../assets/icons';
import { CART } from '../context/actions/cartActions';
import { useAppContext } from '../hooks/contextHook';
import { useHeader } from '../hooks/headerHook';

export default function CartDone() {

  useHeader({ 
    title: `Order Placed (Cart) - Dailyneeds`,
    headerTitle: '_order.Order_placed',
    topNavPaths: ['/cart']
  });

  const { ID } = useParams();

  const { t } = useTranslation();

  const {
    cart: {
      cartDispatch 
    }
  } = useAppContext();
  
  useEffect(
    function() { cartDispatch({ type: CART.EMPTIED }); },
    [cartDispatch]
  );

  return (
    <section>

      <div className="container-x">

        <div className="my-4 p-4 max-w-lg mx-auto md:shadow md:rounded">

          <Icon path={checkIcon} className="h-28 w-28 mx-auto text-color-primary border border-yellow-500 rounded-full p-2 mb-4" />
          
          <div className="text-center font-bold mb-8">
            <div className="mb-4">{ t('_order.Your_order_have_been_placed') }</div>
            <Link to={`/order/${ID}`} className="btn-color-primary p-2 rounded">{ t('_order.View_my_order') }</Link>
          </div>

          <div className="text-sm bg-color-gray p-2">{ t('_order._order_needs_vendor_acceptance') }.</div>

        </div>

      </div>

    </section>
  );
}
