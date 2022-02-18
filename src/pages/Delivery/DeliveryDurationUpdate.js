
import React from 'react';
import DeliveryDurationForm from '../../components/form/DeliveryDurationForm';
import Loading from '../../components/Loading';
import NotFound from '../../components/NotFound';
import Reload from '../../components/Reload';
import { useAppContext } from '../../hooks/contextHook';
import { useDeliveryRouteDurationFetch } from '../../hooks/delilvery_route/deliveryRouteDurationFetchHook';
import { useDeliveryRouteDurationUpdate } from '../../hooks/delilvery_route/deliveryRouteDurationUpdateHook';
import { useHeader } from '../../hooks/headerHook';
import { useRenderOnDataFetched } from '../../hooks/viewHook';

export default function DeliveryDurationUpdate() {

  const {
    deliveryFirm: { 
      deliveryFirm: {
        deliveryFirmToken
      }
    } 
  } = useAppContext();

  const [
    deliveryDuration, 
    deliveryDurationFetchStatus,
    refetch
  ] = useDeliveryRouteDurationFetch(deliveryFirmToken);

  useHeader({ 
    title: `${deliveryDuration ? 'Edit Duration' : 'Loading...'} - Delivery Route Duration`,
    headerTitle: '_delivery.Edit_delivery_duration'
  });

  const [
    onSubmit, 
    dialog, 
    formError, 
    formSuccess, 
    minError, 
    maxError, 
    unitError,
    feeError
  ] = useDeliveryRouteDurationUpdate();

  return (
    <section>
      <div className="container-x">
        {
          useRenderOnDataFetched(
            deliveryDurationFetchStatus,
            ()=> (
              <DeliveryDurationForm 
                duration={deliveryDuration}
                onSubmit={onSubmit}
                dialog={dialog}
                formError={formError}
                formSuccess={formSuccess}
                minError={minError}
                maxError={maxError} 
                unitError={unitError}
                feeError={feeError}
                />
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
