
import React, { useEffect } from 'react';
import DeliveryFirmList from '../../components/list/DeliveryFirmList';
import { useAppContext } from '../../hooks/contextHook';
import { useDeliveryFirmList } from '../../hooks/delivery_firm/deliveryFirmListHook';
import { useHeader } from '../../hooks/headerHook';

export default function DeliveryFirms() {

  useHeader({ 
    title: 'Delivery Firms - DailyNeeds',
    headerTitle: "_delivery.Delivery_firms"
  });

  const { 
    admin: { 
      admin: {
        adminToken
      }
    } 
  } = useAppContext();

  const [
    fetchDeliveryFirms,
    deliveryFirms, 
    deliveryFirmsLoading,
    deliveryFirmsLoaded,
    deliveryFirmsError,
    deliveryFirmsPage, 
    deliveryFirmsNumberOfPages,
    refreshDeliveryFirms
  ] = useDeliveryFirmList(adminToken);

  useEffect(
    function() {
      if (!deliveryFirmsLoaded && deliveryFirmsError === null) 
        fetchDeliveryFirms();
    }, 
    [deliveryFirmsLoaded, deliveryFirmsError, fetchDeliveryFirms]
  );
  
  return (
    <section>

      <DeliveryFirmList
        fetchDeliveryFirms={fetchDeliveryFirms}
        deliveryFirms={deliveryFirms} 
        deliveryFirmsLoading={deliveryFirmsLoading}
        deliveryFirmsLoaded={deliveryFirmsLoaded}
        deliveryFirmsError={deliveryFirmsError}
        deliveryFirmsPage={deliveryFirmsPage} 
        deliveryFirmsNumberOfPages={deliveryFirmsNumberOfPages}
        refreshList={refreshDeliveryFirms}
        />

    </section>
  );
}
