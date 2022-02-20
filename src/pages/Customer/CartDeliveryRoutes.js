
import React from 'react'
import { useTranslation } from 'react-i18next';
import { Redirect, useHistory } from 'react-router-dom';
import SingleList from '../../components/list/SingleList';
import Loading from '../../components/Loading';
import Reload from '../../components/Reload';
import { CART } from '../../context/actions/cartActions';
import { useAppContext } from '../../hooks/contextHook';
import { useDeliveryRouteDurationUnit } from '../../hooks/delilvery_route/deliveryRouteViewHook';
import { useHeader } from '../../hooks/headerHook';
import { useOrderRouteSuggest } from '../../hooks/order/orderRouteSuggestHook';
import { useMoneyFormat } from '../../hooks/viewHook';

function RouteDuration({ onSelect, duration: { id, minimium, maximium, fee, unit } }) {

  const { t } = useTranslation();

  const unitText = useDeliveryRouteDurationUnit();

  return (
    <li className="mb-3">
      <div className="flex flex-wrap gap-2">
        <div>{ minimium } - { maximium } { t(unitText(unit)) }</div>
        <div className="bg-color-gray text-sm p-1 rounded">+ { useMoneyFormat(fee) }</div>
        <button onClick={()=> onSelect(id)} className="btn-color-primary px-2 rounded">{ t('_extra.Select') }</button>
      </div>
    </li>
  );
}

function DeliveryFirmAndPricesItem({ onSelect, delivery }) {

  const { t } = useTranslation();

  function onDurationSelected(duration) {
    onSelect({ 
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
    <li className="mb-4">
      <div className="md:p-2 md:shadow md:rounded">
        <div className="flex gap-2 items-center mb-1">
          <img src={delivery.delivery_firm.user.photo.href} alt="no" width="100" height="100" className="w-12 h-12 rounded" />
          <div>
            <div>{ delivery.delivery_firm.user.name }</div>
            <div className="font-bold mb-1">{ t('_delivery.Weight_fee') }: { useMoneyFormat(weightFee) }</div>
          </div>
        </div>
        <ul>
          {
            delivery.route_durations.map(i=> (
              <RouteDuration key={`duration-${i.id}`} duration={i} onSelect={onDurationSelected} />
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
    headerTitle: '_delivery.Delivery_routes',
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

  const [data, isLoading, error, load] = useOrderRouteSuggest();
  
  if (cartItems.length === 0) {
    return <Redirect to="/cart" />
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
            (isLoading && <li key="route-footer"> <Loading /> </li>) ||
            (error && <li key="route-footer"> <Reload message={error} action={load} /> </li>)
          }
          />

      </div>

    </section>
  );
}
