
import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Forbidden from '../../components/Forbidden';
import DeleteForm from '../../components/form/DeleteForm';
import DeliveryWeightForm from '../../components/form/DeliveryWeightForm';
import Loading from '../../components/Loading';
import NotFound from '../../components/NotFound';
import Reload from '../../components/Reload';
import NetworkErrorCodes from '../../errors/NetworkErrorCodes';
import { useAppContext } from '../../hooks/contextHook';
import { useDeliveryRouteWeightDelete } from '../../hooks/delilvery_route/deliveryRouteWeightDeleteHook';
import { useDeliveryRouteWeightFetch } from '../../hooks/delilvery_route/deliveryRouteWeightFetchHook';
import { useDeliveryRouteWeightUpdate } from '../../hooks/delilvery_route/deliveryRouteWeightUpdateHook';
import { useHeader } from '../../hooks/headerHook';

export default function DeliveryWeightUpdate() {

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
    fetchDeliveryWeight,
    deliveryWeight,
    deliveryWeightLoading,
    deliveryWeightError,
    deliveryWeightID,
    unfetchDeliveryWeight
  ] = useDeliveryRouteWeightFetch(deliveryFirmToken);

  useHeader({ 
    title: `${deliveryWeight ? 'Edit Weight' : 'Loading...'} - Delivery Route Weight`,
    headerTitle: '_delivery.Edit_delivery_weight'
  });

  const [
    onSubmit, 
    loading, 
    formError, 
    formSuccess, 
    minError, 
    maxError, 
    feeError
  ] = useDeliveryRouteWeightUpdate();

  const [
    deleteOnSubmit, 
    deleteLoading, 
    deleteFormSuccess, 
    deleteFormError
  ] = useDeliveryRouteWeightDelete();

  useEffect(
    function() {
      if ((deliveryWeight !== null || deliveryWeightError !== null) && deliveryWeightID !== ID) 
        unfetchDeliveryWeight();
      else if (deliveryWeight === null && deliveryWeightError === null)
        fetchDeliveryWeight(ID);
    },
    [ID, deliveryWeight, deliveryWeightError, deliveryWeightID, fetchDeliveryWeight, unfetchDeliveryWeight]
  );

  useEffect(
    function() {
      if (deleteFormSuccess !== null) 
        history.push(`/delivery-route/${deliveryWeight.delivery_route_id}/weights`);
    }, 
    [deliveryWeight, deleteFormSuccess, history]
  );

  return (
    <section>
      <div className="container-x">
        {
          deliveryWeight !== null &&
          <>
            <DeliveryWeightForm 
              weight={deliveryWeight}
              onSubmit={onSubmit}
              loading={loading}
              formError={formError}
              formSuccess={formSuccess}
              minError={minError}
              maxError={maxError} 
              feeError={feeError}
              />
            
            <DeleteForm 
              confirmMessage="_delivery._delivery_weight_delete_confirm"
              onSubmit={deleteOnSubmit} 
              dialog={deleteLoading}
              formSuccess={deleteFormSuccess}
              formError={deleteFormError}
              />
          </>
        }

        { deliveryWeightLoading && <Loading /> }

        { deliveryWeightError === NetworkErrorCodes.NOT_FOUND && <NotFound /> }

        { deliveryWeightError === NetworkErrorCodes.FORBIDDEN && <Forbidden /> }

        { 
          deliveryWeightError === NetworkErrorCodes.UNKNOWN_ERROR && 
          <Reload action={()=> fetchDeliveryWeight(ID)} /> 
        }

        { 
          deliveryWeightError === NetworkErrorCodes.NO_NETWORK_CONNECTION && 
          <Reload message="_errors.No_netowrk_connection" action={()=> fetchDeliveryWeight(ID)} /> 
        }

      </div>
    </section>
  );
}
