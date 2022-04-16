
import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import DeleteForm from '../../components/form/DeleteForm';
import DeliveryLocationForm from '../../components/form/DeliveryLocationForm';
import { useLocationList } from '../../hooks/address/locationListHook';
import Loading from '../../components/Loading';
import NotFound from '../../components/NotFound';
import Reload from '../../components/Reload';
import { useAppContext } from '../../hooks/contextHook';
import { useDeliveryRouteLocationFetch } from '../../hooks/delilvery_route/deliveryRouteLocationFetchHook';
import { useHeader } from '../../hooks/headerHook';
import NetworkErrorCodes from '../../errors/NetworkErrorCodes';
import Forbidden from '../../components/Forbidden';
import { useDeliveryRouteLocationUpdate } from '../../hooks/delilvery_route/deliveryRouteLocationUpdateHook';
import { useDeliveryRouteLocationDelete } from '../../hooks/delilvery_route/deliveryRouteLocationDeleteHook';

export default function DeliveryDurationUpdate() {

  const { ID } = useParams();

  const history = useHistory();

  const {
    deliveryFirm: { 
      deliveryFirm: {
        deliveryFirmToken
      }
    } 
  } = useAppContext();

  const [
    fetchLocations,
    locations,
    locationsLoading,
    locationsError,
    locationsLoaded
  ] = useLocationList();

  const [
    fetchDeliveryLocation,
    deliveryLocation,
    deliveryLocationLoading,
    deliveryLocationError,
    deliveryLocationID,
    unfetchDeliveryLocation
  ] = useDeliveryRouteLocationFetch(deliveryFirmToken);

  useHeader({ 
    title: `${deliveryLocation ? 'Edit Location' : 'Loading...'} - Delivery Route Location`,
    headerTitle: '_delivery.Edit_delivery_location'
  });

  const [
    onSubmit, 
    loading, 
    formError, 
    formSuccess, 
    stateError, 
    cityError
  ] = useDeliveryRouteLocationUpdate();

  const [
    deleteOnSubmit, 
    deleteLoading, 
    deleteFormSuccess, 
    deleteFormError
  ] = useDeliveryRouteLocationDelete();

  useEffect(
    function() { 
      if (!locationsLoaded && locationsError === null) 
        fetchLocations(); 
    },
    [locationsLoaded, locationsError, fetchLocations]
  );

  useEffect(
    function() {
      if ((deliveryLocation !== null || deliveryLocationError !== null) && deliveryLocationID !== ID) 
        unfetchDeliveryLocation();
      else if (deliveryLocation === null && deliveryLocationError === null)
        fetchDeliveryLocation(ID);
    },
    [ID, deliveryLocation, deliveryLocationError, deliveryLocationID, fetchDeliveryLocation, unfetchDeliveryLocation]
  );
  
  useEffect(
    function() {
      if (deleteFormSuccess !== null) 
        history.push(`/delivery-route/${deliveryLocation.delivery_route_id}`);
    }, 
    [deliveryLocation, deleteFormSuccess, history]
  );

  return (
    <section>
      <div className="container-x">
        {
          locationsLoaded && deliveryLocation !== null &&
          <>
            <DeliveryLocationForm 
              locations={locations}
              deliveryLocation={deliveryLocation}
              onSubmit={onSubmit}
              loading={loading}
              formError={formError}
              formSuccess={formSuccess}
              cityError={cityError}
              stateError={stateError} 
              />
            
            <DeleteForm 
              confirmMessage="_delivery._delivery_location_delete_confirm"
              onSubmit={deleteOnSubmit} 
              dialog={deleteLoading}
              formSuccess={deleteFormSuccess}
              formError={deleteFormError}
              />
          </>
        }

        { (deliveryLocationLoading || locationsLoading) && <Loading /> }

        { 
          (deliveryLocationError === NetworkErrorCodes.NOT_FOUND || locationsError === NetworkErrorCodes.NOT_FOUND) && 
          <NotFound /> 
        }

        { 
          (deliveryLocationError === NetworkErrorCodes.FORBIDDEN || locationsError === NetworkErrorCodes.FORBIDDEN) && 
          <Forbidden /> 
        }

        { 
          (deliveryLocationError === NetworkErrorCodes.UNKNOWN_ERROR || locationsError === NetworkErrorCodes.UNKNOWN_ERROR) && 
          <Reload action={()=> fetchDeliveryLocation(ID)} /> 
        }

        { 
          (deliveryLocationError === NetworkErrorCodes.NO_NETWORK_CONNECTION || locationsError === NetworkErrorCodes.NO_NETWORK_CONNECTION) && 
          <Reload message="_errors.No_netowrk_connection" action={()=> fetchDeliveryLocation(ID)} /> 
        }
      </div>
    </section>
  );
}
