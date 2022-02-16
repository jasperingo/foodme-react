
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import DeliveryRouteForm from '../../components/form/DeliveryRouteForm';
import Loading from '../../components/Loading';
import Reload from '../../components/Reload';
import { useLocationList } from '../../hooks/address/locationListHook';
import { useDeliveryRouteCreate } from '../../hooks/delilvery_route/deliveryRouteCreateHook';
import { useHeader } from '../../hooks/headerHook';
import { useRenderOnDataFetched } from '../../hooks/viewHook';

export default function DeliveryRouteCreate() {

  useHeader({ 
    title: `Create Delivery Route - DailyNeeds`,
    headerTitle: '_delivery.Add_delivery_route'
  });

  const [
    locations, 
    locationsFetchStatus,
    retry
  ] = useLocationList();

  const [
    onSubmit, 
    id, 
    dialog, 
    formError, 
    formSuccess, 
    stateError, 
    cityError, 
    doorDeliveryError,
  ] = useDeliveryRouteCreate();

  const history = useHistory();
  
  useEffect(
    ()=> {
      if (id) {
        history.push(`/delivery-route/${id}`);
      }
    }, 
    [id, history]
  );

  return (
    <section>
      <div className="container-x">
        {
          useRenderOnDataFetched(
            locationsFetchStatus,
            ()=> (
              <DeliveryRouteForm 
                deliveryRoute={{}}
                locations={locations}
                onSubmit={onSubmit}
                dialog={dialog}
                formError={formError}
                formSuccess={formSuccess}
                stateError={stateError} 
                cityError={cityError}
                doorDeliveryError={doorDeliveryError}
                />
            ),
            ()=> <Loading />,
            ()=> <Reload action={retry} />
          )
        }
      </div>
    </section>
  );
}
