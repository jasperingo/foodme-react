
import React from 'react';
import Forbidden from '../../components/Forbidden';
import UserStatusForm from '../../components/form/UserStatusForm';
import Loading from '../../components/Loading';
import NotFound from '../../components/NotFound';
import Reload from '../../components/Reload';
import { useAppContext } from '../../hooks/contextHook';
import { useDeliveryFirmFetch } from '../../hooks/delivery_firm/deliveryFirmFetchHook';
import { useDeliveryFirmStatusUpdate } from '../../hooks/delivery_firm/deliveryFirmStatusUpdateHook';
import { useHeader } from '../../hooks/headerHook';
import { useRenderOnDataFetched } from '../../hooks/viewHook';

export default function DeliveryFirmUpdate() {

  const {
    admin: { 
      admin: {
        adminToken
      }
    } 
  } = useAppContext();

  const [
    deliveryFirm, 
    deliveryFirmFetchStatus,
    refetch
  ] = useDeliveryFirmFetch(adminToken);

  useHeader({ 
    title: `${deliveryFirm?.user.name ?? 'Loading...'} - Delivery Firm`,
    headerTitle: '_delivery.Edit_delivery_firm'
  });

  const [
    onSubmit,
    dialog, 
    formError, 
    formSuccess, 
    statusError
  ] = useDeliveryFirmStatusUpdate(deliveryFirm?.id, adminToken);

  return (
    <section>
      <div className="container-x">
        {
          useRenderOnDataFetched(
            deliveryFirmFetchStatus,
            ()=> (
              <UserStatusForm 
                status={deliveryFirm.user.status} 
                onSubmit={onSubmit}
                dialog={dialog}
                formError={formError}
                formSuccess={formSuccess}
                statusError={statusError}
                />
            ),
            ()=> <Loading />,
            ()=> <Reload action={refetch} />,
            ()=> <NotFound />,
            ()=> <Forbidden />,
          )
        }
      </div>
    </section>
  );
}
