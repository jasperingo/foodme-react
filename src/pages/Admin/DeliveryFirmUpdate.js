
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Forbidden from '../../components/Forbidden';
import UserStatusForm from '../../components/form/UserStatusForm';
import Loading from '../../components/Loading';
import NotFound from '../../components/NotFound';
import Reload from '../../components/Reload';
import NetworkErrorCodes from '../../errors/NetworkErrorCodes';
import { useAppContext } from '../../hooks/contextHook';
import { useDeliveryFirmFetch } from '../../hooks/delivery_firm/deliveryFirmFetchHook';
import { useDeliveryFirmStatusUpdate } from '../../hooks/delivery_firm/deliveryFirmStatusUpdateHook';
import { useHeader } from '../../hooks/headerHook';

export default function DeliveryFirmUpdate() {

  const { ID } = useParams();

  const {
    admin: { 
      admin: {
        adminToken
      }
    } 
  } = useAppContext();

  const [
    fetchDeliveryFirm,
    deliveryFirm,
    deliveryFirmLoading,
    deliveryFirmError,
    deliveryFirmID,
    unfetchDeliveryFirm
  ] = useDeliveryFirmFetch(adminToken);

  useHeader({ 
    title: `${deliveryFirm?.user.name ?? 'Loading...'} - Delivery Firm`,
    headerTitle: '_delivery.Edit_delivery_firm'
  });

  const [
    onSubmit,
    dialog, 
    formSuccess, 
    formError
  ] = useDeliveryFirmStatusUpdate(adminToken);

  useEffect(
    function() {
      if ((deliveryFirm !== null || deliveryFirmError !== null) && deliveryFirmID !== ID) 
        unfetchDeliveryFirm();
      else if (deliveryFirm === null && deliveryFirmError === null)
        fetchDeliveryFirm(ID);
    },
    [ID, deliveryFirm, deliveryFirmError, deliveryFirmID, fetchDeliveryFirm, unfetchDeliveryFirm]
  );

  return (
    <section>
      <div className="container-x">
        {
          deliveryFirm !== null && 
          <UserStatusForm 
            status={deliveryFirm.user.status} 
            onSubmit={onSubmit}
            dialog={dialog}
            formError={formError}
            formSuccess={formSuccess}
            />
        }

        { deliveryFirmLoading && <Loading /> }
        { deliveryFirmError === NetworkErrorCodes.NOT_FOUND && <NotFound /> }
        { deliveryFirmError === NetworkErrorCodes.FORBIDDEN && <Forbidden /> }
        { deliveryFirmError === NetworkErrorCodes.UNKNOWN_ERROR && <Reload action={()=> fetchDeliveryFirm(ID)} /> }
        { deliveryFirmError === NetworkErrorCodes.NO_NETWORK_CONNECTION && <Reload message="_errors.No_netowrk_connection" action={()=> fetchDeliveryFirm(ID)} /> }
        
      </div>
    </section>
  );
}
