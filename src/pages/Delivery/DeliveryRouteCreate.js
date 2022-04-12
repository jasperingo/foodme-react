
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import DeliveryRouteForm from '../../components/form/DeliveryRouteForm';
import Loading from '../../components/Loading';
import Reload from '../../components/Reload';
import NetworkErrorCodes from '../../errors/NetworkErrorCodes';
import { useLocationList } from '../../hooks/address/locationListHook';
import { useDeliveryRouteCreate } from '../../hooks/delilvery_route/deliveryRouteCreateHook';
import { useHeader } from '../../hooks/headerHook';

export default function DeliveryRouteCreate() {

  const history = useHistory();

  useHeader({ 
    title: `Create Delivery Route - DailyNeeds`,
    headerTitle: '_delivery.Add_delivery_route'
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
    id, 
    loading, 
    formError, 
    formSuccess, 
    stateError, 
    cityError, 
    doorDeliveryError,
  ] = useDeliveryRouteCreate();

  useEffect(
    function() { 
      if (!locationsLoaded && locationsError === null) 
        fetchLocations(); 
    },
    [locationsLoaded, locationsError, fetchLocations]
  );
  
  useEffect(
    function() {
      if (id > 0)
        history.push(`/delivery-route/${id}`);
    }, 
    [id, history]
  );
  
  return (
    <section>
      <div className="container-x">
        {
          locationsLoaded && 
          <DeliveryRouteForm 
            deliveryRoute={{}}
            locations={locations}
            onSubmit={onSubmit}
            dialog={loading}
            formError={formError}
            formSuccess={formSuccess}
            stateError={stateError} 
            cityError={cityError}
            doorDeliveryError={doorDeliveryError}
            />
        }

        { locationsLoading && <Loading /> }

        { locationsError === NetworkErrorCodes.UNKNOWN_ERROR && <Reload action={fetchLocations} /> }

        { locationsError === NetworkErrorCodes.NO_NETWORK_CONNECTION && <Reload message="_errors.No_netowrk_connection" action={fetchLocations} /> }
                
      </div>
    </section>
  );
}
