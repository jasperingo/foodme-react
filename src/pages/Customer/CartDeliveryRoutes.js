
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Redirect, useHistory } from 'react-router-dom';
import EmptyList from '../../components/EmptyList';
import SingleList from '../../components/list/SingleList';
import Loading from '../../components/Loading';
import Reload from '../../components/Reload';
import { CART } from '../../context/actions/cartActions';
import { useAppContext } from '../../hooks/contextHook';
import { useHeader } from '../../hooks/headerHook';
import { useOrderRouteSuggest } from '../../hooks/order/orderRouteSuggestHook';
import { useMoneyFormatter } from '../../hooks/viewHook';

function DeliveryFirmAndPricesItem({ onSelect, delivery }) {

  const { t } = useTranslation();

  const moneyFormat = useMoneyFormatter();
  
  const weightFee = delivery.route_weights.reduce((pv, cv)=> pv + cv.fee, 0);

  function onSelected() {
    onSelect({ 
      delivery_total: weightFee,
      delivery_firm_id: delivery.delivery_firm.id,
      delivery_route_id: delivery.id,
      delivery_weights: delivery.route_weights.map(i=> ({ 
        delivery_weight_id: i.id, 
        product_variant_id: i.product_variant_id 
      }))
    });
  }

  return (
    <li className="mb-5">
      <div className="flex gap-2 items-center md:p-2 md:shadow md:rounded">
        <img src={delivery.delivery_firm.user.photo.href} alt="no" width="100" height="100" className="w-20 h-20 rounded" />
        <div className="flex-grow">
          <Link to={`/delivery-firm/${delivery.delivery_firm.id}`} className="font-bold truncate mb-1">{ delivery.delivery_firm.user.name }</Link>
          <div className="text-color-primary mb-1">{ moneyFormat(weightFee) }</div>
          <button onClick={onSelected} className="btn-color-primary px-2 rounded">{ t('_extra.Select') }</button>
        </div>
      </div>
    </li>
  );
}

export default function CartDeliveryRoutes() {

  useHeader({ 
    title: `Delivery Routes (Cart) - Dailyneeds`,
    headerTitle: '_delivery.Delivery_firms',
    topNavPaths: ['/cart']
  });

  const { 
    cart: {
      cartDispatch,
      cart: {
        cartItems
      } 
    }
  } = useAppContext();

  const history = useHistory();

  const [fetchRouteSuggestions, data, isLoading, error, isLoaded] = useOrderRouteSuggest();
  
  useEffect(
    function() {
      if (!isLoaded && error === null && cartItems.length > 0) 
        fetchRouteSuggestions();
    }, 
    [isLoaded, error, fetchRouteSuggestions, cartItems.length]
  );

  if (cartItems.length === 0) {
    return <Redirect to="/" />
  }

  function onSelect(value) {
    cartDispatch({
      type: CART.DELIVERY_ROUTE_CHOOSEN,
      payload: value
    });
    
    history.push('/cart/discounts');
  }

  return (
    <section>

      <div className="container-x">

        <SingleList
          data={data}
          className="list-2-x"
          renderDataItem={(item)=> (
            <DeliveryFirmAndPricesItem  key={`route-${item.id}`} delivery={item} onSelect={onSelect} />
          )}
          footer={
            (isLoading && <li key="route-footer" className="list-2-x-col-span"> <Loading /> </li>) ||
            (error && <li key="route-footer" className="list-2-x-col-span"> <Reload message={error} action={fetchRouteSuggestions} /> </li>) || 
            (isLoaded && data.length === 0 && <li key="route-footer" className="list-2-x-col-span"> <EmptyList text='_empty.No_delivery_suggestion_for_cart' /> </li>)
          }
          />

      </div>

    </section>
  );
}
