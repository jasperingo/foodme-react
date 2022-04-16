
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import DeliveryLocationForm from '../../components/form/DeliveryLocationForm';
import Loading from '../../components/Loading';
import Reload from '../../components/Reload';
import NetworkErrorCodes from '../../errors/NetworkErrorCodes';
import { useLocationList } from '../../hooks/address/locationListHook';
import { useDeliveryRouteLocationCreate } from '../../hooks/delilvery_route/deliveryRouteLocationCreateHook';
import { useHeader } from '../../hooks/headerHook';
import { useURLQuery } from '../../hooks/viewHook';

export default function DeliveryDurationCreate() {

  const [deliveryRoute] = useURLQuery(['delivery_route']);

  const history = useHistory();

  if (!deliveryRoute) {
    history.replace('/delivery-routes');
  }

  useHeader({ 
    title: `Create Delivery Location - DailyNeeds`,
    headerTitle: '_delivery.Add_delivery_location'
  });

  const [
    fetchLocations,
    locations,
    locationsLoading,
    locationsError,
    locationsLoaded
  ] = useLocationList();
  
  const [
    onSubmit, 
    loading, 
    formError, 
    formSuccess, 
    cityError,
    stateError
  ] = useDeliveryRouteLocationCreate(Number(deliveryRoute));

  useEffect(
    function() { 
      if (!locationsLoaded && locationsError === null) 
        fetchLocations(); 
    },
    [locationsLoaded, locationsError, fetchLocations]
  );

  useEffect(
    function() {
      if (formSuccess !== null) 
        history.replace(`/delivery-route/${deliveryRoute}`);
    },
    [deliveryRoute, history, formSuccess]
  );

  return (
    <section>
      <div className="container-x">

        {
          locationsLoaded && 
          <DeliveryLocationForm 
            deliveryLocation={{}}
            locations={locations}
            onSubmit={onSubmit}
            loading={loading}
            formError={formError}
            formSuccess={formSuccess}
            cityError={cityError}
            stateError={stateError}
            />
        }

        { locationsLoading && <Loading /> }

        { locationsError === NetworkErrorCodes.UNKNOWN_ERROR && <Reload action={fetchLocations} /> }

        { locationsError === NetworkErrorCodes.NO_NETWORK_CONNECTION && <Reload message="_errors.No_netowrk_connection" action={fetchLocations} /> }
        
      </div>
    </section>
  );
}
