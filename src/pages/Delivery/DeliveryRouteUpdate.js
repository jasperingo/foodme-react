
import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import DeliveryRouteForm from '../../components/form/DeliveryRouteForm';
import DeleteForm from '../../components/form/DeleteForm';
import Loading from '../../components/Loading';
import Reload from '../../components/Reload';
import { useAppContext } from '../../hooks/contextHook';
import { useDeliveryRouteFetch } from '../../hooks/delilvery_route/deliveryRouteFetchHook';
import { useDeliveryRouteUpdate } from '../../hooks/delilvery_route/deliveryRouteUpdateHook';
import { useHeader } from '../../hooks/headerHook';
import { useDeliveryRouteDelete } from '../../hooks/delilvery_route/deliveryRouteDeleteHook';
import NetworkErrorCodes from '../../errors/NetworkErrorCodes';
import Forbidden from '../../components/Forbidden';
import NotFound from '../../components/NotFound';

export default function DeliveryRouteUpdate() {

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
    fetchDeliveryRoute,
    deliveryRoute,
    deliveryRouteLoading,
    deliveryRouteError,
    deliveryRouteID,
    unfetchDeliveryRoute
  ] = useDeliveryRouteFetch(deliveryFirmToken);

  useHeader({ 
    title: `${deliveryRoute?.name ?? 'Loading...'} - Delivery Route`,
    headerTitle: '_delivery.Edit_delivery_route'
  });

  const [
    onSubmit, 
    loading, 
    formError, 
    formSuccess, 
    nameError,
    doorDeliveryError,
  ] = useDeliveryRouteUpdate();

  const [
    deleteOnSubmit, 
    deleteLoading, 
    deleteFormSuccess, 
    deleteFormError
  ] = useDeliveryRouteDelete();

  useEffect(
    function() {
      if ((deliveryRoute !== null || deliveryRouteError !== null) && deliveryRouteID !== ID) 
        unfetchDeliveryRoute();
      else if (deliveryRoute === null && deliveryRouteError === null)
        fetchDeliveryRoute(ID);
    },
    [ID, deliveryRoute, deliveryRouteError, deliveryRouteID, fetchDeliveryRoute, unfetchDeliveryRoute]
  );

  useEffect(
    function() {
      if (deleteFormSuccess !== null) history.push('/delivery-routes');
    }, 
    [deleteFormSuccess, history]
  );
  
  function retryLoad() {
    fetchDeliveryRoute(ID);
  }

  return (
    <section>
      <div className="container-x">
        
        {
          deliveryRoute !== null && 
          <>
            <DeliveryRouteForm 
              deliveryRoute={deliveryRoute}
              onSubmit={onSubmit}
              loading={loading}
              formError={formError}
              formSuccess={formSuccess}
              nameError={nameError}
              doorDeliveryError={doorDeliveryError}
              />
            
            <DeleteForm 
              confirmMessage="_delivery._delivery_route_delete_confirm"
              onSubmit={deleteOnSubmit} 
              dialog={deleteLoading}
              formSuccess={deleteFormSuccess}
              formError={deleteFormError}
              />
          </>
        }
        
        { deliveryRouteLoading && <Loading /> }

        { deliveryRouteError === NetworkErrorCodes.NOT_FOUND && <NotFound /> }

        { deliveryRouteError === NetworkErrorCodes.FORBIDDEN && <Forbidden /> }
        
        { 
          deliveryRouteError === NetworkErrorCodes.UNKNOWN_ERROR && 
          <Reload action={retryLoad} /> 
        }

        { 
          deliveryRouteError === NetworkErrorCodes.NO_NETWORK_CONNECTION && 
          <Reload message="_errors.No_netowrk_connection" action={retryLoad} /> 
        }

      </div>
    </section>
  );
}
