
import React from 'react';
import DeleteForm from '../../components/form/DeleteForm';
import DeliveryWeightForm from '../../components/form/DeliveryWeightForm';
import Loading from '../../components/Loading';
import NotFound from '../../components/NotFound';
import Reload from '../../components/Reload';
import { useAppContext } from '../../hooks/contextHook';
import { useDeliveryRouteWeightDelete } from '../../hooks/delilvery_route/deliveryRouteWeightDeleteHook';
import { useDeliveryRouteWeightFetch } from '../../hooks/delilvery_route/deliveryRouteWeightFetchHook';
import { useDeliveryRouteWeightUpdate } from '../../hooks/delilvery_route/deliveryRouteWeightUpdateHook';
import { useHeader } from '../../hooks/headerHook';
import { useRenderOnDataFetched } from '../../hooks/viewHook';

export default function DeliveryWeightUpdate() {

  const {
    deliveryFirm: { 
      deliveryFirm: {
        deliveryFirmToken
      }
    } 
  } = useAppContext();

  const [
    deliveryWeight, 
    deliveryWeightFetchStatus,
    refetch
  ] = useDeliveryRouteWeightFetch(deliveryFirmToken);

  useHeader({ 
    title: `${deliveryWeight ? 'Edit Weight' : 'Loading...'} - Delivery Route Weight`,
    headerTitle: '_delivery.Edit_delivery_weight'
  });

  const [
    onSubmit, 
    dialog, 
    formError, 
    formSuccess, 
    minError, 
    maxError, 
    feeError
  ] = useDeliveryRouteWeightUpdate();

  const [
    deleteOnSubmit, 
    deleteDialog, 
    deleteFormSuccess, 
    deleteFormError
  ] = useDeliveryRouteWeightDelete();

  return (
    <section>
      <div className="container-x">
        {
          useRenderOnDataFetched(
            deliveryWeightFetchStatus,
            ()=> (
              <>
                <DeliveryWeightForm 
                  weight={deliveryWeight}
                  onSubmit={onSubmit}
                  dialog={dialog}
                  formError={formError}
                  formSuccess={formSuccess}
                  minError={minError}
                  maxError={maxError} 
                  feeError={feeError}
                  />
                
                <DeleteForm 
                  confirmMessage="_delivery._delivery_weight_delete_confirm"
                  redirect={`/delivery-route/${deliveryWeight.delivery_route_id}`}
                  onSubmit={deleteOnSubmit} 
                  dialog={deleteDialog}
                  formSuccess={deleteFormSuccess}
                  formError={deleteFormError}
                  />
              </>
            ),
            ()=> <Loading />,
            ()=> <Reload action={refetch} />,
            ()=> <NotFound />
          )
        }
      </div>
    </section>
  );
}
