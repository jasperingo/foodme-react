
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { Redirect, useHistory } from 'react-router-dom';
import EmptyList from '../../components/EmptyList';
import SingleList from '../../components/list/SingleList';
import Loading from '../../components/Loading';
import Reload from '../../components/Reload';
import { CART } from '../../context/actions/cartActions';
import { useAppContext } from '../../hooks/contextHook';
import { useDeliveryRouteDurationUnit } from '../../hooks/delilvery_route/deliveryRouteViewHook';
import { useHeader } from '../../hooks/headerHook';
import { useOrderRouteSuggest } from '../../hooks/order/orderRouteSuggestHook';
import { useMoneyFormat } from '../../hooks/viewHook';

function RouteDuration({ onSelect, weightFee, duration: { id, minimium, maximium, fee, unit } }) {

  const { t } = useTranslation();

  const unitText = useDeliveryRouteDurationUnit();

  const total = weightFee + fee;

  return (
    <li className="mb-3">
      <div className="flex flex-wrap gap-2 items-center">
        <div>{ minimium } - { maximium } { t(unitText(unit)) }</div>
        <div className="bg-color-gray text-sm px-2 rounded">{ useMoneyFormat(total) }</div>
        <button onClick={()=> onSelect(id, total)} className="btn-color-primary px-2 rounded">{ t('_extra.Select') }</button>
      </div>
    </li>
  );
}

function DeliveryFirmAndPricesItem({ onSelect, delivery }) {

  function onDurationSelected(duration, deliveryTotal) {
    onSelect({ 
      delivery_total: deliveryTotal,
      delivery_firm_id: delivery.delivery_firm.id,
      delivery_route_id: delivery.id,
      delivery_duration_id:duration,
      delivery_weights: delivery.route_weights.map(i=> ({ 
        delivery_weight_id: i.id, 
        product_variant_id: i.product_variant_id 
      }))
    });
  }

  const weightFee = delivery.route_weights.reduce((pv, cv)=> pv + cv.fee, 0);
  
  return (
    <li className="mb-5">
      <div className="md:p-2 md:shadow md:rounded">
        <div className="flex gap-2 items-center mb-1">
          <img src={delivery.delivery_firm.user.photo.href} alt="no" width="100" height="100" className="w-12 h-12 rounded" />
          <div className="flex-grow">{ delivery.delivery_firm.user.name }</div>
        </div>
        <ul>
          {
            delivery.route_durations.map(i=> (
              <RouteDuration key={`duration-${i.id}`} duration={i} weightFee={weightFee} onSelect={onDurationSelected} />
            ))
          }
        </ul>
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
